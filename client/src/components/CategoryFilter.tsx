interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto flex-nowrap md:flex-wrap -mx-1 px-1 py-1"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <button
        onClick={() => onCategoryChange("all")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          activeCategory === "all"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
        data-testid="button-category-all"
      >
        All Posts
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === category
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
          data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
