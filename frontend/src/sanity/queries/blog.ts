import groq from "groq";

/**
 * Fragmento base para un BlogPost completo,
 */
const blogPostFields = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage{
    ...,
    asset->
  },
  publishedAt,
  readTime,
  featured,
  author->{
    _id,
    name,
    "slug": slug.current,
    role,
    avatar{
      ...,
      asset->
    }
  },
  categories[]->{
    _id,
    title,
    "slug": slug.current,
    description
  },
  body
`;

/**
 * 1. Todos los posts, ordenados por fecha de publicación descendente
 */
export const allBlogPostsQuery = groq`
  *[_type == "blogPost"]
  | order(publishedAt desc) {
    ${blogPostFields}
  }
`;

/**
 * 2. Posts destacados (featured == true), ordenados por fecha
 */
export const featuredBlogPostsQuery = groq`
  *[_type == "blogPost" && featured == true]
  | order(publishedAt desc) {
    ${blogPostFields}
  }
`;

/**
 * 3. Post por slug (para páginas tipo /blog/[slug])
 */
export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0]{
    ${blogPostFields}
  }
`;

/**
 * 4. Posts por categoría (filtrando por slug de categoría)
 */
export const blogPostsByCategorySlugQuery = groq`
  *[
    _type == "blogPost" &&
    $categorySlug in categories[]->slug.current
  ]
  | order(publishedAt desc) {
    ${blogPostFields}
  }
`;

export const latestBlogPostsQuery = groq`
  *[_type == "blogPost"]
  | order(publishedAt desc)[0...3] {
    ${blogPostFields}
  }
`;

export const allBlogCategoriesQuery = groq`
  *[_type == "blogCategory"]
  | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description
  }
`;
