import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Carousel3DProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const Carousel3D = ({ 
  children, 
  autoPlay = false, 
  autoPlayInterval = 5000 
}: Carousel3DProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const totalItems = children.length;

  const getIndex = (index: number) => {
    return ((index % totalItems) + totalItems) % totalItems;
  };

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => getIndex(prev + 1));
  }, [totalItems]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => getIndex(prev - 1));
  }, [totalItems]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto play
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(next, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, next]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      next();
    }
    if (touchStart - touchEnd < -75) {
      prev();
    }
  };

  // Get visible items (prev, current, next)
  const getVisibleItems = () => {
    const prevIndex = getIndex(currentIndex - 1);
    const nextIndex = getIndex(currentIndex + 1);
    return [
      { index: prevIndex, position: 'left' },
      { index: currentIndex, position: 'center' },
      { index: nextIndex, position: 'right' },
    ];
  };

  const visibleItems = getVisibleItems();

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div 
        className="relative h-[500px] md:h-[580px] overflow-visible"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {visibleItems.map(({ index, position }) => (
              <motion.div
                key={`slide-${index}`}
                initial={{ 
                  opacity: 0, 
                  scale: 0.5,
                  x: direction > 0 ? '100%' : '-100%',
                }}
                animate={{
                  x: position === 'left' 
                    ? '-58%' 
                    : position === 'right' 
                      ? '58%' 
                      : '0%',
                  scale: position === 'center' ? 1.15 : 0.7,
                  zIndex: position === 'center' ? 30 : 10,
                  opacity: position === 'center' ? 1 : 0.5,
                  filter: position === 'center' ? 'blur(0px)' : 'blur(3px)',
                  rotateY: position === 'left' ? 8 : position === 'right' ? -8 : 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  x: direction > 0 ? '-100%' : '100%',
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 26,
                  mass: 1,
                }}
                style={{ perspective: 1000 }}
                className="absolute w-[80%] md:w-[42%] lg:w-[38%] cursor-pointer"
                onClick={() => {
                  if (position === 'left') prev();
                  if (position === 'right') next();
                }}
              >
                <motion.div 
                  className={`
                    transition-all duration-500
                    ${position === 'center' 
                      ? 'shadow-[0_25px_60px_-15px_rgba(0,200,255,0.3)]' 
                      : 'pointer-events-none md:pointer-events-auto'
                    }
                  `}
                  whileHover={position === 'center' ? { scale: 1.02 } : {}}
                >
                  {children[index]}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-card/80 border border-border/50 backdrop-blur-sm hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 group"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-card/80 border border-border/50 backdrop-blur-sm hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 group"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
      </button>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
              relative h-2 rounded-full transition-all duration-300 overflow-hidden
              ${index === currentIndex 
                ? 'w-8 bg-primary' 
                : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }
            `}
            aria-label={`Ir al proyecto ${index + 1}`}
          >
            {index === currentIndex && (
              <motion.div
                layoutId="activeDot"
                className="absolute inset-0 bg-gradient-to-r from-primary to-accent"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
