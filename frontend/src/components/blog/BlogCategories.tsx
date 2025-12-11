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
  return (
    <section className="py-4">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-3">
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
      </div>
    </section>
  );
};

export default BlogCategories;
