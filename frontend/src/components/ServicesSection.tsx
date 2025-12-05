import {motion} from "framer-motion"
import {Code, Cloud, Cpu, Palette, Workflow, Bot} from "lucide-react"

const services = [
  {
    icon: Code,
    title: "Desarrollo a Medida",
    description: "Software personalizado que se adapta perfectamente a tus procesos de negocio.",
    gradient: "from-primary to-accent",
  },
  {
    icon: Workflow,
    title: "Integraciones & APIs",
    description: "Conectamos tus sistemas para crear flujos de trabajo eficientes y automatizados.",
    gradient: "from-accent to-secondary",
  },
  {
    icon: Cpu,
    title: "Consultoría Tecnológica",
    description: "Asesoramiento estratégico para tomar las mejores decisiones tecnológicas.",
    gradient: "from-secondary to-primary",
  },
  {
    icon: Cloud,
    title: "Arquitectura Cloud",
    description: "Infraestructura escalable y resiliente en AWS, Azure o GCP.",
    gradient: "from-primary to-secondary",
  },
  {
    icon: Palette,
    title: "UX/UI Futurista",
    description: "Interfaces que cautivan y experiencias de usuario que convierten.",
    gradient: "from-accent to-primary",
  },
  {
    icon: Bot,
    title: "Automatización & IA",
    description: "Potenciamos tu negocio con inteligencia artificial y automatización inteligente.",
    gradient: "from-secondary to-accent",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const ServicesSection = () => {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-inter font-medium mb-4">
            Nuestros Servicios
          </span>
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-foreground mb-4">
            Soluciones que <span className="text-gradient-primary">transforman</span>
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Combinamos tecnología de vanguardia con metodologías ágiles para crear 
            soluciones que impulsan tu negocio hacia el futuro.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full p-8 rounded-2xl bg-gradient-card border border-border/50 overflow-hidden transition-all duration-500 hover:border-primary/30 hover:glow-primary">
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} p-0.5 mb-6`}>
                  <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-orbitron text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="font-inter text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Bottom line accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};


