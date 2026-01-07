import { defineQuery } from "groq";

export const SERVICES_QUERY = defineQuery(`
  *[_type == "servicesType"] | order(_createdAt asc){
    "id": slug.current,
    title,
    subtitle,
    description,
    icon,
    color,
    gradient,
    packages[]{
      name,
      price,
      tag,
      features
    }
  }
`);