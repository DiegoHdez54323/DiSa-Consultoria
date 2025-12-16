import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const ContactHero = () => {
  const benefits = [
    { title: "Respuesta Rápida", description: "Contestamos en menos de 24 horas" },
    { title: "Equipo Dedicado", description: "Un experto asignado a tu proyecto" },
    { title: "Disponibilidad", description: "Lunes a Viernes, 9am - 7pm" },
  ];

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <motion.div
          animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-3xl"
        />
      </div>

      <div className="relative container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-inter font-medium text-primary">
              Estamos aquí para ayudarte
            </span>
          </motion.div>

          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-sora text-5xl md:text-7xl font-bold text-foreground"
            >
              Hablemos de tu
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative inline-block"
            >
              <span className="font-sora text-5xl md:text-7xl font-bold text-gradient-primary">
                Próximo Proyecto
              </span>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-inter text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            Cada gran proyecto comienza con una conversación. Cuéntanos tu visión y
            juntos la convertiremos en una experiencia digital extraordinaria.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="flex flex-col items-center sm:flex-row sm:items-start gap-2 px-5 py-3 rounded-full bg-muted/30 border border-border/50 text-center sm:text-left"
              >
                <div className="text-sm font-inter font-semibold text-foreground">{benefit.title}</div>
                <div className="text-xs text-muted-foreground hidden sm:block">•</div>
                <div className="text-xs text-muted-foreground">{benefit.description}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};