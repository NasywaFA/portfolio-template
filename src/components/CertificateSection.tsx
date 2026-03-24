"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, X, ZoomIn } from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url?: string;
  initials: string;
  // Path to the certificate image, e.g. "/certificates/google-ux.jpg"
  // Use a real image path when you have the files.
  image?: string;
}

const certificates: Certificate[] = [
  {
    id: "google-ux",
    title: "Google UX Design Professional Certificate",
    issuer: "Google / Coursera",
    date: "2024",
    url: "https://drive.google.com/file/d/1KW0EOZykujxGFljMQ9IrvltrXIdMGbRh/view?usp=drive_link",
    initials: "GUX",
    image: "/certificates/google-ux.jpg",
  },
  // {
  //   id: "interaction-design",
  //   title: "Interaction Design Specialization",
  //   issuer: "UC San Diego",
  //   date: "2023",
  //   url: "#",
  //   initials: "IxD",
  //   image: "/certificates/interaction-design.jpg",
  // },
  // {
  //   id: "figma-advanced",
  //   title: "Advanced Figma Masterclass",
  //   issuer: "Designership",
  //   date: "2023",
  //   url: "#",
  //   initials: "FIG",
  //   image: "/certificates/figma-advanced.jpg",
  // },
  // {
  //   id: "accessibility",
  //   title: "Web Accessibility Certification",
  //   issuer: "IAAP",
  //   date: "2024",
  //   url: "#",
  //   initials: "A11Y",
  //   image: "/certificates/accessibility.jpg",
  // },
  // {
  //   id: "product-design",
  //   title: "Product Design Certificate",
  //   issuer: "Google / Coursera",
  //   date: "2023",
  //   url: "#",
  //   initials: "PD",
  //   image: "/certificates/product-design.jpg",
  // },
  // {
  //   id: "design-systems",
  //   title: "Design Systems Masterclass",
  //   issuer: "Figma",
  //   date: "2024",
  //   url: "#",
  //   initials: "DS",
  //   image: "/certificates/design-systems.jpg",
  // },
];


const StampRing = ({ text }: { text: string }) => (
  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" aria-hidden>
    <defs>
      <path
        id="circle-path"
        d="M 50,50 m -32,0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0"
      />
    </defs>
    <text className="fill-muted-foreground" style={{ fontSize: 9.5, letterSpacing: 2 }}>
      <textPath href="#circle-path" startOffset="0%">
        {text}
      </textPath>
    </text>
  </svg>
);

// Placeholder shown when no image is provided
const ImagePlaceholder = ({ initials }: { initials: string }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-secondary gap-3">
    <span className="text-3xl font-medium tracking-widest text-muted-foreground">
      {initials}
    </span>
    <span className="text-xs text-muted-foreground/50">No image yet</span>
  </div>
);

export const CertificatesSection = () => {
  const [active, setActive] = useState<Certificate | null>(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  return (
    <section id="certificates" className="relative py-24 px-4 scroll-mt-24">
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
            Credentials
          </p>
          <h2 className="text-4xl font-medium leading-tight">
            Earned & certified.
          </h2>
        </motion.div>

        {/* Badge grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {certificates.map((cert, i) => (
            <motion.button
              key={cert.id}
              onClick={() => setActive(cert)}
              className="group relative text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative rounded-2xl border border-border bg-secondary/40 p-5 hover:bg-secondary/80 hover:border-foreground/20 transition-all duration-300 overflow-hidden">

                {/* Subtle grid texture */}
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg,currentColor,currentColor 1px,transparent 1px,transparent 24px),repeating-linear-gradient(90deg,currentColor,currentColor 1px,transparent 1px,transparent 24px)",
                  }}
                />

                {/* Stamp badge */}
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-border group-hover:border-foreground/30 transition-colors duration-300" />
                  <StampRing text={`${cert.issuer.toUpperCase()} · ${cert.date} · `} />
                  <div className="absolute inset-[14px] rounded-full border border-border bg-background flex items-center justify-center group-hover:border-foreground/20 transition-colors duration-300">
                    <span className="text-xs font-medium tracking-widest text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {cert.initials}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className="text-center space-y-1">
                  <h3 className="text-sm font-medium leading-snug line-clamp-2 min-h-[2.5rem] flex items-center justify-center">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground/60 tabular-nums pt-0.5">
                    {cert.date}
                  </p>
                </div>

                {/* Zoom hint */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-3.5 h-3.5 text-muted-foreground" />
                </div>

                {/* Corner marks */}
                <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-border/60 rounded-tl" />
                <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-border/60 rounded-bl" />
                <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-border/60 rounded-br" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-background/85 backdrop-blur-md z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
            />

            {/* Panel */}
            <motion.div
              className="fixed inset-x-4 top-[5%] bottom-[5%] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-2xl z-50 rounded-2xl border border-border bg-background shadow-2xl flex flex-col overflow-hidden"
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            >
              {/* Certificate image */}
              <div className="relative flex-1 min-h-0 bg-secondary/50">
                {active.image ? (
                  <Image
                    src={active.image}
                    alt={active.title}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 672px) 100vw, 672px"
                  />
                ) : (
                  <ImagePlaceholder initials={active.initials} />
                )}

                {/* Close btn */}
                <button
                  onClick={close}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-10"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Footer info */}
              <div className="shrink-0 border-t border-border px-6 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5">
                    {active.issuer} · {active.date}
                  </p>
                  <h3 className="text-sm font-medium leading-snug truncate">
                    {active.title}
                  </h3>
                </div>
                {active.url && active.url !== "#" && (
                  <a
                    href={active.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="shrink-0 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors border border-border rounded-full px-3 py-1.5"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Verify
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};