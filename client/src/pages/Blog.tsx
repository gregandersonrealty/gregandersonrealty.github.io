import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { useCategories } from "@/lib/categoriesApi";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { usePostPreviews, usePostCount } from "@/lib/postsApi";
import { Helmet } from "react-helmet-async";

const POSTS_PER_PAGE = 9;

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch posts with pagination
  const offset = (currentPage - 1) * POSTS_PER_PAGE;
  const { data: posts = [], isLoading, isError } = usePostPreviews(POSTS_PER_PAGE, offset);
  const { data: totalCount = 0 } = usePostCount();
  const { data: categories = [] } = useCategories();

  // Filter posts by category and search
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

  // Calculate total pages (rough estimate when filtering)
  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  // Reset to page 1 when filters change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Helmet>
          <title>Real Estate Blog | Greg Anderson Carver County</title>
          <meta name="description" content="Insights, market updates, and local knowledge from Greg Anderson — Carver County's trusted REALTOR® since 1985." />
        </Helmet>
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
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/25"
                    data-testid="input-search"
                  />
                </div>

                <div className="w-full md:w-64">
                  <select
                    value={activeCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
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
                    setCurrentPage(1);
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

                {/* Pagination */}
                {(hasNextPage || hasPrevPage) && (
                  <div className="flex items-center justify-center gap-4 mt-12">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={!hasPrevPage}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      data-testid="button-prev-page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>

                    <span className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </span>

                    <button
                      onClick={() => setCurrentPage(p => p + 1)}
                      disabled={!hasNextPage}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      data-testid="button-next-page"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
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