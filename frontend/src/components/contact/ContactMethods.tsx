import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare, ArrowRight } from "lucide-react";
import { type MouseEvent } from "react";
import { company } from "../../config/company";

// Definimos los métodos de contacto dinámicamente
const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: company.contact.email,
    href: `mailto:${company.contact.email}`,
    gradient: "from-primary to-accent",
  },
  {
    icon: Phone,
    title: "Teléfono Principal",
    value: company.contact.phone1,
    href: `tel:${company.contact.phone1.replace(/\s/g, '')}`,
    gradient: "from-accent to-secondary",
  },
  {
    icon: Phone,
    title: "Teléfono Secundario",
    value: company.contact.phone2,
    href: `tel:${company.contact.phone2.replace(/\s/g, '')}`,
    gradient: "from-secondary to-accent", // Gradiente invertido para variedad
  },
  {
    icon: MapPin,
    title: "Ubicación",
    value: company.contact.address,
    gradient: "from-secondary to-primary",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    value: "Enviar Mensaje",
    href: company.contact.whatsapp,
    gradient: "from-primary via-accent to-secondary",
  },
];

const ContactCard3D = ({ method, index }: { method: typeof contactMethods[0]; index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={method.href}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative block w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] min-w-[280px]" // Clases para ancho flexible
    >
      <div className={`absolute -inset-1 bg-gradient-to-r ${method.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
      
      <div className="relative p-6 rounded-2xl bg-gradient-card border border-border/50 group-hover:border-primary/30 transition-all duration-300 overflow-hidden h-full">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl translate-x-8 -translate-y-8" />
        </div>
        
        {/* Number Badge */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center">
          <span className="text-xs font-sora font-bold text-muted-foreground">0{index + 1}</span>
        </div>
        
        {/* Icon */}
        <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${method.gradient} p-[1px] mb-4`}>
          <div className="w-full h-full rounded-xl bg-background flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
            <method.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
          </div>
        </div>
        
        <h3 className="font-sora text-sm font-medium text-muted-foreground mb-1">
          {method.title}
        </h3>
        <p className="font-inter text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
          {method.value}
        </p>
        
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <ArrowRight className="w-5 h-5 text-primary" />
        </div>
      </div>
    </motion.a>
  );
};

export const ContactMethods = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        {/* Usamos Flexbox con wrap para que se acomoden centrados sin importar si son 4 o 5 elementos */}
        <div 
          className="flex flex-wrap justify-center gap-6" 
          style={{ perspective: "1000px" }}
        >
          {contactMethods.map((method, index) => (
            <ContactCard3D key={index} method={method} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};