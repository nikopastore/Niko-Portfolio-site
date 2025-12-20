"use client";

import { motion } from "framer-motion";
import PhysicsCanvas from "./PhysicsCanvas";
import { siteConfig } from "@/lib/data";

export default function Hero() {
  return (
    <section className="min-h-screen pt-24 pb-12 px-6 flex flex-col">
      {/* Physics Canvas Container */}
      <div className="flex-grow flex items-center justify-center max-w-7xl mx-auto w-full">
        <PhysicsCanvas />
      </div>

      {/* Name Display */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center mt-8"
      >
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold tracking-tighter leading-none">
          {siteConfig.name.toUpperCase()}
        </h1>
      </motion.div>
    </section>
  );
}
