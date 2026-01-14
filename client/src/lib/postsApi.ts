import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { BlogPost } from "@/components/BlogCard";

export async function fetchPosts(): Promise<BlogPost[]> {
  const res = await fetch("/api/posts");
  if (!res.ok) throw new Error("Failed to load posts");
  return res.json();
}

import { fetchJSONFile, saveJSONFile } from "./githubApi";

export async function createPost(post: Partial<BlogPost>, token: string) {
  // Prefer server API if available
  try {
    const res = await fetch("/api/admin/posts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });
    if (res.ok) return res.json();
    // fallthrough to GitHub if server rejects
  } catch (e) {
    // network error: fall back
  }

  // Fallback: update posts.json directly on GitHub using a GitHub token
  const fallbackToken = token || (typeof window !== 'undefined' ? sessionStorage.getItem('github_token') || '' : '');
  if (!fallbackToken) throw new Error("No token available for fallback");
  const { json: posts, sha } = await fetchJSONFile("server/data/posts.json", fallbackToken);
  // create id
  const base = (post.title || "post").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60);
  let id = base;
  let i = 1;
  while (posts.some((p: any) => p.id === id)) {
    id = `${base}-${i}`;
    i++;
  }
  const date = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const newPost: BlogPost = {
    id,
    title: post.title!,
    excerpt: post.excerpt!,
    category: post.category || "Market Updates",
    type: (post.type as any) || "article",
    image: post.image || "/remax_logo.png",
    date,
    readTime: post.readTime || "5 min read",
  };
  posts.unshift(newPost);
  await saveJSONFile("server/data/posts.json", posts, `Add blog post: ${id}`, token, sha);
  return { post: newPost, pushed: true };
}

export async function updatePost(id: string, post: Partial<BlogPost>, token: string) {
  try {
    const res = await fetch(`/api/admin/posts/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });
    if (res.ok) return res.json();
  } catch (e) {}

  const fallbackToken = token || (typeof window !== 'undefined' ? sessionStorage.getItem('github_token') || '' : '');
  if (!fallbackToken) throw new Error("No token available for fallback");
  const { json: posts, sha } = await fetchJSONFile("server/data/posts.json", fallbackToken);
  const idx = posts.findIndex((p: any) => p.id === id);
  if (idx === -1) throw new Error("Not found");
  posts[idx] = { ...posts[idx], ...(post as any) };
  await saveJSONFile("server/data/posts.json", posts, `Update blog post: ${id}`, fallbackToken, sha);
  return { post: posts[idx], pushed: true };
}

export async function deletePost(id: string, token: string) {
  try {
    const res = await fetch(`/api/admin/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) return res.json();
  } catch (e) {}

  const fallbackToken = token || (typeof window !== 'undefined' ? sessionStorage.getItem('github_token') || '' : '');
  if (!fallbackToken) throw new Error("No token available for fallback");
  const { json: posts, sha } = await fetchJSONFile("server/data/posts.json", fallbackToken);
  const exists = posts.some((p: any) => p.id === id);
  if (!exists) throw new Error("Not found");
  const filtered = posts.filter((p: any) => p.id !== id);
  await saveJSONFile("server/data/posts.json", filtered, `Delete blog post: ${id}`, fallbackToken, sha);
  return { id, pushed: true };
}

import type { UseQueryResult } from "@tanstack/react-query";

export function usePosts(): UseQueryResult<BlogPost[], Error> {
  return useQuery({ queryKey: ["posts"], queryFn: fetchPosts, staleTime: 1000 * 60 * 5 });
}
