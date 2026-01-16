import { useQuery } from "@tanstack/react-query";
import type { BlogPost } from "@/components/BlogCard";
import { supabase } from "./supabase";

// Fetch all published posts from Supabase
export async function fetchPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*, categories(name)")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data || []).map((row: any) => ({
    id: row.id,
    title: row.title,
    excerpt: row.excerpt || row.title,
    content: row.content,
    category: row.categories?.name || "Uncategorized",
    type: row.type || "article",
    image: row.image || `${import.meta.env.BASE_URL}remax_logo.png`,
    date: new Date(row.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    readTime: row.read_time || "5 min read",
  }));
}

// Create a new post (admin only)
export async function createPost(post: any) {
  const { error } = await supabase.from("posts").insert({
    title: post.title,
    slug: post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    excerpt: post.excerpt,
    content: post.content || "",
    category_id: post.category_id,
    type: post.type || "article",
    image: post.image || `${import.meta.env.BASE_URL}remax_logo.png`,
    read_time: post.readTime || "5 min read",
    published: true,
  });

  if (error) throw new Error(error.message);
  return { success: true };
}

// Update an existing post (admin only)
export async function updatePost(id: string, post: any) {
  const { error } = await supabase
    .from("posts")
    .update({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category_id: post.category_id,
      image: post.image,
      read_time: post.readTime,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  return { success: true };
}

// Delete a post (admin only)
export async function deletePost(id: string) {
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) throw new Error(error.message);
  return { success: true };
}

// React Query hook
export function usePosts() {
  return useQuery({ queryKey: ["posts"], queryFn: fetchPosts, staleTime: 1000 * 60 * 5 });
}
