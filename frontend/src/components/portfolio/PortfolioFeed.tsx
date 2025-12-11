import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import type { PortfolioProject } from "../../sanity/types/portfolio";

export const PortfolioFeed = ({ projects }: { projects: PortfolioProject[] }) => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [showFilters, setShowFilters] = useState(false);

  // Extraemos las categorías únicas de los proyectos para crear el menú
  const allCategories = projects.flatMap(p => p.categories.map(c => c.title));
  const uniqueCategories = ["Todos", ...new Set(allCategories)];

  // Filtramos los proyectos
  const filteredProjects = activeCategory === "Todos"
    ? projects
    : projects.filter(p => p.categories.some(c => c.title === activeCategory));

  return (
    <>
      {/* Filter Section */}
      <section className="relative py-8 border-y border-border/30">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between gap-4">
            
            {/* Desktop filters */}
            <div className="hidden md:flex flex-wrap items-center gap-3">
              {uniqueCategories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-5 py-2.5 rounded-full font-inter text-sm transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-gradient-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-muted/30 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Mobile filter button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 border border-border/50 text-foreground"
            >
              <Filter className="w-4 h-4" />
              <span className="font-inter text-sm">Filtrar</span>
            </motion.button>

            {/* Project count */}
            <div className="font-inter text-sm text-muted-foreground">
              <span className="text-primary font-semibold">{filteredProjects.length}</span> proyectos
            </div>
          </div>

          {/* Mobile filters dropdown */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden mt-4"
              >
                <div className="flex flex-wrap gap-2 py-4">
                  {uniqueCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveCategory(category);
                        setShowFilters(false);
                      }}
                      className={`px-4 py-2 rounded-full font-inter text-sm transition-all ${
                        activeCategory === category
                          ? "bg-gradient-primary text-primary-foreground"
                          : "bg-muted/30 text-muted-foreground"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative py-20">
         {/* Background decoration */}
         <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-1 h-32 bg-gradient-to-b from-primary/50 to-transparent" />
          <div className="absolute bottom-1/4 right-0 w-1 h-32 bg-gradient-to-t from-secondary/50 to-transparent" />
        </div>

        <div className="container mx-auto px-6">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                <X className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-sora text-xl font-semibold text-foreground mb-2">
                No hay proyectos
              </h3>
              <p className="font-inter text-muted-foreground">
                No encontramos proyectos en esta categoría.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};