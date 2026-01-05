// frontend/src/components/contact/ContactForm.tsx
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { useState } from "react";
import { useContactForm } from "../../hooks/useContactForm"; 

export const ContactForm = () => {
  const { formData, handleChange, submitForm, status, errors, errorMessage } =
    useContactForm();

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
          <div className="absolute inset-0 rounded-2xl animated-border opacity-30 mb-5" />

          {/* --- HONEYPOT --- */}
          <div
            style={{ position: "absolute", left: "-9999px" }}
            aria-hidden="true"
          >
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

          <div className="relative mb-6">
            <h3 className="font-sora text-2xl font-bold text-foreground mb-2">
              Inicia tu Transformación
            </h3>
            
            {/* Mensaje de Expectativas */}
            <div className="mt-4 mb-2 bg-primary/5 border border-primary/20 p-4 rounded-xl">
                <h4 className="text-primary font-semibold text-sm mb-1 flex items-center gap-2">
                    <Info className="w-4 h-4"/> ¿Qué pasa al enviar?
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    Agendaremos una <strong>Llamada Inicial de 15 min</strong> para validar tu idea y darte un rango de presupuesto estimado. Sin compromisos.
                </p>
            </div>
          </div>

          {/* Mensaje de Éxito */}
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3 text-green-500"
            >
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">
                ¡Recibido! Te contactaremos pronto para agendar.
              </span>
            </motion.div>
          )}

          {/* Mensaje de Error */}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-500"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">
                {errorMessage || "Hubo un error al enviar el mensaje."}
              </span>
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
                  className={`w-full px-4 py-3 rounded-xl bg-muted/30 border text-foreground font-inter focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${errors.name ? "border-red-500/50" : "border-border/50"}`}
                  placeholder="Tu nombre"
                />
                {errors.name && <span className="text-xs text-red-500 mt-1 ml-1">{errors.name}</span>}
              </div>

              {/* Teléfono - NUEVO */}
              <div className="relative">
                <InputLabel focused={focusedField === "phone"} label="WhatsApp / Teléfono *" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 rounded-xl bg-muted/30 border text-foreground font-inter focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${errors.phone ? "border-red-500/50" : "border-border/50"}`}
                  placeholder="55 1234 5678"
                />
                {errors.phone && <span className="text-xs text-red-500 mt-1 ml-1">{errors.phone}</span>}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
                {/* Email */}
                <div className="relative">
                    <InputLabel focused={focusedField === "email"} label="Email *" />
                    <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 rounded-xl bg-muted/30 border text-foreground font-inter focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${errors.email ? "border-red-500/50" : "border-border/50"}`}
                    placeholder="tu@email.com"
                    />
                    {errors.email && <span className="text-xs text-red-500 mt-1 ml-1">{errors.email}</span>}
                </div>

                {/* Empresa */}
                <div className="relative">
                    <InputLabel focused={focusedField === "company"} label="Empresa" />
                    <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    onFocus={() => setFocusedField("company")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/50 text-foreground font-inter focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    placeholder="Nombre de tu negocio"
                    />
                </div>
            </div>

            {/* Mensaje */}
            <div className="relative">
              <InputLabel focused={focusedField === "message"} label="¿Qué quieres resolver? *" />
              <textarea
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                rows={4}
                className={`w-full px-4 py-3 rounded-xl bg-muted/30 border text-foreground font-inter focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none ${errors.message ? "border-red-500/50" : "border-border/50"}`}
                placeholder="Ej: Necesito un sistema para controlar mi inventario y ventas..."
              />
              {errors.message && <span className="text-xs text-red-500 mt-1 ml-1">{errors.message}</span>}
            </div>

            <motion.button
              type="submit"
              disabled={status === "submitting" || status === "success"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full py-4 rounded-xl bg-gradient-primary text-primary-foreground font-inter font-semibold overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
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
                    Procesando...
                  </>
                ) : (
                  <>
                    Solicitar Diagnóstico Gratis
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