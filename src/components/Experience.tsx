"use client";

import { motion } from "framer-motion";
import { Experience as ExperienceType } from "@/lib/data";

interface ExperienceProps {
  experiences: ExperienceType[];
  education: ExperienceType[];
}

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export default function Experience({ experiences, education }: ExperienceProps) {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Experience Section */}
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold mb-12 tracking-tight">
          EXPERIENCE
        </h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.1 }}
          className="flex flex-col mb-20"
        >
          {experiences.map((item, index) => (
            <motion.div key={index} variants={listItemVariants}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start py-6 hover:bg-card/50 rounded-lg -mx-4 px-4 transition-colors duration-300 group">
                <div className="flex flex-col">
                  <span className="font-[family-name:var(--font-space-grotesk)] font-semibold text-lg group-hover:translate-x-2 transition-transform duration-300">
                    {item.company}
                  </span>
                  <span className="text-muted">{item.role}</span>
                  {item.highlights && (
                    <div className="mt-2 space-y-1">
                      {item.highlights.map((h, i) => (
                        <span key={i} className="text-sm text-muted/70 block">
                          • {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-muted text-sm sm:text-base mt-1 sm:mt-0 shrink-0">
                  {item.years}
                </span>
              </div>
              {index < experiences.length - 1 && (
                <hr className="border-t border-card-border" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Education Section */}
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold mb-12 tracking-tight">
          EDUCATION
        </h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.1 }}
          className="flex flex-col"
        >
          {education.map((item, index) => (
            <motion.div key={index} variants={listItemVariants}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start py-6 hover:bg-card/50 rounded-lg -mx-4 px-4 transition-colors duration-300 group">
                <div className="flex flex-col">
                  <span className="font-[family-name:var(--font-space-grotesk)] font-semibold text-lg group-hover:translate-x-2 transition-transform duration-300">
                    {item.company}
                  </span>
                  <span className="text-muted">{item.role}</span>
                  {item.subtitle && (
                    <span className="text-muted text-sm">{item.subtitle}</span>
                  )}
                </div>
                <span className="text-muted text-sm sm:text-base mt-1 sm:mt-0">
                  {item.years}
                </span>
              </div>
              {index < education.length - 1 && (
                <hr className="border-t border-card-border" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
