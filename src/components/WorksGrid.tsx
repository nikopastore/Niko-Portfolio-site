"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/data";
import { cn } from "@/lib/utils";

interface WorksGridProps {
  projects: Project[];
}

export default function WorksGrid({ projects }: WorksGridProps) {
  return (
    <section id="work" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold mb-16 tracking-tight">
          SELECTED WORKS
        </h2>

        {/* Timeline container */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-card-border -translate-x-1/2 hidden md:block" />

          {/* Projects */}
          <div className="space-y-16 md:space-y-24">
            {projects.map((project, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 top-8 w-3 h-3 bg-foreground rounded-full -translate-x-1/2 z-10 hidden md:block" />

                  {/* Content wrapper */}
                  <div
                    className={cn(
                      "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center",
                      !isLeft && "md:direction-rtl"
                    )}
                  >
                    {/* Project Card (Image side) */}
                    <div
                      className={cn(
                        "md:direction-ltr",
                        isLeft ? "md:pr-12" : "md:pl-12 md:order-2"
                      )}
                    >
                      <div className="group bg-card border border-card-border rounded-2xl overflow-hidden hover:border-muted transition-all duration-300">
                        {/* Image */}
                        <div className="relative w-full aspect-video overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.name}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                          />
                        </div>

                        {/* Card content */}
                        <div className="p-6">
                          <span className="text-xs text-muted uppercase tracking-wider">
                            {project.category}
                          </span>
                          <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold mt-2 mb-4">
                            {project.name}
                          </h3>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.skills.map((skill) => (
                              <span
                                key={skill}
                                className="text-xs px-3 py-1 rounded-full border border-card-border text-muted"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          {/* Visit button */}
                          {project.url ? (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cn(
                                "inline-flex items-center gap-2 px-5 py-2.5 mt-2",
                                "bg-foreground text-background rounded-full",
                                "hover:opacity-90 transition-opacity",
                                "font-medium text-sm"
                              )}
                            >
                              Visit Site
                              <ArrowUpRight className="w-4 h-4" />
                            </a>
                          ) : (
                            <span
                              className={cn(
                                "inline-flex items-center gap-2 px-5 py-2.5 mt-2",
                                "border border-card-border text-muted rounded-full",
                                "font-medium text-sm cursor-default"
                              )}
                            >
                              Coming Soon
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Description side */}
                    <div
                      className={cn(
                        "md:direction-ltr",
                        isLeft ? "md:pl-12" : "md:pr-12 md:order-1"
                      )}
                    >
                      <div className={cn("md:max-w-md", isLeft ? "md:ml-auto" : "md:mr-auto")}>
                        <span className="text-sm text-muted font-medium tracking-wider">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mt-4">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
