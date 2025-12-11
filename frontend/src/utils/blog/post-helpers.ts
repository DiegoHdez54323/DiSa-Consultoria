// src/utils/blog/post-helpers.ts
import type { BlogPost } from "../../sanity/types/blog";
import { urlForImage } from "../../sanity/lib/url-for-image";

/**
 * Formatea la fecha de publicación de un post
 * p.ej. "28 nov 2024"
 */
export function formatBlogDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Devuelve algo tipo "5 min" o "" si no hay readTime
 */
export function formatBlogReadTime(readTime?: number): string {
  return readTime ? `${readTime} min` : "";
}

/**
 * Devuelve la categoría principal del post (la primera)
 */
export function getPostMainCategory(
  post: BlogPost
): BlogPost["categories"][number] | undefined {
  return post.categories?.[0];
}

/**
 * Construye la URL de la imagen principal del post usando Sanity
 */
export function getPostImageUrl(post: BlogPost): string | undefined {
  const source = post.mainImage?.source;
  if (!source) return undefined;

  return urlForImage(source)
    .width(800)
    .height(500)
    .fit("crop")
    .format("webp")
    .url();
}
