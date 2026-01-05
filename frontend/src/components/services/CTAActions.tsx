import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, HelpCircle } from "lucide-react";

export const CTAActions = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      
      {/* Boton de llamada */}
      <a
        href="/contacto?tipo=llamada"
        className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-gradient-primary text-primary-foreground hover:scale-105 transition-all duration-300 hover:glow-primary shadow-lg shadow-primary/20"
      >
        <Calendar className="w-5 h-5" />
        Agendar llamada GRATIS
      </a>
      
      {/* Proceso pequeño */}
      <div className="relative">
        <button 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/20"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={() => setShowTooltip(!showTooltip)}
          aria-label="Información sobre el proceso"
        >
          <HelpCircle className="w-5 h-5" />
          <span>¿Cómo funciona el proceso?</span>
        </button>

        { /* Informacion de proceso pequeño */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-80 p-5 bg-card border border-primary/20 rounded-2xl shadow-2xl shadow-primary/10 text-left z-50 backdrop-blur-md"
            >
              <h4 className="text-foreground font-bold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Método DiSa
              </h4>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>Primera llamada de filtro (Gratis).</li>
                <li>
                  <strong className="text-primary">Diagnóstico pagado</strong> 
                  (se descuenta al 100% del proyecto final).
                </li>
                <li>Propuesta final con alcance exacto.</li>
              </ol>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};