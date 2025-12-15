import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useContactForm } from "../../hooks/useContactForm"; // Asegúrate de que la ruta sea correcta

export const ContactForm = () => {
  // Usamos nuestro Custom Hook para toda la lógica
  const { formData, handleChange, submitForm, status, errors, errorMessage } = useContactForm();
  
  // Estado local solo para animaciones de UI (focus)
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-3xl blur-2xl opacity-50" />
        
        <form
          onSubmit={submitForm}
          className="relative p-8 md:p-10 rounded-2xl bg-gradient-card border border-border/50 backdrop-blur-sm"
        >
          <div className="absolute inset-0 rounded-2xl animated-border opacity-30" />
          
          {/* --- HONEYPOT: Trampa para bots (Invisible) --- */}
          <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
            <label htmlFor="_gotcha">No llenes este campo si eres humano</label>
            <input
              type="text"
              id="_gotcha"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              value={formData._gotcha}
              onChange={(e) => handleChange("_gotcha", e.target.value)}
            />
          </div>
          {/* ----------------------------------------------- */}

          <div className="relative mb-8">
            <h3 className="font-sora text-2xl font-bold text-foreground mb-2">
              Envíanos un mensaje
            </h3>
            <p className="text-sm text-muted-foreground">
              Completa el formulario y te responderemos pronto.
            </p>
          </div>
          
          {/* Mensaje de Éxito */}
          {status === "success" && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3 text-green-500"
            >
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">¡Mensaje enviado! Nos pondremos en contacto pronto.</span>
            </motion.div>
          )}

          {/* Mensaje de Error General */}
          {status === "error" && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-500"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{errorMessage || "Hubo un error al enviar el mensaje."}</span>
            </motion.div>
          )}

          <div className="relative space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Nombre */}
              <div className="relative">
                <InputLabel focused={focusedField === "name"} label="Nombre *" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 rounded-xl bg-muted/30 border text-foreground font-inter focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${errors.name ? 'border-red-500/50' : 'border-border/50'}`}
                  placeholder="Tu nombre"
                />
                {errors.name && <span className="text-xs text-red-500 mt-1 ml-1">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className="relative">
                <InputLabel focused={focusedField === "email"} label="Email *" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 rounded-xl bg-muted/30 border text-foreground font-inter focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${errors.email ? 'border-red-500/50' : 'border-border/50'}`}
                  placeholder="tu@email.com"
                />
                {errors.email && <span className="text-xs text-red-500 mt-1 ml-1">{errors.email}</span>}
              </div>
            </div>
            
            {/* Empresa */}
            <div className="relative">
              <InputLabel focused={focusedField === "company"} label="Empresa (opcional)" />
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleChange("company", e.target.value)}
                onFocus={() => setFocusedField("company")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/50 text-foreground font-inter focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                placeholder="Nombre de tu empresa"
              />
            </div>
            
            {/* Mensaje */}
            <div className="relative">
              <InputLabel focused={focusedField === "message"} label="Mensaje *" />
              <textarea
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                rows={5}
                className={`w-full px-4 py-3 rounded-xl bg-muted/30 border text-foreground font-inter focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none ${errors.message ? 'border-red-500/50' : 'border-border/50'}`}
                placeholder="Cuéntanos sobre tu proyecto..."
              />
              {errors.message && <span className="text-xs text-red-500 mt-1 ml-1">{errors.message}</span>}
            </div>
            
            <motion.button
              type="submit"
              disabled={status === "submitting" || status === "success"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full py-4 rounded-xl bg-gradient-primary text-primary-foreground font-inter font-semibold overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <span className="relative flex items-center justify-center gap-2">
                {status === "submitting" ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar mensaje
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Send className="w-4 h-4" />
                    </motion.div>
                  </>
                )}
              </span>
            </motion.button>
            
            <p className="text-xs text-muted-foreground text-center">
              Responderemos a tu mensaje en menos de 24 horas hábiles.
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

const InputLabel = ({ focused, label }: { focused: boolean; label: string }) => (
  <motion.label
    animate={{ color: focused ? "hsl(var(--primary))" : "hsl(var(--foreground))" }}
    className="block text-sm font-inter font-medium mb-2"
  >
    {label}
  </motion.label>
);