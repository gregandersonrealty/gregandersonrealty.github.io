import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { promises as fs } from "fs";
import path from "path";
import { execSync } from "child_process";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  type: "video" | "article" | "gallery";
  image: string;
  date: string;
  readTime: string;
}

const DATA_PATH = path.resolve(process.cwd(), "server", "data", "posts.json");
const CATEGORY_PATH = path.resolve(process.cwd(), "server", "data", "categories.json");

async function loadPosts(): Promise<BlogPost[]> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    return JSON.parse(raw) as BlogPost[];
  } catch (e) {
    return [];
  }
}

async function savePosts(posts: BlogPost[]) {
  await fs.writeFile(DATA_PATH, JSON.stringify(posts, null, 2), "utf8");
}

async function loadCategories(): Promise<string[]> {
  try {
    const raw = await fs.readFile(CATEGORY_PATH, "utf8");
    return JSON.parse(raw) as string[];
  } catch (e) {
    return [];
  }
}

async function saveCategories(categories: string[]) {
  await fs.writeFile(CATEGORY_PATH, JSON.stringify(categories, null, 2), "utf8");
}
function gitCommitAndPush(files: string[], message: string) {
  try {
    const filesArg = files.map((f) => `"${f}"`).join(" ");
    execSync(`git add ${filesArg}`, { stdio: "inherit" });
    execSync(`git commit -m "${message.replace(/"/g, '\\"')}"`, { stdio: "inherit" });
    execSync(`git push`, { stdio: "inherit" });
    return true;
  } catch (e) {
    console.error("Git commit/push failed:", e);
    return false;
  }
}

function requireAdmin(req: any, res: any, next: any) {
  const auth = req.headers["authorization"] || "";
  const token = auth.replace(/^Bearer\s+/i, "");
  if (!process.env.ADMIN_TOKEN) {
    return res.status(500).json({ message: "Server misconfigured: ADMIN_TOKEN not set" });
  }
  if (token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Public: get all posts
  app.get("/api/posts", async (_req, res) => {
    const posts = await loadPosts();
    res.json(posts);
  });

  // Public: get categories
  app.get("/api/categories", async (_req, res) => {
    const categories = await loadCategories();
    res.json(categories);
  });

  // Admin: validate token
  app.post("/api/admin/validate", async (req, res) => {
    const auth = req.headers["authorization"] || "";
    const token = auth.replace(/^Bearer\s+/i, "") || req.body?.token || "";
    if (!process.env.ADMIN_TOKEN) {
      return res.status(500).json({ message: "Server misconfigured: ADMIN_TOKEN not set" });
    }
    if (token === process.env.ADMIN_TOKEN) return res.json({ ok: true });
    return res.status(401).json({ message: "Unauthorized" });
  });

  // Admin: create post
  app.post("/api/admin/posts", requireAdmin, async (req, res) => {
    const incoming = req.body as Partial<BlogPost>;
    if (!incoming.title || !incoming.excerpt) {
      return res.status(400).json({ message: "title and excerpt are required" });
    }

    const posts = await loadPosts();
    // create id
    const base = incoming.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60);
    let id = base;
    let i = 1;
    while (posts.some((p) => p.id === id)) {
      id = `${base}-${i}`;
      i++;
    }

    const date = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    const post: BlogPost = {
      id,
      title: incoming.title!,
      excerpt: incoming.excerpt!,
      category: incoming.category || "Market Updates",
      type: (incoming.type as any) || "article",
      image: incoming.image || "/remax_logo.png",
      date,
      readTime: incoming.readTime || "5 min read",
    };

    posts.unshift(post);
    await savePosts(posts);

    // git commit and push the posts file
    const pushed = gitCommitAndPush([DATA_PATH], `Add blog post: ${post.id}`);

    res.json({ post, pushed });
  });

  // Admin: update
  app.put("/api/admin/posts/:id", requireAdmin, async (req, res) => {
    const id = req.params.id;
    const incoming = req.body as Partial<BlogPost>;
    const posts = await loadPosts();
    const idx = posts.findIndex((p) => p.id === id);
    if (idx === -1) return res.status(404).json({ message: "Not found" });
    const existing = posts[idx];
    posts[idx] = { ...existing, ...(incoming as any) };
    await savePosts(posts);
    const pushed = gitCommitAndPush([DATA_PATH], `Update blog post: ${id}`);
    res.json({ post: posts[idx], pushed });
  });

  // Admin: delete
  app.delete("/api/admin/posts/:id", requireAdmin, async (req, res) => {
    const id = req.params.id;
    let posts = await loadPosts();
    const exists = posts.some((p) => p.id === id);
    if (!exists) return res.status(404).json({ message: "Not found" });
    posts = posts.filter((p) => p.id !== id);
    await savePosts(posts);
    const pushed = gitCommitAndPush([DATA_PATH], `Delete blog post: ${id}`);
    res.json({ id, pushed });
  });

  // Admin: categories CRUD
  app.post("/api/admin/categories", requireAdmin, async (req, res) => {
    const { name } = req.body as { name?: string };
    if (!name) return res.status(400).json({ message: "name required" });
    const categories = await loadCategories();
    if (categories.includes(name)) return res.status(409).json({ message: "Category exists" });
    categories.push(name);
    await saveCategories(categories);
    const pushed = gitCommitAndPush([CATEGORY_PATH, DATA_PATH], `Add category: ${name}`);
    res.json({ name, pushed });
  });

  app.put("/api/admin/categories/:name", requireAdmin, async (req, res) => {
    const name = req.params.name;
    const { newName } = req.body as { newName?: string };
    if (!newName) return res.status(400).json({ message: "newName required" });
    let categories = await loadCategories();
    if (!categories.includes(name)) return res.status(404).json({ message: "Not found" });
    if (categories.includes(newName)) return res.status(409).json({ message: "newName already exists" });
    categories = categories.map((c) => (c === name ? newName : c));
    await saveCategories(categories);

    // Update posts that use the old category
    const posts = await loadPosts();
    const updated = posts.map((p) => (p.category === name ? { ...p, category: newName } : p));
    await savePosts(updated);

    const pushed = gitCommitAndPush([CATEGORY_PATH, DATA_PATH], `Rename category: ${name} -> ${newName}`);
    res.json({ oldName: name, newName, pushed });
  });

  app.delete("/api/admin/categories/:name", requireAdmin, async (req, res) => {
    const name = req.params.name;
    let categories = await loadCategories();
    if (!categories.includes(name)) return res.status(404).json({ message: "Not found" });

    categories = categories.filter((c) => c !== name);
    await saveCategories(categories);

    // Update posts that used the deleted category to "Uncategorized"
    const posts = await loadPosts();
    const updated = posts.map((p) => (p.category === name ? { ...p, category: "Uncategorized" } : p));
    await savePosts(updated);

    const pushed = gitCommitAndPush([CATEGORY_PATH, DATA_PATH], `Delete category: ${name}`);
    res.json({ name, pushed });
  });

  return httpServer;
}
