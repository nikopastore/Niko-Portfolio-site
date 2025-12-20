"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/data";
import { cn } from "@/lib/utils";

interface WorksGridProps {
  projects: Project[];
}

const gridItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WorksGrid({ projects }: WorksGridProps) {
  const getSpanClass = (span: "normal" | "wide" | "full") => {
    switch (span) {
      case "normal":
        return "md:col-span-1";
      case "wide":
        return "md:col-span-2";
      case "full":
        return "md:col-span-3";
      default:
        return "md:col-span-1";
    }
  };

  return (
    <section id="work" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold mb-12 tracking-tight">
          SELECTED WORKS
        </h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={gridItemVariants}
              className={cn(
                "group relative overflow-hidden",
                "bg-card border border-card-border",
                "rounded-3xl p-6 flex flex-col",
                "hover:scale-[1.02] hover:border-muted",
                "transition-all duration-300 cursor-pointer",
                getSpanClass(project.span)
              )}
            >
              <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl bg-card-border">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <span className="text-xs text-muted uppercase tracking-wider mb-2">
                {project.category}
              </span>
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold mb-2">
                {project.name}
              </h3>
              <p className="text-muted text-sm line-clamp-2 flex-grow">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2 py-1 rounded-full border border-card-border text-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
