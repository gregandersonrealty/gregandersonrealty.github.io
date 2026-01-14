import { useParams, Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { ArrowLeft, Calendar, Clock, Play, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePosts } from "@/lib/postsApi";

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const { data: posts = [], isLoading, isError } = usePosts();

  const post = posts.find((p) => p.id === id);
  const relatedPosts = posts.filter((p) => p.id !== id && p.category === post?.category).slice(0, 2);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">Loading post...</main>
        <Footer />
      </div>
    );
  }

  if (isError || !post) {
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

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {post.excerpt}
            </p>
            
            <p className="leading-relaxed mb-6">
              Whether you're a first-time homebuyer or a seasoned investor, understanding the local market 
              is crucial to making smart decisions. In this {post.type === "video" ? "video" : "article"}, 
              I break down everything you need to know in simple, actionable terms.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-10 mb-4">Key Takeaways</h2>
            <ul className="space-y-2 mb-6">
              <li>Understanding current market conditions in Chaska and surrounding areas</li>
              <li>How to evaluate property values and make competitive offers</li>
              <li>Common pitfalls to avoid during the buying or selling process</li>
              <li>When to act and when to wait based on market timing</li>
            </ul>

            <p className="leading-relaxed mb-6">
              The real estate market in Minnesota has unique characteristics that set it apart from 
              other regions. From seasonal fluctuations to local economic factors, there's a lot to 
              consider when making one of life's biggest financial decisions.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-10 mb-4">Why This Matters</h2>
            <p className="leading-relaxed mb-6">
              My goal is to give you the knowledge you need to feel confident in your real estate 
              journey. No sales pressure, no hidden agenda—just practical advice from someone who's 
              been helping families in Chaska find their perfect homes for over 15 years.
            </p>

            <p className="leading-relaxed">
              Have questions about your specific situation? Feel free to reach out. I'm always happy 
              to chat and provide personalized guidance based on your unique circumstances.
            </p>
          </div>

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-border/50">
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
          </div>
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
