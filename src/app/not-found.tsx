"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  const pathname = usePathname();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 overflow-hidden">
      <span
        className="pointer-events-none absolute select-none text-[20rem] font-bold leading-none text-foreground/[0.03]"
        aria-hidden
      >
        404
      </span>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Floating emoji */}
        <motion.span
          className="mb-6 text-6xl"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          🛸
        </motion.span>

        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
          Error 404
        </p>

        <h1 className="leading-none mb-4">
          <span className="block text-2xl font-medium text-muted-foreground">
            Lost in
          </span>
          <span className="block text-7xl sm:text-8xl font-bold tracking-tight bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
            Space
          </span>
        </h1>

        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-10">
          Looks like this page drifted into a black hole.
          The route <code className="text-foreground/60 bg-secondary px-1.5 py-0.5 rounded text-xs">{pathname}</code> doesn't exist.
        </p>

        <Link
          href="/"
          className="group flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-6 py-3 text-sm font-medium hover:bg-secondary hover:border-foreground/20 transition-all duration-200"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
          Back to earth
        </Link>
      </motion.div>

      {/* Decorative orbiting dot */}
      <motion.div
        className="pointer-events-none absolute w-2 h-2 rounded-full bg-violet-400/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50vw 50vh", left: "calc(50% + 180px)", top: "50%" }}
      />
      <motion.div
        className="pointer-events-none absolute w-1.5 h-1.5 rounded-full bg-blue-400/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50vw 50vh", left: "calc(50% - 220px)", top: "50%" }}
      />
    </div>
  );
}