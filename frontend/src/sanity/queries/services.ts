import { defineQuery } from "groq";
import groq from "groq";

export const SERVICES_QUERY = groq`
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
  }`;
