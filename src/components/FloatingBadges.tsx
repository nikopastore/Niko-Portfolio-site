"use client";

import { motion } from "framer-motion";

const badges = [
  { text: "DATA ENGINEERING", top: "12%", left: "8%", delay: 0.1 },
  { text: "PYTHON", top: "18%", left: "25%", delay: 0.2 },
  { text: "FULL STACK", top: "8%", left: "42%", filled: true, delay: 0.15 },
  { text: "PHOENIX", top: "15%", right: "28%", filled: true, delay: 0.25 },
  { text: "LLM / RAG", top: "22%", right: "12%", delay: 0.3 },
  { text: "NEXT.JS", top: "28%", left: "15%", delay: 0.35 },
];

export default function FloatingBadges() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {badges.map((badge, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + badge.delay, duration: 0.5 }}
          className="absolute pointer-events-auto hidden md:block"
          style={{ 
            top: badge.top, 
            left: badge.left, 
            right: badge.right 
          }}
        >
          <motion.span
            whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
            transition={{ duration: 0.2 }}
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium
              border border-card-border cursor-default select-none backdrop-blur-sm
              ${badge.filled 
                ? "bg-foreground text-background" 
                : "bg-background/80 hover:bg-background"}
            `}
          >
            {badge.text}
            {badge.filled && <span className="w-1.5 h-1.5 bg-current rounded-full opacity-60" />}
          </motion.span>
        </motion.div>
      ))}
      
      {/* Rotating asterisk */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, rotate: 360 }}
        transition={{ 
          opacity: { delay: 0.8 },
          scale: { delay: 0.8 },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
        className="absolute top-[10%] right-[6%] text-3xl text-foreground/20 hidden lg:block"
      >
        ✱
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ 
          opacity: { delay: 1.2 },
          y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-8 h-8 rounded-full bg-foreground/10 border border-card-border flex items-center justify-center">
          <svg 
            className="w-4 h-4 text-foreground/60" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
