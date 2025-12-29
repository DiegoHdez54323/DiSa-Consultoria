import { motion } from "framer-motion";
import { Clock, User } from "lucide-react";
import type { BlogPost } from "../../sanity/types/blog";

interface BlogPostCardProps {
  post: BlogPost;
  index: number;
  getImageUrl: (post: BlogPost) => string | undefined;
  formatDate: (iso: string) => string;
  formatReadTime: (readTime?: number) => string;
  getMainCategory: (
    post: BlogPost
  ) => BlogPost["categories"][number] | undefined;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  post,
  index,
  getImageUrl,
  formatDate,
  formatReadTime,
  getMainCategory,
}) => {
  const mainCategory = getMainCategory(post);

  return (
    <a href={`/blog/${post.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="group relative h-full"
      >
        <div className="relative h-full rounded-2xl overflow-hidden border border-border/50 bg-card transition-all duration-500 hover:border-primary/30 hover:glow-primary">
          <div className="relative h-52 overflow-hidden">
            <img
              src={getImageUrl(post) || ""}
              alt={post.mainImage?.alt || post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent" />
            {mainCategory && (
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-inter font-medium">
                {mainCategory.title}
              </div>
            )}
          </div>

          <div className="p-6">
            <h3 className="font-sora text-lg font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="font-inter text-sm text-muted-foreground mb-4 line-clamp-2">
              {post.excerpt}
            </p>

            <div className="flex flex-col flex-wrap items-start gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <User className="w-3 h-3" />
                <span>{post.author.name}</span>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <span>{formatDate(post.publishedAt)}</span>
                {post.readTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatReadTime(post.readTime)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </a>
  );
};

export default BlogPostCard;
