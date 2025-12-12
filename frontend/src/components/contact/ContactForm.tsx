import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Linkedin, Twitter, Github } from "lucide-react";

type FormErrors = {
  name?: string[];
  email?: string[];
  message?: string[];
};

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
];

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    _gotcha: "",
  });
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error("Error en validación");
      }

      setStatus("success");
      setFormData({ name: "", email: "", company: "", message: "", _gotcha: "" });
      
      // Resetear estado a los 5 segundos
      setTimeout(() => setStatus("idle"), 5000);

    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div>
              <h2 className="font-sora text-3xl font-bold mb-4">
                ¿Listo para empezar?
              </h2>
              <p className="text-muted-foreground">
                Cuéntanos sobre tu proyecto. Respondemos rápido.
              </p>
            </div>
            
            <div className="flex gap-4">
               {socialLinks.map((s, i) => (
                 <a key={i} href={s.href} className="p-3 bg-muted/50 rounded-xl hover:bg-primary hover:text-white transition-colors">
                   <s.icon className="w-5 h-5" />
                 </a>
               ))}
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative p-8 rounded-2xl bg-card border border-border/50 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* HONEYPOT */}
                <input
                  type="text"
                  name="_gotcha"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  value={formData._gotcha}
                  onChange={(e) => setFormData({...formData, _gotcha: e.target.value})}
                  autoComplete="off"
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Nombre"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={`w-full p-3 rounded-lg bg-background border ${errors.name ? "border-red-500" : "border-border"}`}
                    />
                    {errors.name && <span className="text-xs text-red-500">{errors.name[0]}</span>}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full p-3 rounded-lg bg-background border ${errors.email ? "border-red-500" : "border-border"}`}
                    />
                    {errors.email && <span className="text-xs text-red-500">{errors.email[0]}</span>}
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Empresa (Opcional)"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full p-3 rounded-lg bg-background border border-border"
                />

                <div>
                  <textarea
                    rows={4}
                    placeholder="¿Cómo podemos ayudarte?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className={`w-full p-3 rounded-lg bg-background border ${errors.message ? "border-red-500" : "border-border"}`}
                  />
                  {errors.message && <span className="text-xs text-red-500">{errors.message[0]}</span>}
                </div>

                <button
                  type="submit"
                  disabled={status !== "idle"}
                  className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity flex justify-center items-center gap-2"
                >
                  {status === "submitting" ? "Enviando..." : status === "success" ? "¡Enviado!" : "Enviar Mensaje"}
                  {status === "idle" && <Send className="w-4 h-4" />}
                </button>

                {status === "success" && (
                  <p className="text-green-500 text-center text-sm">¡Mensaje recibido! Te contactaremos pronto.</p>
                )}
                {status === "error" && (
                  <p className="text-red-500 text-center text-sm">Hubo un error. Intenta de nuevo.</p>
                )}
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};