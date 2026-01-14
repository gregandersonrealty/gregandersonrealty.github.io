import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCategories } from "@/lib/categoriesApi";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import type { BlogPost } from "@/components/BlogCard";
import { createPost } from "@/lib/postsApi";
import { useQueryClient } from "@tanstack/react-query";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
}

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const [category, setCategory] = useState<string>(() => (categories && categories.length ? categories[0] : "Market Updates"));

  useEffect(() => {
    if (categories && categories.length && !category) {
      setCategory(categories[0]);
    }
  }, [categories]);
  const [type, setType] = useState<BlogPost["type"]>("article");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFileName, setImageFileName] = useState("");
  const [imageData, setImageData] = useState<string | null>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [adminToken, setAdminToken] = useState(() => sessionStorage.getItem("admin_token") || "");
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Ensure only validated admins can access Add Post
    const token = sessionStorage.getItem("admin_token") || adminToken;
    if (!token) {
      setLocation("/admin");
      return;
    }

    (async () => {
      try {
        const res = await fetch("/api/admin/validate", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Not authorized");
        setAuthorized(true);
      } catch (e) {
        sessionStorage.removeItem("admin_token");
        setLocation("/admin");
      }
    })();
  }, []);

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
    } catch (err) {
      // ignore
    }
  }

  function computeReadTime(text: string) {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  }

  function formatDate(d = new Date()) {
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }


  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();


    if (!title.trim() || !excerpt.trim()) {
      toast({ title: "Missing fields", description: "Please provide a title and excerpt." });
      return;
    }

    const image = imageData || imageUrl || "/remax_logo.png";
    const readTime = type === "video" ? "5 min watch" : computeReadTime(content || excerpt);

    const post: Partial<BlogPost> = {
      title: title.trim(),
      excerpt: excerpt.trim(),
      category,
      type,
      image,
      readTime,
    };

    const token = adminToken || sessionStorage.getItem("admin_token") || "";
    if (!token) {
      toast({ title: "Admin token required", description: "Set your admin token on the Admin page first." });
      return;
    }

    try {
      await createPost(post, token);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast({ title: "Post added", description: `"${post.title}" was added.` });
      setLocation("/blog");
    } catch (err: any) {
      toast({ title: "Create failed", description: err.message || "Failed to create post" });
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h1 className="font-display text-3xl font-semibold mb-2">Add New Blog Post</h1>
          <p className="text-muted-foreground mb-6">Fill out the fields below and click <span className="font-medium">Add Post</span>.</p>

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 rounded-lg border bg-input" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Excerpt</label>
              <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg border bg-input" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Content (optional)</label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={6} className="w-full px-3 py-2 rounded-lg border bg-input" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                {categoriesLoading ? (
                  <div>Loading categories...</div>
                ) : (
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 rounded-lg border bg-input">
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select value={type} onChange={(e) => setType(e.target.value as any)} className="w-full px-3 py-2 rounded-lg border bg-input">
                  <option value="article">Article</option>
                  <option value="video">Video</option>
                  <option value="gallery">Gallery</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Image (file)</label>
              <input type="file" accept="image/*" onChange={onFileChange} className="w-full" />
              {imageFileName && <div className="text-sm text-muted-foreground mt-1">Using uploaded file: {imageFileName}</div>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Or Image URL</label>
              <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-3 py-2 rounded-lg border bg-input" />
            </div>

            <div className="grid gap-3 md:grid-cols-2 md:items-center">
              <div>
                <label className="block text-sm font-medium mb-1">Admin Token (paste or set on Admin page)</label>
                <input value={adminToken} onChange={(e) => { setAdminToken(e.target.value); sessionStorage.setItem("admin_token", e.target.value); }} className="w-full px-3 py-2 rounded-lg border bg-input" />
              </div>

              <div className="flex items-center gap-4 justify-end">
                <button type="submit" className="px-5 py-2 rounded-lg bg-primary text-white font-medium">Add Post</button>
                <button type="button" onClick={() => setLocation("/blog")} className="px-5 py-2 rounded-lg border">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
