"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  tagline: string;
  problem: string;
  solution: string;
  tools: string[];
  caseStudyUrl: string;
  githubUrl?: string;
  emoji: string;
  size: "large" | "medium" | "small" | "tall";
  accent: string;
  textLight?: boolean;
}

const projects: Project[] = [
  {
    id: "finflow",
    title: "FinFlow",
    subtitle: "Finance Dashboard",
    year: "2024",
    tagline: "Making money make sense.",
    problem:
      "Users struggled to understand their spending patterns across multiple accounts, leading to financial anxiety and poor decisions.",
    solution:
      "A unified dashboard with AI-powered insights that visualizes financial habits and suggests actionable savings goals.",
    tools: ["Figma", "FigJam", "Maze", "Notion"],
    caseStudyUrl: "#",
    githubUrl: "#",
    emoji: "💳",
    size: "large",
    accent: "from-blue-600/30 via-indigo-600/20 to-transparent",
    textLight: false,
  },
  {
    id: "pulsehr",
    title: "PulseHR",
    subtitle: "HR Platform",
    year: "2023",
    tagline: "People ops, finally human.",
    problem:
      "HR teams were drowning in spreadsheets and disparate tools, losing visibility over their most important asset — people.",
    solution:
      "An integrated HR platform with real-time org charts, mood tracking, and automated onboarding flows.",
    tools: ["Figma", "Maze", "Airtable", "Zeplin"],
    caseStudyUrl: "#",
    githubUrl: "#",
    emoji: "🫀",
    size: "tall",
    accent: "from-rose-600/30 via-orange-600/20 to-transparent",
    textLight: false,
  },
  {
    id: "ecotrace",
    title: "EcoTrace",
    subtitle: "Sustainability Scanner",
    year: "2023",
    tagline: "Choose better. Every time.",
    problem:
      "Consumers wanted to make sustainable choices but lacked clear information at the point of purchase.",
    solution:
      "A barcode scanner revealing product sustainability scores with actionable alternatives, gamified to build habits.",
    tools: ["Figma", "ProtoPie", "Hotjar", "Linear"],
    caseStudyUrl: "#",
    githubUrl: "#",
    emoji: "🌱",
    size: "small",
    accent: "from-emerald-600/30 via-teal-600/20 to-transparent",
    textLight: false,
  },
  {
    id: "wayfind",
    title: "Wayfind",
    subtitle: "Travel Planner",
    year: "2022",
    tagline: "Wander with intention.",
    problem:
      "Trip planning was fragmented across dozens of tabs and apps, making travel feel like work before it had even started.",
    solution:
      "A collaborative itinerary builder with smart suggestions, offline maps, and group consensus features.",
    tools: ["Figma", "Protopie", "Dovetail", "Notion"],
    caseStudyUrl: "#",
    githubUrl: "#",
    emoji: "🗺️",
    size: "medium",
    accent: "from-amber-600/30 via-yellow-600/20 to-transparent",
    textLight: false,
  },
];

// Bento grid layout: 3-column CSS grid
// large  → col-span-2 row-span-2
// tall   → col-span-1 row-span-2
// medium → col-span-1 row-span-1 (but taller)
// small  → col-span-1 row-span-1

const sizeClasses: Record<Project["size"], string> = {
  large: "md:col-span-2 md:row-span-1",
  tall: "md:col-span-1 md:row-span-2",
  medium: "md:col-span-1 md:row-span-1",
  small: "md:col-span-1 md:row-span-1",
};

const emojiSize: Record<Project["size"], string> = {
  large: "text-8xl",
  tall: "text-7xl",
  medium: "text-6xl",
  small: "text-5xl",
};

export const ProjectsSection = () => {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 px-4 scroll-mt-24">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
            Selected Work
          </p>
          <h2 className="text-4xl font-medium leading-tight">
            Projects I've shaped<br />from research to release.
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[200px_200px_200px] gap-3 auto-rows-[180px]">
          {projects.map((project, i) => (
            <motion.button
              key={project.id}
              onClick={() => setActive(project)}
              className={[
                "group relative overflow-hidden rounded-2xl border border-border text-left",
                "bg-secondary hover:border-foreground/20 transition-all duration-300",
                sizeClasses[project.size],
              ].join(" ")}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Gradient bg */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Emoji visual */}
              <div className="absolute bottom-4 right-4 select-none opacity-20 group-hover:opacity-40 transition-opacity duration-500 leading-none">
                <span className={emojiSize[project.size]}>{project.emoji}</span>
              </div>

              {/* Content */}
              <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1.5">
                    {project.subtitle} · {project.year}
                  </p>
                  <h3
                    className={[
                      "font-medium leading-tight",
                      project.size === "large" ? "text-2xl" : "text-lg",
                    ].join(" ")}
                  >
                    {project.title}
                  </h3>
                  {(project.size === "large" || project.size === "tall") && (
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-2">
                      {project.tagline}
                    </p>
                  )}
                </div>

                {/* Links */}
                <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" />
                    Case study
                  </span>
                  {project.githubUrl && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1 ml-2">
                      <Github className="w-3 h-3" />
                      GitHub
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal overlay */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActive(null)}
            />

            <motion.div
              className="fixed inset-x-4 top-[6%] bottom-[6%] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-xl z-50 rounded-2xl border border-border bg-background shadow-2xl flex flex-col overflow-hidden"
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            >
              {/* Image band */}
              <div
                className={`relative h-48 shrink-0 bg-gradient-to-br ${active.accent} flex items-center justify-center`}
              >
                <span className="text-8xl select-none opacity-80">
                  {active.emoji}
                </span>
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-5 flex items-center gap-2">
                  <span className="text-xs bg-background/60 backdrop-blur-sm px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                    {active.subtitle}
                  </span>
                  <span className="text-xs bg-background/60 backdrop-blur-sm px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                    {active.year}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                <div>
                  <h2 className="text-2xl font-medium mb-1">{active.title}</h2>
                  <p className="text-muted-foreground text-sm italic">
                    {active.tagline}
                  </p>
                </div>

                <div className="h-px bg-border" />

                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5">
                      The Problem
                    </p>
                    <p className="text-sm leading-relaxed">{active.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5">
                      The Solution
                    </p>
                    <p className="text-sm leading-relaxed">{active.solution}</p>
                  </div>
                </div>

                <div className="h-px bg-border" />

                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Tools
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {active.tools.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-3 py-1 rounded-full bg-secondary border border-border"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex gap-3 pt-1 pb-2">
                  <a
                    href={active.caseStudyUrl}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View case study
                  </a>
                  {active.githubUrl && (
                    <a
                      href={active.githubUrl}
                      onClick={(e) => e.stopPropagation()}
                      className="w-11 flex items-center justify-center rounded-full border border-border hover:bg-secondary transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};