import { useState, useMemo } from "react";
import type { BlogPost } from "../sanity/types/blog";
import { POSTS_PER_PAGE } from "../config/blog";

interface UseBlogListingParams {
  page: number;
  totalPages: number;
  totalPostsInScope: number;
  pagePosts: BlogPost[];
  allScopePosts: BlogPost[];
}

export function useBlogListing({
  page,
  totalPages,
  totalPostsInScope,
  pagePosts,
  allScopePosts,
}: UseBlogListingParams) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPage, setSearchPage] = useState(1);

  const isSearching = searchTerm.trim().length > 0;

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

  const canGoPrev = currentPage > 1;
  const canGoNext = totalPagesToUse > 0 && currentPage < totalPagesToUse;

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setSearchPage(1);
  };

  const goToSearchPage = (target: number) => {
    if (!isSearching) return;
    setSearchPage(target);
  };

  return {
    // state
    searchTerm,
    isSearching,
    currentPage,
    totalPagesToUse,
    totalPostsToUse,
    visiblePosts,

    // pagination helpers
    canGoPrev,
    canGoNext,
    goToSearchPage,

    // search helpers
    handleSearchChange,
  };
}
