// src/services/blogService.ts
import type {
  BlogPost,
  BlogAuthor,
  BlogCategory,
  BlogAuthorAvatar,
  BlogMainImage,
} from "../sanity/types/blog";
import {
  allBlogPostsQuery,
  featuredBlogPostsQuery,
  blogPostBySlugQuery,
  blogPostsByCategorySlugQuery,
  latestBlogPostsQuery,
  allBlogCategoriesQuery,
} from "../sanity/queries/blog";
import { loadQuery } from "../sanity/lib/load-query";

/**
 * Mapea un documento crudo de Sanity al tipo BlogCategory.
 */
function mapBlogCategory(cat: any): BlogCategory {
  return {
    id: cat._id,
    title: cat.title,
    slug: cat.slug,
    description: cat.description ?? undefined,
  };
}

/**
 * Mapea el avatar del autor.
 */
function mapBlogAuthorAvatar(avatar: any): BlogAuthorAvatar | undefined {
  if (!avatar) return undefined;

  return {
    source: avatar, // objeto de imagen/asset completo
    alt: avatar.alt ?? undefined,
  };
}

/**
 * Mapea un autor crudo de Sanity al tipo BlogAuthor.
 */
function mapBlogAuthor(author: any): BlogAuthor {
  return {
    id: author._id,
    name: author.name,
    slug: author.slug,
    role: author.role ?? undefined,
    avatar: mapBlogAuthorAvatar(author.avatar),
  };
}

/**
 * Mapea la imagen principal del post.
 */
function mapBlogMainImage(image: any): BlogMainImage | undefined {
  if (!image) return undefined;

  return {
    source: image, // objeto de imagen/asset completo
    alt: image.alt ?? "",
  };
}

/**
 * Mapea un documento crudo de Sanity al tipo BlogPost.
 * Espera que el doc ya tenga la forma del fragmento `blogPostFields` en las queries.
 */
function mapBlogPost(doc: any): BlogPost {
  const author = mapBlogAuthor(doc.author);
  const categories: BlogCategory[] = (doc.categories ?? []).map(
    mapBlogCategory
  );

  return {
    id: doc._id,
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    mainImage: mapBlogMainImage(doc.mainImage),
    publishedAt: doc.publishedAt,
    readTime: doc.readTime ?? undefined,
    featured: doc.featured ?? undefined,
    author,
    categories,
    body: doc.body ?? [],
  };
}

/**
 * 1. Obtiene todos los posts de blog, ordenados por fecha descendente.
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data: docs } = await loadQuery<any[]>({
      query: allBlogPostsQuery,
    });

    return (docs ?? []).map(mapBlogPost);
  } catch (error) {
    console.error("[blogService] Error al obtener todos los posts:", error);
    throw new Error("No se pudieron obtener las entradas de blog.");
  }
}

/**
 * 2. Obtiene los posts destacados (featured == true).
 */
export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data: docs } = await loadQuery<any[]>({
      query: featuredBlogPostsQuery,
    });

    return (docs ?? []).map(mapBlogPost);
  } catch (error) {
    console.error("[blogService] Error al obtener posts destacados:", error);
    throw new Error("No se pudieron obtener las entradas de blog destacadas.");
  }
}

/**
 * 3. Obtiene un post por su slug.
 *    Devuelve `null` si no existe.
 */
export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  try {
    const { data: doc } = await loadQuery<any>({
      query: blogPostBySlugQuery,
      params: { slug },
    });

    if (!doc) return null;
    return mapBlogPost(doc);
  } catch (error) {
    console.error(
      `[blogService] Error al obtener post por slug="${slug}":`,
      error
    );
    throw new Error("No se pudo obtener la entrada de blog por slug.");
  }
}

/**
 * 4. Obtiene posts filtrados por slug de categoría.
 */
export async function getBlogPostsByCategorySlug(
  categorySlug: string
): Promise<BlogPost[]> {
  try {
    const { data: docs } = await loadQuery<any[]>({
      query: blogPostsByCategorySlugQuery,
      params: { categorySlug },
    });

    return (docs ?? []).map(mapBlogPost);
  } catch (error) {
    console.error(
      `[blogService] Error al obtener posts por categoría slug="${categorySlug}":`,
      error
    );
    throw new Error(
      "No se pudieron obtener las entradas de blog para esa categoría."
    );
  }
}

/**
 * 5. Últimos 3 posts (para el home)
 */
export async function getLatestBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data: docs } = await loadQuery<any[]>({
      query: latestBlogPostsQuery,
    });

    return (docs ?? []).map(mapBlogPost);
  } catch (error) {
    console.error("[blogService] Error al obtener últimos posts:", error);
    throw new Error("No se pudieron obtener los últimos posts de blog.");
  }
}

export async function getAllBlogCategories(): Promise<BlogCategory[]> {
  try {
    const { data: docs } = await loadQuery<any[]>({
      query: allBlogCategoriesQuery,
    });

    return (docs ?? []).map(mapBlogCategory);
  } catch (error) {
    console.error("[blogService] Error al obtener categorías de blog:", error);
    throw new Error("No se pudieron obtener las categorías de blog.");
  }
}
