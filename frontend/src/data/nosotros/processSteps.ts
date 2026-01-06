import { Phone, Target, FileText, Layers, CheckCircle2 } from "lucide-react";

export const processSteps = [
  {
    step: 1,
    title: "Llamada inicial",
    duration: "15-25 min • Gratis",
    objective: "Conocer tu necesidad y dar un rango estimado.",
    deliverable: "Orientación inicial sin compromiso.",
    icon: Phone,
    highlight: false,
  },
  {
    step: 2,
    title: "Diagnóstico DiSa",
    duration: "Fase 0 • Pagado",
    objective: "Definir alcance, riesgos y opciones con claridad total.",
    deliverable: "Documento de Alcance + Demo Conceptual + 3 opciones.",
    icon: Target,
    highlight: true,
  },
  {
    step: 3,
    title: "Aprobación y firma",
    duration: "Acuerdo formal",
    objective: "Formalizar el proyecto con alcance y términos claros.",
    deliverable: "SOW final + contrato + anticipo.",
    icon: FileText,
    highlight: false,
  },
  {
    step: 4,
    title: "Desarrollo por hitos",
    duration: "Según roadmap",
    objective: "Construir el sistema en fases con entregas verificables.",
    deliverable: "Entregables por fase + change requests si aplica.",
    icon: Layers,
    highlight: false,
  },
  {
    step: 5,
    title: "Entrega y continuidad",
    duration: "Cierre + soporte",
    objective: "Poner en producción y asegurar estabilidad.",
    deliverable: "Garantía de bugs + plan de continuidad mensual.",
    icon: CheckCircle2,
    highlight: false,
  },
];
