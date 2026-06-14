"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WorksGrid from "@/components/WorksGrid";
import TrainingSection from "@/components/TrainingSection";
import AppsSection from "@/components/AppsSection";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import HireNikoCTA from "@/components/HireNikoCTA";
import { projects, experiences, education, apps, training } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <WorksGrid projects={projects} />
        <TrainingSection items={training} />
        <AppsSection apps={apps} />
        <Experience experiences={experiences} education={education} />
        <Contact />
      </main>
      <Footer />
      <HireNikoCTA />
    </>
  );
}
