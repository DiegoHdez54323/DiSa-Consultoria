import { motion } from "framer-motion";

export const TechCircle = ({
  className,
  reverse = false,
  speed = "normal",
}: {
  className?: string;
  reverse?: boolean;
  speed?: "slow" | "normal" | "fast";
}) => {
  const durations = {
    slow: { outer: 30, middle: 22, inner: 15 },
    normal: { outer: 20, middle: 15, inner: 10 },
    fast: { outer: 12, middle: 9, inner: 6 },
  };
  const d = durations[speed];

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Outer circle */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-dashed border-primary/40"
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{ duration: d.outer, repeat: Infinity, ease: "linear" }}
      />
      {/* Middle circle */}
      <motion.div
        className="absolute inset-[15%] rounded-full border-2 border-secondary/50"
        animate={{ rotate: reverse ? 360 : -360 }}
        transition={{ duration: d.middle, repeat: Infinity, ease: "linear" }}
      />
      {/* Inner circle */}
      <motion.div
        className="absolute inset-[30%] rounded-full border border-accent/40"
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{ duration: d.inner, repeat: Infinity, ease: "linear" }}
      />
      {/* Center glow */}
      <motion.div
        className="absolute inset-[40%] rounded-full bg-linear-to-br from-primary/30 to-secondary/30 blur-xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Orbiting dots */}
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50"
        style={{ top: "50%", left: "0%", marginTop: "-6px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-secondary shadow-lg shadow-secondary/50"
        style={{ top: "0%", left: "50%", marginLeft: "-4px" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};
