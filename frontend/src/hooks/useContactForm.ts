import { useState } from "react";
import { z } from "zod";


const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Por favor ingresa un email válido"),
  company: z.string().optional(),
  message: z.string().min(10, "El mensaje es muy corto, cuéntanos más"),
  _gotcha: z.string().optional(), 
});

export const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    _gotcha: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    setErrorMessage("");

    const validation = formSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(fieldErrors);
      setStatus("idle");
      return;
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      setStatus("success");
      setFormData({ name: "", email: "", company: "", message: "", _gotcha: "" });
      
      setTimeout(() => setStatus("idle"), 5000);

    } catch (error) {
      console.error("Error al enviar:", error);
      setStatus("error");
      setErrorMessage("Hubo un problema al enviar tu mensaje. Por favor intenta de nuevo.");
    }
  };

  return {
    formData,
    handleChange,
    submitForm,
    status,
    errors,
    errorMessage
  };
};