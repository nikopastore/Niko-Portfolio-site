"use client";

import { motion } from "framer-motion";
import PhysicsCanvas from "./PhysicsCanvas";
import { siteConfig } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative pt-16 -mb-24">

      {/* Physics Canvas Container - Full width edge to edge */}
      <div className="w-full">
        <PhysicsCanvas />
      </div>

      {/* Name Display - Full width, minimal gap above */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full overflow-hidden -mt-8"
      >
        <h1
          className="font-[family-name:var(--font-space-grotesk)] font-bold tracking-[-0.04em] leading-[0.85] text-center whitespace-nowrap"
          style={{
            fontSize: 'clamp(3rem, 15vw, 20rem)',
          }}
        >
          {siteConfig.name.toUpperCase()}
        </h1>
      </motion.div>

      {/* Two-Column Intro - Like Akio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="max-w-6xl mx-auto px-6 mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
      >
        {/* Left: All text content */}
        <div className="flex flex-col">
          <div className="w-full h-3 bg-yellow-400 rounded-sm mb-6" />
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold leading-tight tracking-tight">
            Hi, I'm Niko — a data engineer who builds AI products that actually ship
          </h2>
          <div className="text-muted text-base md:text-lg leading-relaxed mt-4">
            <p>
              Former Data Engineer at Routeware, building Snowflake warehouses and ETL pipelines. 
              Founder of ScalePilot Labs by night, shipping AI-powered SaaS products. 
              MS in Data Science from UC San Diego.
            </p>
          </div>
        </div>

        {/* Right: Photo */}
        <div className="flex justify-start md:justify-end">
          <img
            src="/niko-photo.jpg"
            alt="Niko portrait"
            className="w-full max-w-[360px] rounded-2xl border border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
