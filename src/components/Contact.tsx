"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { useToast } from "@/components/Toast";
import { cn } from "@/lib/utils";

const socialLinks = [
  {
    name: "LinkedIn",
    href: siteConfig.linkedin,
  },
  {
    name: "GitHub",
    href: siteConfig.github,
  },
];

export default function Contact() {
  const { showToast } = useToast();

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    showToast("Email copied to clipboard!");
  };

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight">
            LET&apos;S WORK TOGETHER
          </h2>

          <button
            onClick={copyEmail}
            className="inline-block text-2xl md:text-4xl text-muted hover:text-foreground transition-colors duration-300 mb-12 cursor-pointer"
          >
            {siteConfig.email}
          </button>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex items-center gap-2 px-6 py-3",
                  "border border-card-border rounded-full",
                  "hover:bg-foreground hover:text-background",
                  "transition-all duration-300"
                )}
              >
                <span className="font-medium">{link.name}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            ))}
            <button
              onClick={copyEmail}
              className={cn(
                "group flex items-center gap-2 px-6 py-3",
                "border border-card-border rounded-full",
                "hover:bg-foreground hover:text-background",
                "transition-all duration-300 cursor-pointer"
              )}
            >
              <span className="font-medium">Email</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
