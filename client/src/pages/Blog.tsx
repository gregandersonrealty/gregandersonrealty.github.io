import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { CategoryFilter } from "@/components/CategoryFilter";
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
        {/* Header */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-primary font-medium tracking-wide mb-4">Free Resources</p>
              <h1 className="font-display text-4xl md:text-5xl font-semibold mb-6">
                Real Estate Blog
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Videos, articles, and guides to help you navigate buying, selling, and 
                everything in between. No commercials, no fluff—just helpful content.
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-4 md:py-8 border-b border-border/50 bg-background/95 backdrop-blur-sm md:sticky md:top-20 md:z-40">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <CategoryFilter
                categories={categories ?? []}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
              <div className="relative w-full lg:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-secondary border-0 rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  data-testid="input-search"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-12 md:py-16">
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
                  className="mt-4 text-primary font-medium hover:underline"
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
