import type { BlogScope } from "../../types/blog-ui";

interface BuildBlogPageHrefParams {
  scope: BlogScope;
  basePath: string;
  targetPage: number;
}

export function buildBlogPageHref({
  scope,
  basePath,
  targetPage,
}: BuildBlogPageHrefParams): string {
  if (scope === "all") {
    if (targetPage <= 1) return "/blog";
    return `/blog/page/${targetPage}`;
  }

  // scope === "category"
  if (targetPage <= 1) {
    return `${basePath}/page/1`;
  }
  return `${basePath}/page/${targetPage}`;
}
