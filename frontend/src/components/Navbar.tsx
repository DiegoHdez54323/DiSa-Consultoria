import type React from "react";
import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import DisaFullLogo from "../assets/DisaFullLogo.svg?react";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/portafolio", label: "Portafolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

const NavGlowOrb = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute w-32 h-32 rounded-full bg-primary/20 blur-3xl pointer-events-none"
    animate={{
      x: [0, 100, -50, 0],
      y: [0, -30, 20, 0],
      scale: [1, 1.2, 0.8, 1],
      opacity: [0.3, 0.5, 0.2, 0.3],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [pathname, setPathname] = useState<string>("/");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-4" : "py-6"
      }`}
    >
      {/* Animated Background */}
      <motion.div
        className={`absolute inset-0 transition-all duration-500 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-primary/10"
            : "bg-transparent"
        }`}
        initial={false}
      >
        {/* Floating Glow Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <NavGlowOrb delay={0} />
          <NavGlowOrb delay={2} />
        </div>

        {/* Mouse Follow Gradient */}
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-radial from-primary/20 to-transparent blur-3xl pointer-events-none opacity-50"
          style={{
            left: smoothX,
            top: smoothY,
            x: "-50%",
            y: "-50%",
          }}
        />

        {/* Animated Border Line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)",
          }}
          animate={{
            opacity: isScrolled ? [0.3, 0.6, 0.3] : 0,
            scaleX: isScrolled ? [0.5, 1, 0.5] : 0,
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="container mx-auto px-6 flex items-center justify-between relative">
        {/* Animated Logo */}
        <a href="/" className="flex items-center gap-3 group relative">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Logo Glow Effect */}
            <motion.div
              className="absolute -inset-4 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Logo Container */}
            <div className="relative flex items-center gap-2">
              <DisaFullLogo className="h-8 w-auto md:h-10 lg:h-12" />
            </div>
          </motion.div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              onHoverStart={() => setHoveredLink(link.href)}
              onHoverEnd={() => setHoveredLink(null)}
              className="relative"
            >
              <a
                href={link.href}
                className={`relative px-4 py-2 font-inter text-sm font-medium transition-all duration-300 block ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {/* Hover Background */}
                <AnimatePresence>
                  {hoveredLink === link.href && (
                    <motion.div
                      layoutId="navbar-hover-bg"
                      className="absolute inset-0 bg-primary/10 rounded-lg z-0"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>

                {/* Active Indicator */}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-2 right-2 h-0.5 bg-gradient-primary rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}

                {/* Sparkle Effect on Active */}
                {pathname === link.href && (
                  <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Sparkles className="w-3 h-3 text-primary" />
                  </motion.div>
                )}

                {link.label}
              </a>
            </motion.div>
          ))}

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <a href="/contacto" className="group relative ">
              <motion.div
                className="absolute -inset-1 bg-gradient-primary rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.span
                className="relative px-6 py-2.5 rounded-full bg-gradient-primary text-primary-foreground font-inter text-sm font-semibold flex items-center gap-2 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
                <span className="relative">Empezar Proyecto</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="relative"
                >
                  →
                </motion.span>
              </motion.span>
            </a>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-foreground relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className="absolute inset-0 bg-primary/20 rounded-lg"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isMobileMenuOpen ? 1 : 0,
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
          />
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden absolute top-full left-0 right-0 mx-4 mt-2 overflow-hidden"
          >
            <motion.div
              className="glass-strong rounded-2xl p-4 border border-primary/20"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            >
              {/* Mobile Menu Glow */}
              <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-transparent rounded-2xl pointer-events-none" />

              <div className="relative flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`relative px-4 py-3 rounded-xl font-inter text-sm font-medium transition-all flex items-center gap-3 ${
                        pathname === link.href
                          ? "bg-primary/20 text-primary"
                          : "text-foreground/70 hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {pathname === link.href && (
                        <motion.div
                          layoutId="mobile-indicator"
                          className="w-1 h-6 bg-gradient-primary rounded-full"
                        />
                      )}
                      {link.label}
                    </a>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.3 }}
                >
                  <a
                    href="/contacto"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mt-2 px-4 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-inter text-sm font-semibold text-center block relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                    <span className="relative">Empezar Proyecto</span>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
