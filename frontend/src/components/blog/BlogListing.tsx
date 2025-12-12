import type { BlogPost } from "../../sanity/types/blog";
import { POSTS_PER_PAGE } from "../../config/blog";

import {
  formatBlogDate,
  formatBlogReadTime,
  getPostMainCategory,
  getPostImageUrl,
} from "../../utils/blog/post-helpers";

import { useBlogListing } from "../../hooks/useBlogListing";
import { buildBlogPageHref } from "../../utils/blog/routes";
import type { BlogScope, BlogCategoryUI } from "../../types/blog-ui";

import BlogHero from "./BlogHero";
import BlogCategories from "./BlogCategories";
import BlogFeaturedPost from "./BlogFeaturedPost";
import BlogPostCard from "./BlogPostCard";
import BlogPagination from "./BlogPagination";
import BlogResultsInfo from "./BlogResultsInfo";

interface BlogListingProps {
  scope: BlogScope;
  activeCategorySlug?: string;

  page: number;
  totalPages: number;
  totalPostsInScope: number;

  pagePosts: BlogPost[];
  allScopePosts: BlogPost[];

  categories: BlogCategoryUI[];
  featuredPost?: BlogPost;
  basePath: string;
}

const BlogListing: React.FC<BlogListingProps> = ({
  scope,
  activeCategorySlug,
  page,
  totalPages,
  totalPostsInScope,
  pagePosts,
  allScopePosts,
  categories,
  featuredPost,
  basePath,
}) => {
  const {
    searchTerm,
    isSearching,
    currentPage,
    totalPagesToUse,
    totalPostsToUse,
    visiblePosts,
    canGoPrev,
    canGoNext,
    goToSearchPage,
    handleSearchChange,
  } = useBlogListing({
    page,
    totalPages,
    totalPostsInScope,
    pagePosts,
    allScopePosts,
  });

  const scrollToBlogTop = () => {
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const shouldShowFeatured = scope === "all" && !isSearching && !!featuredPost;

  const buildPageHref = (targetPage: number) => {
    if (isSearching) return "#";

    return buildBlogPageHref({
      scope,
      basePath,
      targetPage,
    });
  };

  const goToSearchPageAndScroll = (target: number) => {
    goToSearchPage(target);
    if (isSearching) {
      scrollToBlogTop();
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <BlogHero searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      <BlogCategories
        categories={categories}
        activeCategorySlug={activeCategorySlug}
        onNav={scrollToBlogTop}
      />

      {shouldShowFeatured && featuredPost && (
        <BlogFeaturedPost
          post={featuredPost}
          getImageUrl={getPostImageUrl}
          formatDate={formatBlogDate}
          formatReadTime={formatBlogReadTime}
          getMainCategory={getPostMainCategory}
        />
      )}

      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visiblePosts.map((post, index) => (
              <BlogPostCard
                key={post.id}
                post={post}
                index={index}
                getImageUrl={getPostImageUrl}
                formatDate={formatBlogDate}
                formatReadTime={formatBlogReadTime}
                getMainCategory={getPostMainCategory}
              />
            ))}
          </div>

          <BlogPagination
            isSearching={isSearching}
            currentPage={currentPage}
            totalPages={totalPagesToUse}
            canGoPrev={canGoPrev}
            canGoNext={canGoNext}
            onSearchPageChange={goToSearchPageAndScroll}
            buildPageHref={buildPageHref}
            onNavigate={scrollToBlogTop}
          />

          <BlogResultsInfo
            currentPage={currentPage}
            totalPosts={totalPostsToUse}
            pageSize={POSTS_PER_PAGE}
          />
        </div>
      </section>
    </main>
  );
};

export default BlogListing;
