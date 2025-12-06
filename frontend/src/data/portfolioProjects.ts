export type Project = {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  color: string;
};

export const projects: Project[] = [
  {
    title: "FinTech Dashboard",
    category: "Aplicación Web",
    description:
      "Plataforma de análisis financiero en tiempo real con visualizaciones interactivas y predicciones basadas en IA.",
    technologies: ["React", "Node.js", "PostgreSQL", "TensorFlow"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    color: "from-primary to-accent",
  },
  {
    title: "HealthCare App",
    category: "Aplicación Móvil",
    description:
      "Sistema de gestión hospitalaria con telemedicina, historiales clínicos y programación inteligente de citas.",
    technologies: ["React Native", "Firebase", "Python", "AWS"],
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    color: "from-accent to-secondary",
  },
  {
    title: "E-Commerce Platform",
    category: "Plataforma Web",
    description:
      "Marketplace B2B con sistema de pagos integrado, logística automatizada y panel de analytics.",
    technologies: ["Next.js", "Stripe", "MongoDB", "Docker"],
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    color: "from-secondary to-primary",
  },
  {
    title: "IoT Management",
    category: "Sistema Industrial",
    description:
      "Centro de control para dispositivos IoT industriales con monitoreo en tiempo real y mantenimiento predictivo.",
    technologies: ["Vue.js", "Go", "InfluxDB", "MQTT"],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    color: "from-primary to-secondary",
  },
  {
    title: "AI Content Studio",
    category: "Herramienta SaaS",
    description:
      "Plataforma de generación de contenido con IA, incluyendo texto, imágenes y análisis de sentimiento.",
    technologies: ["TypeScript", "OpenAI", "Redis", "Kubernetes"],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    color: "from-accent to-primary",
  },
  {
    title: "Smart Logistics",
    category: "Sistema Empresarial",
    description:
      "Optimización de rutas y gestión de flota con machine learning y tracking en tiempo real.",
    technologies: ["Angular", "Java", "Kafka", "GCP"],
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
    color: "from-secondary to-accent",
  },
];
