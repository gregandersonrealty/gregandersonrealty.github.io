import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { useCategories } from "@/lib/categoriesApi";
import { Search } from "lucide-react";
import { usePosts } from "@/lib/postsApi";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: posts = [], isLoading, isError } = usePosts();
  const { data: categories = [] } = useCategories();
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = activeCategory === "all" || post.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header (kept compact so posts are the focus) */}
        <section className="pt-8 pb-5 md:pt-10 md:pb-6 bg-secondary/20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-semibold">Let's Talk About Real Estate
                </h1>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <div className="relative w-full md:flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search posts…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/25"
                    data-testid="input-search"
                  />
                </div>

                <div className="w-full md:w-64">
                  <select
                    value={activeCategory}
                    onChange={(e) => setActiveCategory(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/25"
                    data-testid="select-category"
                  >
                    <option value="all">All categories</option>
                    {(categories ?? []).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="pt-6 pb-8 md:pt-8 md:pb-10">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            {isLoading ? (
              <div className="text-center py-20">Loading posts...</div>
            ) : isError ? (
              <div className="text-center py-20">Failed to load posts.</div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No posts found matching your criteria.</p>
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                  }}
                  className="mt-4 text-primary font-medium hover:underline cursor-pointer"
                  data-testid="button-clear-filters"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                {/* Featured Post */}
                {featuredPost && (
                  <div className="mb-12">
                    <BlogCard post={featuredPost} featured />
                  </div>
                )}

                {/* Remaining Posts Grid */}
                {remainingPosts.length > 0 && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {remainingPosts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
