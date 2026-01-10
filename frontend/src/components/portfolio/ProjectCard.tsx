import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import type { PortfolioProject } from "../../sanity/types/portfolio";
import { urlForImage } from "../../sanity/lib/url-for-image";

export const ProjectCard = ({ project, index }: { project: PortfolioProject; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), { stiffness: 300, damping: 30 });
  const scale = useSpring(isHovered ? 1.02 : 1, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const imageUrl = project.image?.source 
    ? urlForImage(project.image.source).width(800).height(600).url() 
    : "https://via.placeholder.com/800x600";

  const mainCategory = project.categories?.[0]?.title || "Sin categoría";
  const gradientClass = project.gradient || "from-primary to-secondary";
  
  // URL interna para el detalle del proyecto
  const detailUrl = project.slug ? `/portafolio/${project.slug}` : "#";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
      className="group relative perspective-1000 h-full"
    >
      <a href={detailUrl} className="block h-full"> {/* Envolvemos todo en un enlace interno */}
        
        {/* Glow effect */}
        <motion.div
          animate={{ opacity: isHovered ? 0.6 : 0 }}
          className={`absolute -inset-2 bg-gradient-to-r ${gradientClass} rounded-3xl blur-2xl transition-opacity duration-500`}
        />
        
        {/* Card */}
        <div className="relative h-full bg-card/90 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden flex flex-col">
          {/* Image section */}
          <div className="relative h-52 overflow-hidden shrink-0">
            <motion.img
              src={imageUrl}
              alt={project.image?.alt || project.title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.6 }}
            />
            
            <div className={`absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent`} />
            <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-md border border-border/50 text-xs font-inter font-medium text-foreground"
            >
              {project.year}
            </motion.div>
            
            <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md text-xs font-inter font-medium text-primary">
              {mainCategory}
            </div>

            {/* Link Externo (Opcional, si queremos mantener el acceso directo al sitio web) */}
            {project.link && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
                className="absolute top-4 right-4 z-20" 
              >
                <div
                  onClick={(e) => {
                     e.stopPropagation(); // Evita navegar al detalle si se clickea el botón externo
                     window.open(project.link, '_blank');
                  }}
                  className="p-2.5 rounded-full bg-background/80 backdrop-blur-md border border-border/50 hover:bg-primary hover:border-primary transition-colors cursor-pointer flex items-center justify-center"
                  title="Visitar sitio web"
                >
                  <ExternalLink className="w-4 h-4 text-foreground hover:text-white" />
                </div>
              </motion.div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow" style={{ transform: "translateZ(30px)" }}>
            <h3 className="font-sora text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
              {project.title}
              <motion.span
                animate={{ x: isHovered ? 4 : 0, opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight className="w-5 h-5 text-primary" />
              </motion.span>
            </h3>
            
            <p className="font-inter text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.technologies?.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="px-2.5 py-1 rounded-md bg-muted/50 border border-border/30 text-xs font-inter text-muted-foreground transition-colors"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
          
          <motion.div
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientClass}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ originX: 0 }}
          />
        </div>
      </a>
    </motion.div>
  );
};