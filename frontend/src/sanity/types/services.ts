export type ServicePackage = {
  name: string;
  price: string;
  tag: "Esencial" | "Crecimiento" | "Pro";
  features: string[];
};

export type ServiceCategory = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  icon: string;
  color?: string;
  gradient?: string;
  packages: ServicePackage[];
};