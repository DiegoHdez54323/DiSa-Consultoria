import { useState, useMemo } from "react";
import type { BlogPost } from "../../sanity/types/blog";
import { POSTS_PER_PAGE } from "../../config/blog";

import {
  formatBlogDate,
  formatBlogReadTime,
  getPostMainCategory,
  getPostImageUrl,
} from "../../utils/blog/post-helpers";

import BlogHero from "./BlogHero";
import BlogCategories from "./BlogCategories";
import BlogFeaturedPost from "./BlogFeaturedPost";
import BlogPostCard from "./BlogPostCard";
import BlogPagination from "./BlogPagination";
import BlogResultsInfo from "./BlogResultsInfo";

type BlogScope = "all" | "category";

interface BlogCategoryUI {
  slug: string;
  title: string;
}

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
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPage, setSearchPage] = useState(1);

  const isSearching = searchTerm.trim().length > 0;

  // -------- Búsqueda sobre allScopePosts --------

  const filteredBySearch = useMemo(() => {
    if (!isSearching) return allScopePosts;

    const term = searchTerm.toLowerCase();

    return allScopePosts.filter((post) => {
      const inTitle = post.title.toLowerCase().includes(term);
      const inExcerpt = post.excerpt.toLowerCase().includes(term);
      const inAuthor = post.author.name.toLowerCase().includes(term);
      const inCategories = post.categories.some((c) =>
        c.title.toLowerCase().includes(term)
      );
      return inTitle || inExcerpt || inAuthor || inCategories;
    });
  }, [allScopePosts, isSearching, searchTerm]);

  const searchTotalPages = useMemo(() => {
    if (!isSearching) return 0;
    return Math.ceil(filteredBySearch.length / POSTS_PER_PAGE);
  }, [filteredBySearch.length, isSearching]);

  const visiblePosts: BlogPost[] = useMemo(() => {
    if (!isSearching) {
      return pagePosts;
    }
    const startIndex = (searchPage - 1) * POSTS_PER_PAGE;
    return filteredBySearch.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [isSearching, pagePosts, filteredBySearch, searchPage]);

  const currentPage = isSearching ? searchPage : page;
  const totalPagesToUse = isSearching ? searchTotalPages : totalPages;
  const totalPostsToUse = isSearching
    ? filteredBySearch.length
    : totalPostsInScope;

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setSearchPage(1);
  };

  const shouldShowFeatured = scope === "all" && !isSearching && !!featuredPost;

  const buildPageHref = (targetPage: number) => {
    if (isSearching) return "#";

    if (scope === "all") {
      if (targetPage <= 1) return "/blog";
      return `/blog/page/${targetPage}`;
    }

    if (targetPage <= 1) {
      return `${basePath}/page/1`;
    }
    return `${basePath}/page/${targetPage}`;
  };

  const goToSearchPage = (target: number) => {
    if (!isSearching) return;
    setSearchPage(target);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const canGoPrev = currentPage > 1;
  const canGoNext = totalPagesToUse > 0 && currentPage < totalPagesToUse;

  const scrollAfterNav = () => {
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background">
      <BlogHero searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      <BlogCategories
        categories={categories}
        activeCategorySlug={activeCategorySlug}
        onNav={scrollAfterNav}
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
            onSearchPageChange={goToSearchPage}
            buildPageHref={buildPageHref}
            onNavigate={scrollAfterNav}
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
