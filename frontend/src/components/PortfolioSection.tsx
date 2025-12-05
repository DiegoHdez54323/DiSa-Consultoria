import { motion } from "framer-motion";
import { ExternalLink, Github} from "lucide-react";

const projects = [
  {
    title: "FinTech Dashboard",
    category: "Aplicación Web",
    description: "Plataforma de análisis financiero en tiempo real con visualizaciones interactivas y predicciones basadas en IA.",
    technologies: ["React", "Node.js", "PostgreSQL", "TensorFlow"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    color: "from-primary to-accent",
  },
  {
    title: "HealthCare App",
    category: "Aplicación Móvil",
    description: "Sistema de gestión hospitalaria con telemedicina, historiales clínicos y programación inteligente de citas.",
    technologies: ["React Native", "Firebase", "Python", "AWS"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    color: "from-accent to-secondary",
  },
  {
    title: "E-Commerce Platform",
    category: "Plataforma Web",
    description: "Marketplace B2B con sistema de pagos integrado, logística automatizada y panel de analytics.",
    technologies: ["Next.js", "Stripe", "MongoDB", "Docker"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    color: "from-secondary to-primary",
  },
  {
    title: "IoT Management",
    category: "Sistema Industrial",
    description: "Centro de control para dispositivos IoT industriales con monitoreo en tiempo real y mantenimiento predictivo.",
    technologies: ["Vue.js", "Go", "InfluxDB", "MQTT"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    color: "from-primary to-secondary",
  },
  {
    title: "AI Content Studio",
    category: "Herramienta SaaS",
    description: "Plataforma de generación de contenido con IA, incluyendo texto, imágenes y análisis de sentimiento.",
    technologies: ["TypeScript", "OpenAI", "Redis", "Kubernetes"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    color: "from-accent to-primary",
  },
  {
    title: "Smart Logistics",
    category: "Sistema Empresarial",
    description: "Optimización de rutas y gestión de flota con machine learning y tracking en tiempo real.",
    technologies: ["Angular", "Java", "Kafka", "GCP"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
    color: "from-secondary to-accent",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const PortfolioSection = () => {
  return (
    <section className="relative py-24 bg-gradient-hero overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-inter font-medium mb-4">
            Portafolio
          </span>
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-foreground mb-4">
            Proyectos que <span className="text-gradient-secondary">inspiran</span>
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Ideas disruptivas convertidas en soluciones reales. 
            Cada proyecto es una historia de innovación y excelencia técnica.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full rounded-2xl overflow-hidden border border-border/50 bg-card transition-all duration-500 hover:border-primary/30 hover:glow-primary">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-40 group-hover:opacity-60 transition-opacity`} />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-xs font-inter font-medium text-foreground">
                    {project.category}
                  </div>

                  {/* Action buttons */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-full glass hover:bg-primary/20 transition-colors">
                      <ExternalLink className="w-4 h-4 text-foreground" />
                    </button>
                    <button className="p-2 rounded-full glass hover:bg-primary/20 transition-colors">
                      <Github className="w-4 h-4 text-foreground" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-orbitron text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-inter text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded-md bg-muted/50 text-xs font-inter text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
