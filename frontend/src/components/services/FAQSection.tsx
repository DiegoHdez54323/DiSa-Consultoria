import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "¿Por qué cobran por el Diagnóstico inicial?",
    answer: "Porque no te damos solo una 'cotización', te entregamos valor real: un Prototipo Visual Navegable (Demo) y un Análisis Técnico de tu problema. Esto requiere horas de ingeniería experta. Si decides desarrollar con nosotros, el 100% de este costo se descuenta de tu proyecto final."
  },
  {
    question: "¿Cuánto tiempo tarda un desarrollo promedio?",
    answer: "Depende del alcance (Nivel). Un MVP o Automatización (Nivel 1) suele estar listo en 3-5 semanas. Sistemas completos o Plataformas Enterprise (Nivel 2 y 3) pueden tomar de 3 a 6 meses. Definimos tiempos exactos en el Diagnóstico."
  },
  {
    question: "¿Qué pasa si quiero cambios a mitad del proyecto?",
    answer: "Trabajamos con metodologías ágiles. Los cambios menores suelen absorberse. Si requieres funcionalidades nuevas fuera del alcance original, las cotizamos como adicionales transparentes o las agendamos para una 'Fase 2'."
  },
  {
    question: "¿Entregan factura fiscal?",
    answer: "Sí, somos una empresa constituida en México. Todos nuestros precios son más IVA y emitimos facturas fiscales válidas para deducción."
  },
  {
    question: "¿El software será de mi propiedad?",
    answer: "Absolutamente. Al finalizar el proyecto y cubrir el pago total, te transferimos la propiedad intelectual, el código fuente y los accesos a servidores. No te amarramos con rentas forzosas."
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-background border-t border-border/50 overflow-hidden">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-3xl font-bold mb-4">Preguntas Frecuentes</h2>
          <p className="text-muted-foreground">Resolvemos tus dudas antes de iniciar.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border rounded-2xl transition-all duration-300 ${openIndex === index ? 'border-primary/50 bg-background shadow-lg shadow-primary/5' : 'border-border/50 bg-card hover:border-border'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`font-semibold text-lg ${openIndex === index ? 'text-primary' : 'text-foreground'}`}>
                  {faq.question}
                </span>
                <span className={`p-2 rounded-full transition-colors ${openIndex === index ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};