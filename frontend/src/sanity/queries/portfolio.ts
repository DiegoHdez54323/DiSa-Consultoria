import groq from "groq";

// Agregamos "slug": slug.current en todas las consultas
export const allPortfolioProjectsQuery = groq`
  *[_type == "portfolioType"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current, 
    description,
    technologies,
    color,
    image{
      ...,
      asset->
    },
    categories[]->{
      _id,
      title,
      "slug": slug.current
    },
    gradient,
    year,
    link
  }
`;

export const portfolioProjectsByCategorySlugQuery = groq`
  *[
    _type == "portfolioType" &&
    $slug in categories[]->slug.current
  ] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    technologies,
    color,
    image{
      ...,
      asset->
    },
    categories[]->{
      _id,
      title,
      "slug": slug.current
    },
    gradient,
    year,
    link
  }
`;

// Query pagina de proyecto
export const portfolioProjectBySlugQuery = groq`
  *[_type == "portfolioType" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    description,
    heroImage{ ..., asset-> },
    gallery[]{ ..., asset-> },
    challenge,
    quote,
    results,
    process,
    industries,
    technologies,
    color,
    image{
      ...,
      asset->
    },
    categories[]->{
      _id,
      title,
      "slug": slug.current
    },
    gradient,
    year,
    link
  }
`;

export const portfolioProjectByIdQuery = groq`
  *[_type == "portfolioType" && _id == $id][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    technologies,
    color,
    image{
      ...,
      asset->
    },
    categories[]->{
      _id,
      title,
      "slug": slug.current
    },
    gradient,
    year,
    link
  }
`;