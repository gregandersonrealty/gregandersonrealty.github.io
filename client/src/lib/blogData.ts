import type { BlogPost } from "@/components/BlogCard";
import livingRoom1 from "@assets/stock_images/cozy_modern_living_r_531f80ac.jpg";
import livingRoom2 from "@assets/stock_images/cozy_modern_living_r_4d621c4c.jpg";
import homeExterior from "@assets/stock_images/luxury_home_exterior_cc09cbac.jpg";
import kitchen from "@assets/stock_images/kitchen_interior_mod_ada9996c.jpg";

export const categories = [
  "Market Updates",
  "Buying Tips",
  "Selling Tips",
  "Carver County",
  "First-Time Buyers",
  "Investment",
  "Distressed Properties",
];

export const blogPosts: BlogPost[] = [
  {
    id: "carver-county-market-2026",
    title: "Carver County Real Estate Market Update: What to Expect in 2026",
    excerpt: "A deep dive into current trends, pricing, and what buyers and sellers should expect in Chaska, Chanhassen, Victoria, and surrounding areas.",
    category: "Market Updates",
    type: "video",
    image: homeExterior,
    date: "Jan 10, 2026",
    readTime: "15 min watch",
  },
  {
    id: "chaska-neighborhood-guide",
    title: "The Ultimate Guide to Chaska Neighborhoods",
    excerpt: "From Historic Downtown to Lake Bavaria estates—understanding the $900,000+ variation in Chaska home values and which areas are right for you.",
    category: "Carver County",
    type: "article",
    image: livingRoom1,
    date: "Jan 8, 2026",
    readTime: "10 min read",
  },
  {
    id: "first-time-buyer-mistakes",
    title: "5 Costly Mistakes First-Time Homebuyers Make in Minnesota",
    excerpt: "Learn from others' experiences. These common pitfalls can cost you thousands—here's how to avoid them in our local market.",
    category: "First-Time Buyers",
    type: "video",
    image: kitchen,
    date: "Jan 5, 2026",
    readTime: "12 min watch",
  },
  {
    id: "staging-tips-sell-faster",
    title: "Home Staging Tips That Help You Sell Faster in Carver County",
    excerpt: "Simple, budget-friendly staging techniques that make a real difference in how quickly your home sells—and for how much.",
    category: "Selling Tips",
    type: "gallery",
    image: livingRoom2,
    date: "Jan 2, 2026",
    readTime: "8 min read",
  },
  {
    id: "distressed-property-options",
    title: "Understanding Your Options with Distressed Properties",
    excerpt: "If you're facing hardship, here are the paths forward—from loan modification to short sale. No judgment, just guidance.",
    category: "Distressed Properties",
    type: "video",
    image: homeExterior,
    date: "Dec 28, 2025",
    readTime: "18 min watch",
  },
  {
    id: "investment-property-carver-county",
    title: "Getting Started with Investment Properties in Carver County",
    excerpt: "Everything you need to know about buying your first rental property along the Highway 212 corridor and surrounding areas.",
    category: "Investment",
    type: "article",
    image: livingRoom1,
    date: "Dec 22, 2025",
    readTime: "12 min read",
  },
  {
    id: "negotiation-strategies",
    title: "Negotiation Strategies Every Buyer Should Know",
    excerpt: "Real-world tactics from 41 years in the business to help you get the best deal possible without losing the home you love.",
    category: "Buying Tips",
    type: "video",
    image: kitchen,
    date: "Dec 18, 2025",
    readTime: "14 min watch",
  },
  {
    id: "ai-real-estate-tools",
    title: "How AI is Changing Real Estate (And How I Use It)",
    excerpt: "From AI-enhanced CMAs to predictive analytics—the 1985 industry barely resembles today's tech-driven marketplace. Here's how I stay current.",
    category: "Market Updates",
    type: "article",
    image: livingRoom2,
    date: "Dec 15, 2025",
    readTime: "7 min read",
  },
];

// Local persistence for custom posts created through the admin UI
const LOCAL_KEY = "greg_blog_custom_posts";

function loadSavedPosts() {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw) as BlogPost[];
    if (saved && Array.isArray(saved) && saved.length > 0) {
      // Newer posts should appear first
      blogPosts.unshift(...saved);
    }
  } catch (e) {
    // ignore
  }
}

export function addBlogPost(post: BlogPost) {
  // Add to runtime list
  blogPosts.unshift(post);

  // Persist
  if (typeof window === "undefined") return;
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]") as BlogPost[];
    existing.unshift(post);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(existing));
  } catch (e) {
    // ignore
  }
}

// Initialize saved posts when module loads in browser
loadSavedPosts();
