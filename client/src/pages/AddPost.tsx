import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCategoriesWithIds } from "@/lib/categoriesApi";
import { useToast } from "@/hooks/use-toast";
import { useLocation, useParams } from "wouter";
import { createPost, updatePost } from "@/lib/postsApi";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { TiptapEditor } from "@/components/TiptapEditor";
import type { JSONContent } from "@tiptap/react";
import { coerceToRichContent, extractPlainTextFromRichContent } from "@/lib/tiptap";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [doc, setDoc] = useState<JSONContent | null>(null);
  const [editorUploading, setEditorUploading] = useState(false);
  const { data: categoriesWithIds = [] } = useCategoriesWithIds();
  const [categoryId, setCategoryId] = useState("");
  const [type, setType] = useState("article");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFileName, setImageFileName] = useState("");
  const [imageData, setImageData] = useState<string | null>(null);
  const [featuredImageMode, setFeaturedImageMode] = useState<"upload" | "link">("upload");
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams<{ id?: string }>();
  const postId = params?.id;
  const isEditing = !!postId;

  const richContent = useMemo(() => {
    if (!doc) return null;
    return { kind: "tiptap" as const, version: 1 as const, doc };
  }, [doc]);

  // Check if user is logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setLoggedIn(true);
      } else {
        setLocation("/admin");
      }
    });
  }, []);

  // Load post data when editing
  useEffect(() => {
    let cancelled = false;

    async function loadPost() {
      if (!postId) {
        setDoc({ type: "doc", content: [{ type: "paragraph" }] });
        return;
      }

      try {
        const { data, error } = await supabase
          .from("posts")
          .select("id, title, excerpt, content, category_id, type, image")
          .eq("id", postId)
          .single();
        if (error) throw new Error(error.message);
        if (cancelled) return;

        setTitle(data.title || "");
        setExcerpt(data.excerpt || "");
        setCategoryId(data.category_id || "");
        setType(data.type || "article");
        setImageUrl(data.image || "");
        setFeaturedImageMode(!data.image ? "upload" : String(data.image).startsWith("data:") ? "upload" : "link");
        const rich = coerceToRichContent(data.content);
        if (rich.kind === "tiptap") setDoc(rich.doc);
        else setDoc({ type: "doc", content: [{ type: "paragraph" }] });
      } catch (e: any) {
        if (!cancelled) toast({ title: "Failed to load post", description: e.message });
      }
    }

    loadPost();
    return () => {
      cancelled = true;
    };
  }, [postId, toast]);

  // Set default category
  useEffect(() => {
    if (categoriesWithIds.length && !categoryId && !isEditing) {
      setCategoryId(categoriesWithIds[0].id);
    }
  }, [categoriesWithIds, categoryId, isEditing]);

  function readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFileName(file.name);
    try {
      const data = await readFileAsDataURL(file);
      setImageData(data);
      setImageUrl("");
      setFeaturedImageMode("upload");
    } catch (err) {
      // ignore
    }
  }

  function clearFeaturedImage() {
    setImageFileName("");
    setImageData(null);
    setImageUrl("");
  }

  function computeReadTime(text: string) {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() || !excerpt.trim()) {
      toast({ title: "Missing fields", description: "Please provide a title and excerpt." });
      return;
    }

    if (!categoryId) {
      toast({ title: "Select a category" });
      return;
    }

    if (!doc || !richContent) {
      toast({ title: "Editor is still loading" });
      return;
    }

    if (editorUploading) {
      toast({ title: "Image upload in progress", description: "Please wait for uploads to finish before saving." });
      return;
    }

    const image = imageData || imageUrl || null;
    const bodyText = extractPlainTextFromRichContent(richContent);
    const readTime = type === "video" ? "5 min watch" : computeReadTime(bodyText || excerpt);

    setLoading(true);
    try {
      if (isEditing && postId) {
        await updatePost(postId, {
          title: title.trim(),
          excerpt: excerpt.trim(),
          content: richContent,
          category_id: categoryId,
          type,
          image,
          readTime,
        });
      } else {
        await createPost({
          title: title.trim(),
          excerpt: excerpt.trim(),
          content: richContent,
          category_id: categoryId,
          type,
          image,
          readTime,
        });
      }
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast({ title: isEditing ? "Post updated" : "Post created", description: `"${title}" has been saved.` });
      setLocation("/blog");
    } catch (err: any) {
      toast({ title: isEditing ? "Failed to update post" : "Failed to create post", description: err.message });
    } finally {
      setLoading(false);
    }
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-muted-foreground">Please log in from the Admin page.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            <section className="flex-1">
              <div className="mb-6">
                <h1 className="font-display text-3xl font-semibold">{isEditing ? "Edit post" : "Write a new post"}</h1>
              </div>

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="rounded-xl border bg-background p-4">
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="A clear, specific title…"
                    className="w-full rounded-lg border bg-input px-3 py-2 text-lg"
                  />
                </div>

                <div className="rounded-xl border bg-background p-4">
                  <label className="block text-sm font-medium mb-1">Excerpt</label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={3}
                    placeholder="A short summary that shows up on the blog card…"
                    className="w-full rounded-lg border bg-input px-3 py-2"
                  />
                </div>

                <div className="rounded-xl border bg-background p-4">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <label className="block text-sm font-medium">Body</label>
                    {editorUploading ? <span className="text-xs text-muted-foreground">Uploading image…</span> : null}
                  </div>

                  {doc ? (
                    <TiptapEditor initialDoc={doc} onChange={setDoc} onUploadStateChange={setEditorUploading} />
                  ) : (
                    <div className="rounded-lg border bg-input px-3 py-6 text-sm text-muted-foreground">Loading editor…</div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setLocation("/blog")}
                    className="rounded-lg border px-4 py-2 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || editorUploading}
                    className="rounded-lg bg-primary px-5 py-2 font-medium text-primary-foreground disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {loading ? (isEditing ? "Saving…" : "Publishing…") : isEditing ? "Save" : "Publish"}
                  </button>
                </div>
              </form>
            </section>

            <aside className="w-full lg:w-[360px]">
              <div className="sticky top-6 space-y-4">
                <div className="rounded-xl border bg-background p-4">
                  <h2 className="text-sm font-semibold mb-3">Post settings</h2>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Category</label>
                      <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full rounded-lg border bg-input px-3 py-2 cursor-pointer"
                      >
                        <option value="">-- Select Category --</option>
                        {categoriesWithIds.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Type</label>
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full rounded-lg border bg-input px-3 py-2 cursor-pointer"
                      >
                        <option value="article">Article</option>
                        <option value="video">Video</option>
                        <option value="gallery">Gallery</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border bg-background p-4">
                  <h2 className="text-sm font-semibold mb-3">Featured image</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">How would you like to add it?</label>
                      <select
                        value={featuredImageMode}
                        onChange={(e) => setFeaturedImageMode(e.target.value as any)}
                        className="w-full rounded-lg border bg-input px-3 py-2 cursor-pointer"
                      >
                        <option value="upload">Upload a photo</option>
                        <option value="link">Use a link</option>
                      </select>
                    </div>

                    {featuredImageMode === "upload" ? (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">Upload a photo</label>
                        <div className="flex items-center gap-3">
                          <label className="inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium bg-background hover:bg-secondary cursor-pointer">
                            Choose photo
                            <input
                              type="file"
                              accept="image/*"
                              onChange={onFileChange}
                              className="hidden"
                            />
                          </label>
                          {imageFileName ? (
                            <div className="text-xs text-muted-foreground">Selected: {imageFileName}</div>
                          ) : (
                            <div className="text-xs text-muted-foreground">JPG, PNG, or WebP</div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">Paste an image link</label>
                        <input
                          value={imageUrl}
                          onChange={(e) => {
                            setImageUrl(e.target.value);
                            if (e.target.value.trim()) setImageData(null);
                          }}
                          placeholder="Paste an image URL…"
                          className="w-full rounded-lg border bg-input px-3 py-2"
                        />
                        <p className="text-xs text-muted-foreground">Tip: right-click an image online and copy image address.</p>
                      </div>
                    )}

                    {(imageData || imageUrl) ? (
                      <div className="space-y-2">
                        <div className="rounded-lg border overflow-hidden bg-background">
                          <img
                            src={imageData || imageUrl}
                            alt="Featured preview"
                            className="w-full h-40 object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={clearFeaturedImage}
                          className="w-full rounded-lg border px-4 py-2 text-sm font-medium hover:bg-secondary cursor-pointer"
                        >
                          Remove featured image
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
