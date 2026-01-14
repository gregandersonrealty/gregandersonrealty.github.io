import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { usePosts, deletePost } from "@/lib/postsApi";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useCategories, createCategory, renameCategory, deleteCategory } from "@/lib/categoriesApi";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const { data: posts = [], isLoading } = usePosts();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const queryClient = useQueryClient();
  const [token, setToken] = useState(() => sessionStorage.getItem("admin_token") || "");
  const [loggedIn, setLoggedIn] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [githubToken, setGithubToken] = useState(() => sessionStorage.getItem("github_token") || "");
  const [githubValidated, setGithubValidated] = useState(false);
  const { toast } = useToast();

  function saveToken(t: string) {
    setToken(t);
    sessionStorage.setItem("admin_token", t);
  }

  async function validateToken(t: string) {
    try {
      const res = await fetch("/api/admin/validate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${t}`,
        },
      });
      if (!res.ok) throw new Error("Invalid token");
      saveToken(t);
      setLoggedIn(true);
      toast({ title: "Signed in", description: "Admin session active" });
    } catch (e: any) {
      setLoggedIn(false);
      // don't spam an alert on mount check
      if (t) toast({ title: "Invalid token", description: e.message || "Invalid token" });
    }
  }

  async function validateGitHubToken(t: string) {
    try {
      const res = await fetch("https://api.github.com/user", { headers: { Authorization: `token ${t}` } });
      if (!res.ok) throw new Error("Invalid GitHub token");
      setGithubToken(t);
      sessionStorage.setItem("github_token", t);
      setGithubValidated(true);
      toast({ title: "GitHub token validated" });
    } catch (e: any) {
      setGithubValidated(false);
      toast({ title: "Invalid GitHub token", description: e.message || "GitHub token invalid" });
    }
  }

  useEffect(() => {
    // Auto-validate token if one exists in sessionStorage
    const saved = sessionStorage.getItem("admin_token");
    if (saved) {
      setToken(saved);
      validateToken(saved);
    }
  }, []);

  useEffect(() => {
    // Auto-validate GitHub token if present
    const savedGit = sessionStorage.getItem("github_token");
    if (savedGit) {
      setGithubToken(savedGit);
      validateGitHubToken(savedGit);
    }
  }, []);

  async function onDelete(id: string) {
    if (!token) return alert("Set the admin token first");
    if (!confirm("Delete this post?")) return;
    try {
      await deletePost(id, token);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("Deleted");
    } catch (e: any) {
      alert(e.message || "Failed to delete");
    }
  }

  async function onAddCategory() {
    if (!token) return alert("Set and validate the admin token first");
    if (!newCategory.trim()) return alert("Enter a name");
    try {
      await createCategory(newCategory.trim(), token);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setNewCategory("");
      alert("Category added");
    } catch (e: any) {
      alert(e.message || "Failed to add category");
    }
  }

  async function onRenameCategory(name: string) {
    const newName = prompt("New name for category", name);
    if (!newName) return;
    try {
      await renameCategory(name, newName, token);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("Renamed");
    } catch (e: any) {
      alert(e.message || "Failed to rename");
    }
  }

  async function onDeleteCategory(name: string) {
    if (!confirm(`Delete category "${name}"? Posts will be set to 'Uncategorized'.`)) return;
    try {
      await deleteCategory(name, token);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("Deleted");
    } catch (e: any) {
      alert(e.message || "Failed to delete category");
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-semibold">Admin</h1>
              <p className="text-muted-foreground">Create and manage blog posts. Posts you add are saved in GitHub when you provide a valid admin token.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/admin/add" className="px-4 py-2 rounded-lg bg-primary text-white font-medium">Add Post</Link>
              <Link href="/blog" className="px-4 py-2 rounded-lg border">View Blog</Link>
            </div>
          </div>

          <div className="mb-6">
            {!loggedIn ? (
              <div>
                <label className="block text-sm font-medium mb-1">Admin Token</label>
                <div className="flex gap-2">
                  <input value={token} onChange={(e) => setToken(e.target.value)} placeholder="Paste ADMIN_TOKEN here" className="w-full px-3 py-2 rounded-lg border bg-input" />
                  <button onClick={() => validateToken(token)} className="px-3 py-2 rounded-lg bg-primary text-white">Login</button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Token is saved to sessionStorage for this browser session.</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 md:items-end">
                <div>
                  <label className="block text-sm font-medium mb-1">Add Category</label>
                  <div className="flex gap-2">
                    <input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Category name" className="w-full px-3 py-2 rounded-lg border bg-input" />
                    <button onClick={onAddCategory} className="px-3 py-2 rounded-lg bg-primary text-white">Add</button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">GitHub Token (optional)</label>
                  <div className="flex gap-2">
                    <input value={githubToken} onChange={(e) => setGithubToken(e.target.value)} placeholder="Paste GitHub Personal Access Token" className="w-full px-3 py-2 rounded-lg border bg-input" />
                    <button onClick={() => validateGitHubToken(githubToken)} className="px-3 py-2 rounded-lg bg-primary text-white">Validate</button>
                    <button onClick={() => { setGithubToken(''); sessionStorage.removeItem('github_token'); setGithubValidated(false); }} className="px-3 py-2 rounded-lg border">Clear</button>
                  </div>
                  {githubValidated && <div className="text-xs text-muted-foreground mt-1">GitHub token validated ✅</div>}
                  <div className="text-right mt-2">
                    <button onClick={() => { setLoggedIn(false); sessionStorage.removeItem("admin_token"); setToken(""); toast({ title: "Logged out" }); }} className="px-4 py-2 rounded-lg border">Log out</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {!loggedIn ? (
              <div className="text-center text-sm text-muted-foreground">Sign in with the admin token to manage posts and categories.</div>
            ) : isLoading ? (
              <div>Loading...</div>
            ) : (
              <div>
                <div className="mb-4">
                  <h3 className="font-display text-xl font-semibold mb-2">Categories</h3>
                  {categoriesLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <div className="space-y-2">
                      {categories.map((c) => (
                        <div key={c} className="flex items-center gap-3 bg-card p-3 rounded">
                          <div className="flex-1">{c}</div>
                          <div className="flex gap-2">
                            <button onClick={() => onRenameCategory(c)} className="px-2 py-1 rounded bg-secondary">Rename</button>
                            <button onClick={() => onDeleteCategory(c)} className="px-2 py-1 rounded bg-destructive text-destructive-foreground">Delete</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-display text-xl font-semibold mb-4">Posts</h3>
                  {posts.map((post) => (
                    <div key={post.id} className="flex items-center gap-4 p-4 border rounded-lg bg-card mb-2">
                      <img src={post.image} alt={post.title} className="w-24 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-medium">{post.title}</h3>
                          <Badge className="bg-secondary/80">{post.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                      </div>
                      <div className="text-xs text-muted-foreground text-right">
                        <div>{post.date}</div>
                        <div>{post.readTime}</div>
                        <div className="mt-3">
                          <button onClick={() => onDelete(post.id)} className="px-3 py-1 rounded-lg bg-destructive text-destructive-foreground text-xs">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
