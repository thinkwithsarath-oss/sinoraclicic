import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  rotation: number;
  shape: "circle" | "square" | "triangle";
}

const COLORS = [
  "#0284c7", // brand-500
  "#025091", // brand-600
  "#10b981", // emerald-500
  "#f59e0b", // amber-500 (gold)
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
];

const SHAPES: Array<"circle" | "square" | "triangle"> = ["circle", "square", "triangle"];

export default function ConfettiAnimation() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles bursting outward
    const generated: Particle[] = [];
    for (let i = 0; i < 75; i++) {
      // Random angle in radians
      const angle = Math.random() * Math.PI * 2;
      // Random distance
      const distance = 80 + Math.random() * 320;
      const x = Math.cos(angle) * distance;
      // Gravitational pull / drift downwards as it slows down
      const y = Math.sin(angle) * distance + (Math.random() * 90 + 30);

      generated.push({
        id: i,
        x,
        y,
        size: Math.random() * 11 + 5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 0.15,
        duration: 1.6 + Math.random() * 1.6,
        rotation: Math.random() * 360,
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)]
      });
    }
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 flex items-center justify-center">
      {/* Pulsing colored back-glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ 
          opacity: [0, 0.45, 0.15, 0],
          scale: [0.6, 1.4, 1.7, 2.0],
        }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute w-80 h-80 rounded-full bg-brand-500/25 blur-3xl"
      />

      {/* Floating Confetti Shapes */}
      {particles.map((p) => {
        const renderShape = () => {
          switch (p.shape) {
            case "square":
              return (
                <div 
                  className="w-full h-full shadow-xs" 
                  style={{ backgroundColor: p.color }}
                />
              );
            case "triangle":
              return (
                <div 
                  className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] drop-shadow-xs" 
                  style={{ borderBottomColor: p.color }}
                />
              );
            default:
              return (
                <div 
                  className="w-full h-full rounded-full shadow-xs" 
                  style={{ backgroundColor: p.color }}
                />
              );
          }
        };

        return (
          <motion.div
            key={p.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.1, rotate: 0 }}
            animate={{
              x: p.x,
              y: p.y,
              opacity: [1, 1, 0.7, 0],
              scale: [0.1, 1.2, 0.9, 0],
              rotate: [0, p.rotation * 1.5, p.rotation * 3],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: [0.1, 0.85, 0.3, 1], // Custom snappy-to-smooth bezier curve
            }}
            className="absolute"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
          >
            {renderShape()}
          </motion.div>
        );
      })}

      {/* Golden twinkling star sparks */}
      {[...Array(14)].map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 1.2;
        const duration = 2.2 + Math.random() * 1.8;
        const size = Math.random() * 7 + 4;
        return (
          <motion.div
            key={`spark-${i}`}
            initial={{ opacity: 0, y: 50, scale: 0 }}
            animate={{ 
              opacity: [0, 0.9, 0.9, 0], 
              y: [0, -140 - Math.random() * 120], 
              scale: [0, 1.3, 1.0, 0] 
            }}
            transition={{ 
              duration, 
              delay, 
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut" 
            }}
            className="absolute text-amber-400 select-none font-sans drop-shadow-[0_0_4px_rgba(245,158,11,0.6)]"
            style={{ 
              left: `${left}%`, 
              top: `${45 + (Math.random() * 35 - 15)}%`,
              fontSize: `${size}px`
            }}
          >
            ✦
          </motion.div>
        );
      })}
    </div>
  );
}
