import Navbar from "../Navbar";
import { Footer } from "../Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import DisaFullLogo from "@/assets/DisaFullLogo.svg";

import { TechCircle } from "./TechCircle";

import { ChevronDown, Phone, ArrowRight, Sparkles } from "lucide-react";

import {
  containerVariants,
  itemVariants,
} from "@/data/nosotros/animationVariants";
import { benefits } from "@/data/nosotros/benefits";
import { diagnosisFeatures } from "@/data/nosotros/diagnosisFeatures";
import { faqItems } from "@/data/nosotros/faqItems";
import { ourValues } from "@/data/nosotros/ourValues";
import { processSteps } from "@/data/nosotros/processSteps";
import { softwareCategories } from "@/data/nosotros/softwareCategories";
import { techStack, techStack2 } from "@/data/nosotros/techStack";

const Nosotros = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const logoY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const circleLeftY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const circleLeftX = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const circleLeftOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0]);
  const circleLeftScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  const circleRightY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const circleRightX = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const circleRightOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0]);
  const circleRightScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);

  // Mobile circle transforms
  const circleMobileY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const circleMobileOpacity = useTransform(scrollYProgress, [0, 0.4], [0.4, 0]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section - Parallax */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-grid opacity-30" />

        {/* Floating Orbs */}
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

        {/* Tech Circle - Left Side (Desktop) */}
        <motion.div
          style={{
            y: circleLeftY,
            x: circleLeftX,
            opacity: circleLeftOpacity,
            scale: circleLeftScale,
          }}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.6, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute left-[-5%] md:left-[5%] top-1/2 -translate-y-1/2 w-72 md:w-96 lg:w-[500px] h-72 md:h-96 lg:h-[500px] pointer-events-none hidden md:block"
        >
          <TechCircle speed="slow" />
        </motion.div>

        {/* Tech Circle - Right Side (Desktop) */}
        <motion.div
          style={{
            y: circleRightY,
            x: circleRightX,
            opacity: circleRightOpacity,
            scale: circleRightScale,
          }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.6, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute right-[-5%] md:right-[5%] top-1/2 -translate-y-1/2 w-72 md:w-96 lg:w-[450px] h-72 md:h-96 lg:h-[450px] pointer-events-none hidden md:block"
        >
          <TechCircle reverse speed="fast" />
        </motion.div>

        {/* Tech Circle - Mobile (behind logo) */}
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

        {/* Logo - Center with parallax */}
        <motion.div
          style={{ y: logoY, scale: logoScale, opacity: logoOpacity }}
          className="relative z-10 flex flex-col items-center"
        >
          <motion.img
            src={DisaFullLogo}
            alt="DiSa Software"
            className="h-24 md:h-32 lg:h-40 xl:h-48 w-auto"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </motion.div>

        {/* Floating particles/dots for visual interest */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/60"
            style={{
              left: `${15 + (i % 4) * 25}%`,
              top: `${20 + Math.floor(i / 4) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Subtle connecting lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <motion.line
            x1="20%"
            y1="30%"
            x2="80%"
            y2="70%"
            stroke="hsl(185 100% 50%)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, delay: 1 }}
          />
          <motion.line
            x1="80%"
            y1="30%"
            x2="20%"
            y2="70%"
            stroke="hsl(270 100% 65%)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, delay: 1.5 }}
          />
        </svg>

        {/* Corner accent elements */}
        <motion.div
          className="absolute top-24 left-8 md:left-16 w-16 h-16 border border-primary/20 rounded-lg"
          initial={{ opacity: 0, rotate: -45 }}
          animate={{ opacity: 0.5, rotate: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
        />
        <motion.div
          className="absolute top-32 right-8 md:right-20 w-8 h-8 bg-secondary/10 rounded-full"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -70]) }}
        />
        <motion.div
          className="absolute bottom-32 left-12 md:left-24 w-6 h-6 border-2 border-accent/30 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 1.2 }}
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -30]) }}
        />
        <motion.div
          className="absolute bottom-40 right-12 md:right-16 w-12 h-12 border border-dashed border-primary/20 rounded-lg rotate-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 1.4 }}
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -60]) }}
        />

        {/* Scroll indicator */}
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

      {/* Content Section with staggered reveal */}
      <section className="relative py-24 md:py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap justify-center gap-3 mb-8"
            >
              {[
                "Diagnóstico DiSa",
                "Prototipo conceptual",
                "Entrega por hitos",
              ].map((badge, index) => (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium flex items-center gap-2"
                >
                  <Sparkles className="w-3 h-3" />
                  {badge}
                </motion.span>
              ))}
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="font-sora text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Software a la medida con{" "}
              <span className="text-gradient-primary">claridad y método</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              En DiSa transformamos necesidades reales en sistemas que sí se
              entregan: con alcance definido, prototipo conceptual y ejecución
              por hitos.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold px-8"
              >
                <Link to="/contacto?tipo=llamada">
                  <Phone className="w-4 h-4 mr-2" />
                  Agendar llamada inicial
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary/30 hover:bg-primary/10"
              >
                <Link to="/servicios">
                  Ver servicios
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Qué hacemos Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
              Nuestras especialidades
            </span>
            <h2 className="font-sora text-3xl md:text-4xl font-bold mb-4">
              ¿Qué <span className="text-gradient-primary">hacemos</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Desarrollamos software a medida en estas categorías principales.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {softwareCategories.map((category, index) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-sora text-lg font-semibold mb-2 text-foreground">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {category.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-muted-foreground text-sm"
          >
            Los detalles de paquetes y precios están en{" "}
            <Link to="/servicios" className="text-primary hover:underline">
              Servicios →
            </Link>
          </motion.p>
        </div>
      </section>

      {/* Nuestra forma de trabajar - Timeline */}
      <section className="py-24 relative bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
              Proceso claro
            </span>
            <h2 className="font-sora text-3xl md:text-4xl font-bold mb-4">
              Nuestra forma de{" "}
              <span className="text-gradient-primary">trabajar</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un proceso estructurado que reduce incertidumbre y acelera
              resultados.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative flex items-start gap-6 mb-8 ${
                  step.highlight ? "scale-105" : ""
                }`}
              >
                {/* Timeline Line */}
                {index < processSteps.length - 1 && (
                  <div className="absolute left-6 top-14 w-0.5 h-full bg-border" />
                )}

                {/* Step Number */}
                <div
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.highlight
                      ? "bg-gradient-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground"
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div
                  className={`flex-1 p-6 rounded-2xl ${
                    step.highlight
                      ? "bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 glow-primary"
                      : "bg-card/50 border border-border/50"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-sora text-lg font-semibold">
                      {step.title}
                    </h3>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        step.highlight
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">
                    <strong className="text-foreground">Objetivo:</strong>{" "}
                    {step.objective}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    <strong className="text-foreground">Entregable:</strong>{" "}
                    {step.deliverable}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Diagnóstico DiSa - Featured Block */}
      <section className="py-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-primary font-medium text-sm tracking-wider uppercase mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
              <Sparkles className="w-4 h-4" />
              Fase 0
            </span>
            <h2 className="font-sora text-3xl md:text-4xl font-bold mb-4">
              Diagnóstico <span className="text-gradient-primary">DiSa</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              La base de un proyecto exitoso: claridad total antes de construir.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Features List */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {diagnosisFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="flex gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Honesty Note */}
              <motion.div
                variants={itemVariants}
                className="p-4 rounded-xl bg-secondary/10 border border-secondary/30"
              >
                <p className="text-sm text-muted-foreground">
                  <strong className="text-secondary">
                    Nota de honestidad:
                  </strong>{" "}
                  El prototipo es conceptual, para validar experiencia y
                  alcance. No es el sistema final ni incluye backend real.
                </p>
              </motion.div>
            </motion.div>

            {/* Mock Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl border border-border/50 bg-card/50 overflow-hidden p-4">
                {/* Browser Header */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="h-6 rounded-full bg-muted/50 max-w-xs" />
                  </div>
                </div>

                {/* Mock Screens Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Dashboard Mock */}
                  <div className="aspect-video rounded-lg bg-muted/30 p-3 border border-border/30">
                    <div className="h-2 w-16 bg-primary/30 rounded mb-2" />
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-8 bg-primary/10 rounded" />
                      <div className="h-8 bg-secondary/10 rounded" />
                    </div>
                    <div className="h-12 bg-muted/50 rounded mt-2" />
                  </div>

                  {/* List Mock */}
                  <div className="aspect-video rounded-lg bg-muted/30 p-3 border border-border/30">
                    <div className="h-2 w-12 bg-primary/30 rounded mb-2" />
                    <div className="space-y-1.5">
                      <div className="h-3 bg-muted/50 rounded" />
                      <div className="h-3 bg-muted/50 rounded w-3/4" />
                      <div className="h-3 bg-muted/50 rounded w-1/2" />
                    </div>
                  </div>

                  {/* Detail Mock */}
                  <div className="aspect-video rounded-lg bg-muted/30 p-3 border border-border/30">
                    <div className="flex gap-2 mb-2">
                      <div className="w-8 h-8 bg-primary/20 rounded" />
                      <div className="flex-1">
                        <div className="h-2 bg-muted/50 rounded w-1/2 mb-1" />
                        <div className="h-2 bg-muted/50 rounded w-3/4" />
                      </div>
                    </div>
                    <div className="h-8 bg-muted/50 rounded" />
                  </div>

                  {/* Form Mock */}
                  <div className="aspect-video rounded-lg bg-muted/30 p-3 border border-border/30">
                    <div className="h-2 w-10 bg-primary/30 rounded mb-2" />
                    <div className="space-y-1.5">
                      <div className="h-4 bg-muted/50 rounded" />
                      <div className="h-4 bg-muted/50 rounded" />
                      <div className="h-4 bg-primary/30 rounded w-1/3" />
                    </div>
                  </div>
                </div>

                {/* Label */}
                <div className="mt-4 text-center">
                  <span className="text-xs text-muted-foreground">
                    Demo Conceptual • 3-5 pantallas navegables
                  </span>
                </div>
              </div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Principios / Valores */}
      <section className="py-24 relative bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
              Lo que nos define
            </span>
            <h2 className="font-sora text-3xl md:text-4xl font-bold mb-4">
              Nuestros <span className="text-gradient-primary">principios</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {ourValues.map((value) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-sora text-lg font-semibold mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Qué obtienes */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
                Beneficios claros
              </span>
              <h2 className="font-sora text-3xl md:text-4xl font-bold mb-6">
                Qué obtienes al trabajar con{" "}
                <span className="text-gradient-primary">DiSa</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Nuestro proceso está diseñado para eliminar la incertidumbre y
                el temido "ghosting" que afecta tantos proyectos de software.
              </p>

              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="p-8 rounded-2xl bg-card/50 border border-border/50">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-sora text-lg font-semibold mb-2">
                      ¿Cómo evitamos el ghosting?
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Con reglas claras desde el inicio:
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>El Diagnóstico se agenda con pago confirmado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>No iniciamos desarrollo sin contrato + anticipo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>Límites claros: 1 workshop + 1 ronda de ajustes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>Propuestas con validez definida</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stack tecnológico - Marquee infinito */}
      <section className="py-24 relative bg-card/30 overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
              Tecnología
            </span>
            <h2 className="font-sora text-3xl md:text-4xl font-bold mb-4">
              Herramientas{" "}
              <span className="text-gradient-primary">modernas</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Utilizamos tecnologías actuales según las necesidades de cada
              proyecto.
            </p>
          </motion.div>
        </div>

        {/* Marquee Container */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-card/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-card/80 to-transparent z-10 pointer-events-none" />

          {/* First row - moving left */}
          <div className="flex gap-6 mb-6 animate-marquee">
            {[...techStack, ...techStack].map((tech, index) => (
              <div
                key={`row1-${tech.name}-${index}`}
                className="flex flex-col items-center gap-2 p-6 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all flex-shrink-0 min-w-[120px]"
              >
                <tech.icon className="w-10 h-10 text-primary" />
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>

          {/* Second row - moving right */}
          <div className="flex gap-6 animate-marquee-reverse">
            {[...techStack2, ...techStack2].map((tech, index) => (
              <div
                key={`row2-${tech.name}-${index}`}
                className="flex flex-col items-center gap-2 p-6 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all flex-shrink-0 min-w-[120px]"
              >
                <tech.icon className="w-10 h-10 text-secondary" />
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 relative bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
              Resolvemos dudas
            </span>
            <h2 className="font-sora text-3xl md:text-4xl font-bold mb-4">
              Preguntas{" "}
              <span className="text-gradient-primary">frecuentes</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border/50 rounded-xl px-6 bg-card/50 data-[state=open]:border-primary/30"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 pl-8">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-sora text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Convirtamos tu idea en un sistema que{" "}
              <span className="text-gradient-primary">sí se entrega</span>
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Proceso claro, entregables definidos y comunicación constante.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold px-8"
              >
                <Link to="/contacto?tipo=llamada">
                  <Phone className="w-4 h-4 mr-2" />
                  Agendar llamada
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary/30 hover:bg-primary/10"
              >
                <Link to="/contacto">
                  <Mail className="w-4 h-4 mr-2" />
                  Contactar
                </Link>
              </Button>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-sm text-muted-foreground"
            >
              Primera llamada sin costo • Sin compromiso • Respuesta en 24h
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Nosotros;
