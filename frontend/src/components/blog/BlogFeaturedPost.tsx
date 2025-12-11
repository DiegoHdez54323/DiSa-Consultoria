import { motion } from "framer-motion";
import { Clock, User, ArrowRight } from "lucide-react";
import type { BlogPost } from "../../sanity/types/blog";

interface BlogFeaturedPostProps {
  post: BlogPost;
  getImageUrl: (post: BlogPost) => string | undefined;
  formatDate: (iso: string) => string;
  formatReadTime: (readTime?: number) => string;
  getMainCategory: (
    post: BlogPost
  ) => BlogPost["categories"][number] | undefined;
}

const BlogFeaturedPost: React.FC<BlogFeaturedPostProps> = ({
  post,
  getImageUrl,
  formatDate,
  formatReadTime,
  getMainCategory,
}) => {
  const mainCategory = getMainCategory(post);

  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="group relative grid lg:grid-cols-2 gap-8 items-center"
        >
          <div className="relative h-80 lg:h-[400px] rounded-2xl overflow-hidden">
            <img
              src={getImageUrl(post) || ""}
              alt={post.mainImage?.alt || post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent" />
          </div>
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-inter font-medium mb-4">
              Destacado · {mainCategory?.title ?? "Blog"}
            </span>
            <h2 className="font-sora text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            <p className="font-inter text-muted-foreground mb-6">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author.name}</span>
              </div>
              <span>{formatDate(post.publishedAt)}</span>
              {post.readTime && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatReadTime(post.readTime)}</span>
                </div>
              )}
            </div>
            <a
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-primary font-inter font-medium hover:gap-3 transition-all"
            >
              Leer artículo
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default BlogFeaturedPost;
