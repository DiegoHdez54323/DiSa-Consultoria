import type {
  PortfolioProject,
  PortfolioCategory,
} from "../sanity/types/portfolio";
import {
  allPortfolioProjectsQuery,
  portfolioProjectsByCategorySlugQuery,
  portfolioProjectByIdQuery,
  portfolioProjectBySlugQuery, // Importamos la nueva query
} from "../sanity/queries/portfolio";
import { loadQuery } from "../sanity/lib/load-query";

function mapPortfolioProject(doc: any): PortfolioProject {
  const categories: PortfolioCategory[] = (doc.categories ?? []).map(
    (cat: any) => ({
      id: cat._id,
      title: cat.title,
      slug: cat.slug ?? undefined,
    })
  );

  return {
    id: doc._id,
    title: doc.title,
    slug: doc.slug, // Mapeamos el slug
    subtitle: doc.subtitle,
    description: doc.description,
    heroImage: doc.heroImage ? { source: doc.heroImage, alt: doc.title } : undefined,
    gallery: doc.gallery?.map((img: any) => ({
      source: img,
      alt: img.alt || "Imagen de galeria"
    })),
    challenge: doc.challenge,
    quote: doc.quote,
    results: doc.results,
    process: doc.process,
    industries: doc.industries,
    technologies: doc.technologies ?? [],
    image: {
      source: doc.image, 
      alt: doc.image?.alt ?? "",
    },
    color: doc.color ?? undefined,
    categories,
    gradient: doc.gradient ?? undefined,
    year: doc.year,
    link: doc.link ?? undefined, 
  };
}

/**
 * Obtiene todos los proyectos del portafolio.
 */
export async function getAllPortfolioProjects(): Promise<PortfolioProject[]> {
  try {
    const { data: docs } = await loadQuery<any[]>({
      query: allPortfolioProjectsQuery,
    });

    return (docs ?? []).map(mapPortfolioProject);
  } catch (error) {
    console.error(
      "[portfolioService] Error al obtener todos los proyectos de portafolio:",
      error
    );
    throw new Error("No se pudieron obtener los proyectos de portafolio.");
  }
}

/**
 * NUEVO: Obtiene un proyecto por su slug.
 */
export async function getPortfolioProjectBySlug(
  slug: string
): Promise<PortfolioProject | null> {
  try {
    const { data: doc } = await loadQuery<any>({
      query: portfolioProjectBySlugQuery,
      params: { slug },
    });

    if (!doc) return null;
    return mapPortfolioProject(doc);
  } catch (error) {
    console.error(
      `[portfolioService] Error al obtener proyecto de portafolio con slug=${slug}:`,
      error
    );
    return null;
  }
}

/**
 * Obtiene proyectos filtrados por slug de categoría.
 */
export async function getPortfolioProjectsByCategorySlug(
  slug: string
): Promise<PortfolioProject[]> {
  try {
    const { data: docs } = await loadQuery<any[]>({
      query: portfolioProjectsByCategorySlugQuery,
      params: { slug },
    });

    return (docs ?? []).map(mapPortfolioProject);
  } catch (error) {
    console.error(
      `[portfolioService] Error al obtener proyectos de portafolio por categoría slug="${slug}":`,
      error
    );
    throw new Error(
      "No se pudieron obtener los proyectos de portafolio para esa categoría."
    );
  }
}

/**
 * (Opcional) Obtiene un proyecto por su _id interno.
 */
export async function getPortfolioProjectById(
  id: string
): Promise<PortfolioProject | null> {
  try {
    const { data: doc } = await loadQuery<any>({
      query: portfolioProjectByIdQuery,
      params: { id },
    });

    if (!doc) return null;
    return mapPortfolioProject(doc);
  } catch (error) {
    console.error(
      `[portfolioService] Error al obtener proyecto de portafolio con id=${id}:`,
      error
    );
    throw new Error("No se pudo obtener el proyecto de portafolio.");
  }
}''