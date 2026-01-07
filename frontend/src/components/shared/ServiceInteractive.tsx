import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone, MousePointerClick, HelpCircle } from "lucide-react";
// Importamos TODOS los iconos
import * as LucideIcons from "lucide-react";
import { ServiceModal } from "./ServiceModal";
// Importamos el tipo corregido
import type { ServicesCategory } from "../../sanity/types/services";

interface Props {
  initialServices: ServicesCategory[];
}

export const ServicesInteractive = ({ initialServices }: Props) => {
  const [selectedCategory, setSelectedCategory] =
    useState<ServicesCategory | null>(null);

  // Protección por si viene undefined
  const services = initialServices || [];

  return (
    <>
      <section
        className="py-24 pt-30 relative bg-background overflow-hidden"
        id="servicios"
      >
        {/* Background Effects (Sin cambios) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 opacity-50" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block py-1.5 px-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-sm"
            >
              Catálogo de Soluciones
            </motion.span>
            <h2 className="font-orbitron text-4xl md:text-6xl font-black mb-6 text-foreground leading-tight">
              Tecnología para <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-purple-500 animate-gradient-x">
                Escalar tu Negocio
              </span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Selecciona una categoría para explorar nuestros paquetes y
              encontrar el ajuste perfecto para tu etapa de crecimiento.
            </p>
          </div>

          {/* Grid de Servicios */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              // --- CORRECCIÓN AQUÍ ---
              // Usamos (LucideIcons as any) para evitar el error de índice string
              const IconComponent =
                (LucideIcons as any)[service.icon] || HelpCircle;

              // Fallbacks seguros
              const gradientClass =
                service.gradient || "from-primary to-blue-500";
              const colorClass = service.color || "text-primary";

              return (
                <motion.div
                  key={service.id}
                  layoutId={`card-container-${service.id}`}
                  onClick={() => setSelectedCategory(service)}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group cursor-pointer relative rounded-[2rem] bg-card/40 border border-white/5 hover:border-primary/20 transition-colors duration-500 backdrop-blur-sm"
                >
                  <div
                    className={`absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b ${gradientClass.replace("from-", "from-").replace("to-", "to-transparent")} opacity-5`}
                  />

                  <div className="relative p-8 h-full flex flex-col z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div
                        className={`p-4 rounded-2xl bg-card border border-white/5 shadow-xl group-hover:scale-110 transition-transform duration-500 ${colorClass}`}
                      >
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
                        <MousePointerClick className="w-3 h-3" />
                        <span>Ver Planes</span>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <h3 className="font-orbitron text-2xl font-bold text-foreground mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-400 transition-all">
                        {service.title}
                      </h3>
                      <p
                        className={`text-xs font-bold uppercase tracking-widest mb-4 opacity-70 ${colorClass}`}
                      >
                        {service.subtitle}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2 group-hover:text-foreground/80">
                        {service.description}
                      </p>

                      <div className="flex items-center gap-2 text-sm font-bold text-foreground opacity-60 group-hover:opacity-100 transition-opacity">
                        Explorar{" "}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-24 text-center">
            <a
              href="/contacto"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              ¿No encuentras lo que buscas? Agenda una llamada personalizada
            </a>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedCategory && (
          <ServiceModal
            selectedCategory={selectedCategory}
            onClose={() => setSelectedCategory(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
