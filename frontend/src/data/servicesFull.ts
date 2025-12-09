// src/data/servicesFull.ts
import { Code, Cloud, Cpu, Palette, Workflow, Bot } from "lucide-react"; // Importamos tipos si es necesario, pero usaremos strings para iconos dinámicos en Astro si quisieramos, aquí lo mantenemos simple para el componente React.

export const servicesData = [
  {
    icon: Code,
    title: "Desarrollo a Medida",
    subtitle: "Software Personalizado",
    description: "Creamos software que se adapta perfectamente a tus procesos de negocio.",
    features: ["Aplicaciones web modernas", "Apps móviles nativas", "Microservicios & APIs"],
    gradient: "from-primary via-accent to-primary",
    number: "01",
  },
  {
    icon: Workflow,
    title: "Integraciones & APIs",
    subtitle: "Conectividad Total",
    description: "Conectamos tus sistemas para flujos de trabajo eficientes y automatizados.",
    features: ["Integración de sistemas", "APIs REST/GraphQL", "Eventos en tiempo real"],
    gradient: "from-accent via-secondary to-accent",
    number: "02",
  },
  {
    icon: Cpu,
    title: "Consultoría Tech",
    subtitle: "Estrategia Digital",
    description: "Asesoramiento para tomar las mejores decisiones tecnológicas.",
    features: ["Auditorías técnicas", "Roadmaps digitales", "Mentoring de equipos"],
    gradient: "from-secondary via-primary to-secondary",
    number: "03",
  },
  {
    icon: Cloud,
    title: "Arquitectura Cloud",
    subtitle: "Infraestructura Escalable",
    description: "Infraestructura escalable y resiliente en las principales plataformas.",
    features: ["Migración a la nube", "DevOps & CI/CD", "Kubernetes"],
    gradient: "from-primary via-secondary to-primary",
    number: "04",
  },
  {
    icon: Palette,
    title: "UX/UI Futurista",
    subtitle: "Diseño de Experiencias",
    description: "Interfaces que cautivan y convierten visitantes en clientes.",
    features: ["Design Systems", "Prototipado rápido", "Diseño accesible"],
    gradient: "from-accent via-primary to-accent",
    number: "05",
  },
  {
    icon: Bot,
    title: "Automatización & IA",
    subtitle: "Inteligencia Artificial",
    description: "Potenciamos tu negocio con IA y automatización inteligente.",
    features: ["Chatbots avanzados", "Análisis predictivo", "NLP & ML"],
    gradient: "from-secondary via-accent to-secondary",
    number: "06",
  },
];