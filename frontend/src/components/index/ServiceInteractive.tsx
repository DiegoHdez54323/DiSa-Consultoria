import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight, HelpCircle, Phone, MousePointerClick } from "lucide-react";
import { servicesData, type ServiceCategory } from "../../data/servicesFull";

export const ServicesInteractive = () => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [showQuoteInfo, setShowQuoteInfo] = useState(false);

  // Estilos dinámicos para los paquetes dentro del modal
  const getPackageStyles = (tag: string) => {
    switch (tag) {
      case "Esencial":
        return {
          wrapper: "border-white/10 bg-white/5 hover:border-white/20",
          badge: "bg-gray-800 text-gray-300",
          button: "bg-white/10 text-white hover:bg-white/20 border border-white/10",
          priceColor: "text-white",
          featureIcon: "text-gray-500"
        };
      case "Crecimiento":
        return {
          wrapper: "border-primary/50 bg-primary/10 shadow-2xl shadow-primary/20 relative z-10 transform md:-translate-y-4", 
          badge: "bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/40",
          button: "bg-gradient-primary text-primary-foreground hover:glow-primary shadow-lg shadow-primary/20",
          priceColor: "text-primary",
          featureIcon: "text-primary"
        };
      case "Pro":
        return {
          wrapper: "border-purple-500/30 bg-purple-500/5 hover:border-purple-500/50",
          badge: "bg-purple-900/40 text-purple-200 border border-purple-500/20",
          button: "bg-purple-600/20 text-purple-200 hover:bg-purple-600/40 border border-purple-500/30",
          priceColor: "text-purple-300",
          featureIcon: "text-purple-400"
        };
      default:
        return { wrapper: "", badge: "", button: "", priceColor: "", featureIcon: "" };
    }
  };

  return (
    <section className="py-24 pt-30 relative bg-background overflow-hidden" id="servicios">
      
      {/* --- FONDO COPIADO DEL CTA (Efecto Glow Animado) --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
          {/* 1. Gradiente base sutil */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 opacity-50" />
          
          {/* 2. Orbe Azul (Top Right) - Animado */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          
          {/* 3. Orbe Morado (Bottom Left) - Animado con delay */}
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- ENCABEZADO --- */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block py-1.5 px-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-sm"
          >
            Catálogo de Soluciones
          </motion.span>
          <h2 className="font-orbitron text-4xl md:text-6xl font-black mb-6 text-foreground leading-tight">
            Tecnología para <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-purple-500 animate-gradient-x">Escalar tu Negocio</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Selecciona una categoría para explorar nuestros paquetes y encontrar el ajuste perfecto para tu etapa de crecimiento.
          </p>
        </div>

        {/* --- GRID PRINCIPAL (GLASS CARDS) --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => (
            <motion.div
              key={service.id}
              layoutId={`card-container-${service.id}`}
              onClick={() => setSelectedCategory(service)}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              // Ajustamos el fondo de la tarjeta para que combine con el nuevo background global
              className="group cursor-pointer relative rounded-[2rem] bg-card/40 border border-white/5 hover:border-primary/20 transition-colors duration-500 backdrop-blur-sm"
            >
              {/* Efecto Glow Interno al Hover */}
              <div className={`absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b ${service.gradient.replace('from-', 'from-').replace('to-', 'to-transparent').replace('text-', '')} opacity-5`} />
              
              <div className="relative p-8 h-full flex flex-col z-10">
                {/* Header Card */}
                <div className="flex justify-between items-start mb-8">
                  <div className={`p-4 rounded-2xl bg-card border border-white/5 shadow-xl group-hover:scale-110 transition-transform duration-500 ${service.color}`}>
                    <service.icon className="w-8 h-8" />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
                    <MousePointerClick className="w-3 h-3" />
                    <span>Ver Planes</span>
                  </div>
                </div>

                {/* Contenido Card */}
                <div className="mt-auto">
                   <h3 className="font-orbitron text-2xl font-bold text-foreground mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-400 transition-all">
                     {service.title}
                   </h3>
                   <p className={`text-xs font-bold uppercase tracking-widest mb-4 opacity-70 ${service.color}`}>
                     {service.subtitle}
                   </p>
                   <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2 group-hover:text-foreground/80">
                     {service.description}
                   </p>
                   
                   {/* Link Simulado */}
                   <div className="flex items-center gap-2 text-sm font-bold text-foreground opacity-60 group-hover:opacity-100 transition-opacity">
                     Explorar <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- MODAL EXPANDIBLE (PRICING TABLE) --- */}
        <AnimatePresence>
          {selectedCategory && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
              
              {/* Backdrop Blur Oscuro */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCategory(null)}
                className="fixed inset-0 bg-background/80 backdrop-blur-xl"
              />

              <motion.div
                layoutId={`card-container-${selectedCategory.id}`}
                className="relative w-full max-w-7xl max-h-[95vh] bg-card border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
              >
                {/* 1. Modal Header (Sticky) */}
                <div className="relative shrink-0 p-8 md:p-10 border-b border-white/5 bg-card/95 backdrop-blur z-20 flex items-center justify-between">
                   <div className="flex items-center gap-6">
                      <div className={`hidden md:flex p-4 rounded-2xl bg-muted/20 border border-white/10 shadow-inner`}>
                         <selectedCategory.icon className={`w-8 h-8 ${selectedCategory.color}`} />
                      </div>
                      <div>
                        <motion.h3 layoutId={`title-${selectedCategory.id}`} className="font-orbitron text-2xl md:text-4xl font-black text-foreground mb-2">
                          {selectedCategory.title}
                        </motion.h3>
                        <p className="text-muted-foreground text-sm md:text-base max-w-2xl">{selectedCategory.description}</p>
                      </div>
                   </div>
                   <button
                    onClick={() => setSelectedCategory(null)}
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors border border-white/5"
                   >
                     <X className="w-6 h-6" />
                   </button>
                </div>

                {/* 2. Modal Body (Pricing Grid Scrollable) */}
                <div className="p-6 md:p-10 overflow-y-auto bg-grid-white/[0.02]">
                   <div className="grid md:grid-cols-3 gap-6 md:gap-8 pt-6 pb-4 items-start">
                      {selectedCategory.packages.map((pkg, idx) => {
                        const styles = getPackageStyles(pkg.tag);
                        return (
                          <div 
                            key={idx} 
                            className={`relative flex flex-col p-8 rounded-[2rem] border transition-all duration-300 group ${styles.wrapper}`}
                          >
                             {/* Badge de Recomendado */}
                             {pkg.tag === 'Crecimiento' && (
                               <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-blue-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-primary/30 z-20">
                                 Más Popular
                               </div>
                             )}

                             <div className="mb-8 text-center">
                                <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg mb-4 ${styles.badge}`}>
                                  {pkg.tag}
                                </span>
                                <h4 className="font-orbitron text-xl font-bold text-foreground mb-4">{pkg.name}</h4>
                                <div className={`text-2xl md:text-3xl font-black ${styles.priceColor}`}>
                                  {pkg.price}
                                </div>
                                <span className="text-xs text-muted-foreground font-medium mt-1 block">MXN + IVA (Estimado)</span>
                             </div>

                             {/* Separator */}
                             <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

                             <ul className="space-y-4 mb-10 flex-grow px-2">
                               {pkg.features.map((feat, i) => (
                                 <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                   <div className={`mt-0.5 shrink-0 ${styles.featureIcon}`}>
                                     <Check className="w-4 h-4" />
                                   </div>
                                   <span className="leading-snug">{feat}</span>
                                 </li>
                               ))}
                             </ul>

                             <a
                               href={`/contacto?servicio=${encodeURIComponent(selectedCategory.title)}&paquete=${encodeURIComponent(pkg.name)}`}
                               className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wide transition-all transform active:scale-95 text-center flex items-center justify-center gap-2 ${styles.button}`}
                             >
                               Cotizar Ahora
                               <ArrowRight className="w-4 h-4" />
                             </a>
                          </div>
                        );
                      })}
                   </div>
                </div>

                {/* 3. Modal Footer */}
                <div className="shrink-0 p-6 bg-card border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 z-20">
                   <div className="flex items-center gap-2 relative group">
                      <HelpCircle className="w-4 h-4 text-muted-foreground" />
                      <button 
                        onClick={(e) => { e.stopPropagation(); setShowQuoteInfo(!showQuoteInfo); }}
                        className="text-muted-foreground hover:text-foreground text-xs md:text-sm underline decoration-dotted transition-colors"
                      >
                        ¿Cómo funcionan los pagos?
                      </button>
                      
                      {/* Tooltip simple */}
                      {showQuoteInfo && (
                        <div className="absolute bottom-full left-0 mb-4 w-72 p-5 bg-popover border border-border rounded-xl shadow-2xl z-50 text-left">
                          <h6 className="font-bold text-foreground text-xs mb-3 uppercase tracking-wider">Modelo DiSa</h6>
                          <ol className="list-decimal list-inside space-y-2 text-xs text-muted-foreground">
                             <li>Anticipo para Diagnóstico (Acreditable).</li>
                             <li>50% al firmar contrato.</li>
                             <li>Resto contra entregables.</li>
                          </ol>
                        </div>
                      )}
                   </div>
                   
                   <p className="text-xs text-muted-foreground text-center sm:text-right">
                     * Precios sujetos a evaluación técnica final.
                   </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* --- CTA EXTRA --- */}
        <div className="mt-24 text-center">
             <a href="/contacto" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
               <Phone className="w-4 h-4" />
               ¿No encuentras lo que buscas? Agenda una llamada personalizada
             </a>
        </div>

      </div>
    </section>
  );
};