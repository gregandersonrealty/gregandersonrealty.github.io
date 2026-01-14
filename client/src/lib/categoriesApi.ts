import { useQuery } from "@tanstack/react-query";

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch("/api/categories");
  if (!res.ok) throw new Error("Failed to load categories");
  return res.json();
}

export async function createCategory(name: string, token: string) {
  try {
    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    if (res.ok) return res.json();
  } catch (e) {}

  const fallbackToken = token || (typeof window !== 'undefined' ? sessionStorage.getItem('github_token') || '' : '');
  if (!fallbackToken) throw new Error("No token available for fallback");
  const { json: categories, sha } = await fetchJSONFile("server/data/categories.json", fallbackToken);
  if (categories.includes(name)) throw new Error("Category exists");
  categories.push(name);
  await saveJSONFile("server/data/categories.json", categories, `Add category: ${name}`, fallbackToken, sha);
  return { name, pushed: true };
}

export async function renameCategory(name: string, newName: string, token: string) {
  try {
    const res = await fetch(`/api/admin/categories/${encodeURIComponent(name)}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newName }),
    });
    if (res.ok) return res.json();
  } catch (e) {}

  const fallbackToken = token || (typeof window !== 'undefined' ? sessionStorage.getItem('github_token') || '' : '');
  if (!fallbackToken) throw new Error("No token available for fallback");
  const { json: categories, sha: catSha } = await fetchJSONFile("server/data/categories.json", fallbackToken);
  if (!categories.includes(name)) throw new Error("Not found");
  if (categories.includes(newName)) throw new Error("newName already exists");
  const updatedCategories = categories.map((c: string) => (c === name ? newName : c));
  // Update posts file too
  const { json: posts, sha: postsSha } = await fetchJSONFile("server/data/posts.json", fallbackToken);
  const updatedPosts = posts.map((p: any) => (p.category === name ? { ...p, category: newName } : p));
  await saveJSONFile("server/data/categories.json", updatedCategories, `Rename category: ${name} -> ${newName}`, fallbackToken, catSha);
  await saveJSONFile("server/data/posts.json", updatedPosts, `Rename category: ${name} -> ${newName}`, fallbackToken, postsSha);
  return { oldName: name, newName, pushed: true };
}

export async function deleteCategory(name: string, token: string) {
  try {
    const res = await fetch(`/api/admin/categories/${encodeURIComponent(name)}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) return res.json();
  } catch (e) {}

  const fallbackToken = token || (typeof window !== 'undefined' ? sessionStorage.getItem('github_token') || '' : '');
  if (!fallbackToken) throw new Error("No token available for fallback");
  const { json: categories, sha: catSha } = await fetchJSONFile("server/data/categories.json", fallbackToken);
  if (!categories.includes(name)) throw new Error("Not found");
  const updatedCategories = categories.filter((c: string) => c !== name);
  const { json: posts, sha: postsSha } = await fetchJSONFile("server/data/posts.json", fallbackToken);
  const updatedPosts = posts.map((p: any) => (p.category === name ? { ...p, category: "Uncategorized" } : p));
  await saveJSONFile("server/data/categories.json", updatedCategories, `Delete category: ${name}`, fallbackToken, catSha);
  await saveJSONFile("server/data/posts.json", updatedPosts, `Delete category: ${name}`, fallbackToken, postsSha);
  return { name, pushed: true };
}

export function useCategories() {
  return useQuery({ queryKey: ["categories"], queryFn: fetchCategories, staleTime: 1000 * 60 * 5 });
}
