import { Link } from "wouter";
import { Play, Calendar, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: unknown;
  category: string;
  type: "video" | "article" | "gallery";
  image: string;
  date: string;
  readTime: string;
}

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.id}`} data-testid={`card-blog-${post.id}`}>
      <article
        className={`group bg-card rounded-lg overflow-hidden border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 ${
          featured ? "md:grid md:grid-cols-2" : ""
        }`}
      >
        <div className={`relative overflow-hidden ${featured ? "aspect-[4/3] md:aspect-auto" : "aspect-[16/10]"}`}>
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-secondary/30" aria-hidden="true" />
          )}
          {post.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-primary ml-1" fill="currentColor" />
              </div>
            </div>
          )}
          <Badge
            className="absolute top-4 left-4 bg-white/90 text-foreground hover:bg-white/90 font-medium text-xs"
            data-testid={`badge-category-${post.id}`}
          >
            {post.category}
          </Badge>
        </div>

        <div className={`p-6 ${featured ? "md:p-8 md:flex md:flex-col md:justify-center" : ""}`}>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h3
            className={`font-display font-semibold text-foreground group-hover:text-primary transition-colors leading-snug ${
              featured ? "text-2xl md:text-3xl mb-4" : "text-xl mb-3"
            }`}
          >
            {post.title}
          </h3>

          <p className={`text-muted-foreground leading-relaxed ${featured ? "text-base mb-6" : "text-sm mb-4"}`}>
            {post.excerpt}
          </p>

          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
            {post.type === "video" ? "Watch Now" : "Read More"}
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </article>
    </Link>
  );
}
