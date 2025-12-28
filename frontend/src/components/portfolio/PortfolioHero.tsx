import { motion, useInView, animate } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

// Componente para animar el número (Contador)
const Counter = ({ from, to }: { from: number; to: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const controls = animate(from, to, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = value.toFixed(0);
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, isInView]);

  return <span ref={nodeRef} />;
};

interface PortfolioHeroProps {
  projectCount?: number; // Prop opcional para recibir el total
}

export const PortfolioHero = ({ projectCount = 50 }: PortfolioHeroProps) => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-secondary/30 to-transparent rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-primary/20 to-transparent rounded-full blur-3xl"
          />
        </div>
        
        <div className="relative container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            {/* Animated badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-secondary rounded-full blur-md opacity-50" />
                <span className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-inter font-medium">
                  <Sparkles className="w-4 h-4" />
                  Nuestro Trabajo
                </span>
              </div>
            </motion.div>
            
            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-6"
            >
              <h1 className="font-sora text-4xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight">
                Proyectos que
              </h1>
              <div className="relative inline-block mt-2">
                <span className="font-sora text-4xl md:text-7xl lg:text-8xl font-bold text-gradient-secondary">
                  Inspiran
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-secondary origin-left rounded-full"
                />
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-inter text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto"
            >
              Ideas disruptivas convertidas en soluciones reales. 
              Cada proyecto cuenta una historia de innovación.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-6 md:gap-12 mt-12"
            >
              {/* Stat 1: Proyectos (Dinámico con Contador) */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="font-sora text-4xl md:text-5xl font-bold text-gradient-primary flex items-center justify-center">
                  <Counter from={0} to={projectCount} />
                  <span>+</span>
                </div>
                <div className="font-inter text-sm text-muted-foreground mt-1">
                  Proyectos
                </div>
              </motion.div>

              {/* Stat 2 & 3: Clientes y Satisfacción (Estáticos) */}
              {[
                { value: "4+", label: "Clientes" },
                { value: "100%", label: "Satisfacción" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="font-sora text-4xl md:text-5xl font-bold text-gradient-primary">
                    {stat.value}
                  </div>
                  <div className="font-inter text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
  );
}