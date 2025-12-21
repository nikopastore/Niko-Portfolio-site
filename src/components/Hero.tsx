"use client";

import { motion } from "framer-motion";
import PhysicsCanvas from "./PhysicsCanvas";
import { siteConfig } from "@/lib/data";

export default function Hero() {
  return (
    <section className="min-h-screen pt-20 flex flex-col">
      {/* Physics Canvas Container - Full width edge to edge */}
      <div className="flex-grow w-full">
        <PhysicsCanvas />
      </div>

      {/* Name Display - Full width edge to edge */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full overflow-hidden"
      >
        <h1
          className="font-[family-name:var(--font-space-grotesk)] font-bold tracking-tighter leading-[0.85] text-center whitespace-nowrap"
          style={{
            fontSize: 'clamp(3rem, 15vw, 20rem)',
          }}
        >
          {siteConfig.name.toUpperCase()}
        </h1>
      </motion.div>
    </section>
  );
}
