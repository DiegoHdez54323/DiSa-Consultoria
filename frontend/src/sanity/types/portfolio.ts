import type { SanityImageSource } from "@sanity/image-url";

export interface PortfolioCategory {
  id: string;
  title: string;
  slug?: string;
}

export interface PortfolioImage {
  source: SanityImageSource;
  alt: string;
}

export interface PortfolioResult {
  title: string;
  description: string;
}

export interface PortfolioProcessStep {
  title: string;
  description: string; 
}

export interface PortfolioQuote {
  text: string;
  author: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug?: string;
  subtitle?: string;
  description: string;
  heroImage?: PortfolioImage;
  gallery?: PortfolioImage[];
  challenge?: string;
  quote?: PortfolioQuote;
  results?: PortfolioResult[];
  process?: PortfolioProcessStep[];
  industries: string[];
  technologies: string[];
  image: PortfolioImage;
  color?: string;
  categories: PortfolioCategory[];
  gradient?: string;
  year: string;
  link?: string;
}
