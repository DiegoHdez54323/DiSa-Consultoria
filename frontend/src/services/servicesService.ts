import type {
  ServicesCategory,
  ServicesPackage,
} from "../sanity/types/services";
import { SERVICES_QUERY } from "../sanity/queries/services";
import { loadQuery } from "../sanity/lib/load-query";
import { string } from "astro:schema";

/**
 * Mapea un documento crudo de Sanity al tipo de dominio `Service`.
 */

function mapServicePackage(doc: any): ServicesPackage {
  return {
    name: doc.name,
    price: doc.price,
    tag: doc.tag,
    features: doc.features,
  };
}

function mapServicesCategory(doc: any): ServicesCategory {
  const packages: ServicesPackage[] = doc.packages.map(mapServicePackage);
  return {
    id: doc.id,
    title: doc.title,
    subtitle: doc.subtitle,
    description: doc.description,
    icon: doc.icon,
    color: doc.color,
    gradient: doc.gradient,
    packages,
  };
}

/**
 * Obtiene todos los servicios ordenados por `number`.
 */

export async function getAllServices(): Promise<ServicesCategory[]> {
  try {
    const { data: docs } = await loadQuery<any[]>({
      query: SERVICES_QUERY,
    });

    return (docs ?? []).map(mapServicesCategory);
  } catch (error) {
    console.error(
      "[servicesService] Error al obtener todos los servicios:",
      error
    );
    throw new Error("No se pudieron obtener los servicios");
  }
}
