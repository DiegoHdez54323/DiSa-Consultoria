import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

import DisaFullLogo from "@/assets/DisaFullLogo.svg?react";
import { TechCircle } from "./TechCircle";

const HeroParallax = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const logoY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const circleRightY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const circleRightX = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const circleRightOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0]);
  const circleRightScale = useTransform(scrollYProgress, [0, 0.5], [1.2, 0.7]);

  const circleMobileY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const circleMobileOpacity = useTransform(scrollYProgress, [0, 0.4], [0.4, 0]);

  const PARTICLE_COUNT = 120;

  const clamp = (v: number, min: number, max: number) =>
    Math.min(max, Math.max(min, v));

  // random particle positions
  const centeredRand = () => (Math.random() + Math.random()) / 2;

  const particles = useMemo(() => {
    const centerX = 50;
    const centerY = 50;

    const spreadX = 120; // <-- más alto = más ancho (70–90 recomendado)
    const spreadY = 60; // <-- más alto = más “alto” (18–35 recomendado)

    return Array.from({ length: PARTICLE_COUNT }, () => {
      const x = centerX + (centeredRand() - 0.5) * spreadX;
      const y = centerY + (centeredRand() - 0.5) * spreadY;

      return {
        left: `${clamp(x, 6, 94)}%`,
        top: `${clamp(y, 20, 80)}%`, // evita que suban demasiado o bajen al “scroll hint”
        size: 1 + Math.random() * 2.2,
        float: 12 + Math.random() * 18,
        duration: 2.8 + Math.random() * 3.8,
        delay: Math.random() * 1.2,
        opacityBase: 0.18 + Math.random() * 0.25,
      };
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-30" />

      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
        animate={{
          x: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -60]) }}
        animate={{
          x: [0, -40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        style={{
          y: circleRightY,
          x: circleRightX,
          opacity: circleRightOpacity,
          scale: circleRightScale,
        }}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.6, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 md:w-96 lg:w-[500px] h-72 md:h-96 lg:h-[500px] pointer-events-none hidden md:block"
      >
        <TechCircle reverse speed="slow" />
      </motion.div>

      <motion.div
        style={{
          y: circleMobileY,
          opacity: circleMobileOpacity,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none md:hidden"
      >
        <TechCircle speed="normal" />
      </motion.div>

      <motion.div
        style={{ y: logoY, scale: logoScale, opacity: logoOpacity }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.div
          className="h-24 md:h-32 lg:h-40 xl:h-48 w-auto"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <DisaFullLogo className="h-full w-auto" aria-label="DiSa Software" />
        </motion.div>
      </motion.div>

      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/60"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -p.float, 0],
            opacity: [p.opacityBase, 0.8, p.opacityBase],
            scale: [1, 1.6, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
      >
        <span className="text-muted-foreground text-sm">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroParallax;
