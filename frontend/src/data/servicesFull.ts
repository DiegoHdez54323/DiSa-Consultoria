import { Bot, AppWindow, ShoppingCart, BarChart3, Building2, Network } from "lucide-react";

export interface ServicePackage {
  name: string;
  price: string;
  features: string[];
  tag: "Esencial" | "Crecimiento" | "Pro";
}

export interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any; 
  color: string; // Color base para texto/icono
  gradient: string; // Gradiente para fondos/bordes
  packages: ServicePackage[];
}

export const servicesData: ServiceCategory[] = [
  {
    id: "automation",
    title: "Automatizaciones",
    subtitle: "Eficiencia & Ahorro",
    description: "Elimina tareas manuales y conecta tus apps existentes.",
    icon: Bot,
    color: "text-blue-500",
    gradient: "from-blue-500 to-cyan-400",
    packages: [
      {
        name: "Automatización Puntual",
        price: "$8,000 – $20,000",
        tag: "Esencial",
        features: ["1 Flujo automatizado", "Conexión de 1 fuente de datos", "Hasta 2 salidas/acciones"]
      },
      {
        name: "Proceso Automatizado",
        price: "$20,000 – $60,000",
        tag: "Crecimiento",
        features: ["2 a 4 Flujos interconectados", "Sistema de alertas y notificaciones", "Manejo de errores avanzado"]
      },
      {
        name: "Automatización Integral",
        price: "$60,000 – $150,000+",
        tag: "Pro",
        features: ["5+ Flujos complejos", "Panel de control y métricas", "Auditoría de ejecución"]
      }
    ]
  },
  {
    id: "web-apps",
    title: "Aplicaciones Web",
    subtitle: "Sistemas a Medida",
    description: "Plataformas operativas para gestionar tu negocio.",
    icon: AppWindow,
    color: "text-violet-500",
    gradient: "from-violet-500 to-purple-400",
    packages: [
      {
        name: "MVP Web",
        price: "$25,000 – $45,000",
        tag: "Esencial",
        features: ["1 Módulo principal", "4 a 6 Pantallas clave", "1 Rol de usuario (Admin)"]
      },
      {
        name: "Sistema Operativo",
        price: "$45,000 – $95,000",
        tag: "Crecimiento",
        features: ["2 a 4 Módulos operativos", "Generación de Reportes PDF/Excel", "Múltiples roles y permisos"]
      },
      {
        name: "Plataforma Web",
        price: "$95,000 – $220,000+",
        tag: "Pro",
        features: ["Permisos granulares (RBAC)", "Integraciones con terceros", "QA y Testing exhaustivo"]
      }
    ]
  },
  {
    id: "ecommerce",
    title: "E-commerce & B2B",
    subtitle: "Venta Digital",
    description: "Vende 24/7 con catálogos y tiendas optimizadas.",
    icon: ShoppingCart,
    color: "text-pink-500",
    gradient: "from-pink-500 to-rose-400",
    packages: [
      {
        name: "Catálogo Vendedor",
        price: "$15,000 – $35,000",
        tag: "Esencial",
        features: ["Catálogo digital administrable", "Filtros de búsqueda", "Botón directo a WhatsApp"]
      },
      {
        name: "Tienda Estándar",
        price: "$35,000 – $85,000",
        tag: "Crecimiento",
        features: ["Carrito de compras completo", "Pasarela de pagos (Stripe/MP)", "Gestión de pedidos"]
      },
      {
        name: "E-commerce Pro",
        price: "$85,000 – $250,000+",
        tag: "Pro",
        features: ["Integración con ERP/Facturación", "Reglas de envío avanzadas", "Tableros de ventas (KPIs)"]
      }
    ]
  },
  {
    id: "dashboards",
    title: "Dashboards & BI",
    subtitle: "Inteligencia de Datos",
    description: "Visualiza tus números en tiempo real.",
    icon: BarChart3,
    color: "text-amber-500",
    gradient: "from-amber-500 to-orange-400",
    packages: [
      {
        name: "Dashboard Básico",
        price: "$12,000 – $30,000",
        tag: "Esencial",
        features: ["1 Fuente de datos (Excel/Sheets)", "1 Tablero ejecutivo", "6 a 12 Indicadores (KPIs)"]
      },
      {
        name: "Analítica de Negocio",
        price: "$30,000 – $80,000",
        tag: "Crecimiento",
        features: ["2 a 3 Fuentes de datos (SQL/API)", "Sistema de alertas automáticas", "Filtros dinámicos por fecha/zona"]
      },
      {
        name: "BI Pro Enterprise",
        price: "$80,000 – $180,000+",
        tag: "Pro",
        features: ["Procesos ETL y modelado", "Calidad y limpieza de datos", "Permisos por nivel de usuario"]
      }
    ]
  },
  {
    id: "enterprise",
    title: "Sistemas Enterprise",
    subtitle: "Gestión Total",
    description: "ERP y CRM robustos para operaciones críticas.",
    icon: Building2,
    color: "text-emerald-500",
    gradient: "from-emerald-500 to-green-400",
    packages: [
      {
        name: "MVP Empresarial",
        price: "$120,000 – $250,000",
        tag: "Esencial",
        features: ["2 a 3 Módulos críticos", "Arquitectura escalable", "Panel administrativo base"]
      },
      {
        name: "Expansión Operativa",
        price: "$250,000 – $600,000",
        tag: "Crecimiento",
        features: ["Suite de módulos completa", "Integraciones con legado", "Migración de datos"]
      },
      {
        name: "Plataforma Empresarial",
        price: "$600,000 – $1.5M+",
        tag: "Pro",
        features: ["Workflows complejos (BPM)", "Seguridad avanzada (Hardening)", "Business Intelligence integrado"]
      }
    ]
  },
  {
    id: "integrations",
    title: "Integraciones & API",
    subtitle: "Conectividad",
    description: "Hacemos que tus sistemas hablen entre sí.",
    icon: Network,
    color: "text-cyan-500",
    gradient: "from-cyan-500 to-sky-400",
    packages: [
      {
        name: "Integración Puntual",
        price: "$12,000 – $30,000",
        tag: "Esencial",
        features: ["Conexión A ↔ B", "1 Flujo de datos unidireccional", "Logs básicos"]
      },
      {
        name: "Integración Operativa",
        price: "$30,000 – $90,000",
        tag: "Crecimiento",
        features: ["2 a 3 Integraciones", "Sincronización bidireccional", "Alertas de fallo en tiempo real"]
      },
      {
        name: "Plataforma de Integración",
        price: "$90,000 – $250,000+",
        tag: "Pro",
        features: ["Middleware / API Gateway", "Monitoreo de salud (Health check)", "Documentación técnica (Swagger)"]
      }
    ]
  }
];