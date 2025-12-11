import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface BlogHeroProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const BlogHero: React.FC<BlogHeroProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-inter font-medium mb-6">
            Blog
          </span>
          <h1 className="font-sora text-4xl md:text-6xl font-bold text-foreground mb-6">
            Ideas que <span className="text-gradient-primary">impulsan</span>
          </h1>
          <p className="font-inter text-xl text-muted-foreground mb-8">
            Artículos, guías y reflexiones sobre tecnología, desarrollo y el
            futuro digital.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-muted/50 border border-border/50 text-foreground font-inter placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogHero;
