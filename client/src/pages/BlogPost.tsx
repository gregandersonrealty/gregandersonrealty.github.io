import { useParams, Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { ArrowLeft, Calendar, Clock, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePostPreviews, usePost } from "@/lib/postsApi";
import { EditorJsRenderer } from "@/components/EditorJsRenderer";
import { coerceToEditorJsOutput } from "@/lib/editorjs";
import { coerceToRichContent } from "@/lib/tiptap";
import { TiptapRenderer } from "@/components/TiptapRenderer";

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  
  // Fetch the single post with full content and image
  const { data: post, isLoading: postLoading, isError: postError } = usePost(id || "");
  
  // Fetch related posts (just previews, no content)
  const { data: allPosts = [] } = usePostPreviews();
  const relatedPosts = allPosts.filter((p) => p.id !== id && p.category === post?.category).slice(0, 2);

  if (postLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">Loading post...</main>
        <Footer />
      </div>
    );
  }

  if (postError || !post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-3xl font-semibold mb-4">Post Not Found</h1>
            <Link href="/blog" className="text-primary hover:underline">Back to Blog</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const rich = coerceToRichContent(post.content);
  const editorData = rich.kind === "editorjs" ? coerceToEditorJsOutput(rich.doc) : null;
  const hasTiptapContent =
    rich.kind === "tiptap" &&
    Array.isArray((rich.doc as any)?.content) &&
    (rich.doc as any).content.length > 0;

  const hasEditorJsContent =
    !!editorData &&
    (editorData.blocks || []).some((block: any) => {
      if (!block || typeof block !== "object") return false;
      if (block.type === "image") return !!block?.data?.file?.url;
      if (block.type === "paragraph" || block.type === "header") {
        const text = typeof block?.data?.text === "string" ? block.data.text.trim() : "";
        return text.length > 0;
      }
      return false;
    });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Back Link */}
        <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            data-testid="link-back-blog"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
          <header className="mb-8">
            <Badge className="mb-4 bg-secondary text-secondary-foreground hover:bg-secondary">
              {post.category}
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </header>

          {/* Featured Media */}
          {post.image && post.image !== "/remax_logo.png" ? (
            <div className="relative aspect-video rounded-xl overflow-hidden mb-10">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              {post.type === "video" && (
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
                  data-testid="button-play-video"
                >
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                  </div>
                </button>
              )}
            </div>
          ) : null}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {post.excerpt}
            </p>

            {hasTiptapContent ? (
              <div className="not-prose">
                <TiptapRenderer doc={rich.doc as any} />
              </div>
            ) : hasEditorJsContent && editorData ? (
              <div className="not-prose">
                <EditorJsRenderer data={editorData} />
              </div>
            ) : null}
          </div>

          {/* Share */}
          {/* <div className="mt-12 pt-8 border-t border-border/50">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Share2 className="w-4 h-4" />
                Share
              </span>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                  data-testid="button-share-facebook"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                  data-testid="button-share-twitter"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                  data-testid="button-share-linkedin"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div> */}
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-secondary/30">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <h2 className="font-display text-2xl md:text-3xl font-semibold mb-8">
                Related Posts
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}