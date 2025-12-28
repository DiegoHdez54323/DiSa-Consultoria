import { useRef } from "react";

import type { BlogCategoryUI } from "../../types/blog-ui";

interface BlogCategoriesProps {
  categories: BlogCategoryUI[];
  activeCategorySlug?: string;
  onNav?: () => void;
}

const BlogCategories: React.FC<BlogCategoriesProps> = ({
  categories,
  activeCategorySlug,
  onNav,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const amount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-4">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label="Ver categorías anteriores"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card/70 text-lg text-foreground shadow-sm transition hover:bg-muted/60"
          >
            ‹
          </button>
          <div
            ref={scrollContainerRef}
            className="blog-categories-scroll grid flex-1 grid-flow-col auto-cols-max grid-rows-2 justify-start gap-3 overflow-x-auto whitespace-nowrap pb-2"
          >
            {/* "Todos" */}
            <a
              href="/blog"
              onClick={onNav}
              className={`px-4 py-2 rounded-full font-inter text-sm transition-all ${
                !activeCategorySlug
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              Todos
            </a>

            {categories.map((category) => {
              const isActive = activeCategorySlug === category.slug;
              return (
                <a
                  key={category.slug}
                  href={`/blog/${category.slug}/page/1`}
                  onClick={onNav}
                  className={`px-4 py-2 rounded-full font-inter text-sm transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {category.title}
                </a>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label="Ver más categorías"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card/70 text-lg text-foreground shadow-sm transition hover:bg-muted/60"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogCategories;
