"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Linkedin, Instagram, Github, ExternalLink } from "lucide-react";

// ── Social links ─────────────────────────────────────────────────────────────
const socials = [
  {
    label: "Email",
    value: "hello@yourname.com",
    href: "mailto:hello@yourname.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/yourname",
    href: "https://linkedin.com/in/yourname",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    value: "@yourhandle",
    href: "https://instagram.com/yourhandle",
    icon: Instagram,
  },
  {
    label: "GitHub",
    value: "github.com/yourname",
    href: "https://github.com/yourname",
    icon: Github,
  },
  {
    label: "Cake.me",
    value: "cake.me/yourname",
    href: "https://cake.me/yourname",
    icon: ExternalLink,
  },
];

// ── Form ──────────────────────────────────────────────────────────────────────
type FormData = { name: string; email: string; message: string };
type Status = "idle" | "sending" | "sent" | "error";

export const ContactSection = () => {
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Replace with your actual form submission logic (e.g. Resend, Formspree, etc.)
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="relative py-24 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Split layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left: Statement + socials ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-24"
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Contact
            </p>

            {/* Big headline */}
            <h2 className="text-5xl sm:text-6xl font-medium leading-[1.05] mb-6">
              Let's make<br />
              something<br />
              <span className="italic text-muted-foreground">great.</span>
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-10 max-w-sm">
              Have a project in mind, want to collaborate, or just want to say hi?
              My inbox is always open.
            </p>

            {/* Social links */}
            <ul className="space-y-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      <span className="w-8 h-8 rounded-full border border-border bg-secondary flex items-center justify-center group-hover:border-foreground/30 group-hover:bg-secondary/80 transition-all duration-200 shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                      <span className="flex flex-col leading-tight">
                        <span className="text-xs text-muted-foreground/60">{s.label}</span>
                        <span className="group-hover:underline underline-offset-2">{s.value}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[360px] flex flex-col items-center justify-center text-center gap-4 rounded-2xl border border-border bg-secondary/30 p-10"
              >
                <span className="text-5xl">✉️</span>
                <h3 className="text-xl font-medium">Message sent!</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Thanks for reaching out. I'll get back to you as soon as I can.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/30 focus:bg-secondary/80 transition-all duration-200"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/30 focus:bg-secondary/80 transition-all duration-200"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs uppercase tracking-widest text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell me about your project, idea, or just say hi..."
                    value={form.message}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/30 focus:bg-secondary/80 transition-all duration-200 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-80 disabled:opacity-50 transition-all duration-200"
                >
                  {status === "sending" ? (
                    <>
                      <motion.span
                        className="w-4 h-4 border-2 border-background/40 border-t-background rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send message
                    </>
                  )}
                </button>

              </form>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          className="mt-24 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-xs text-muted-foreground">
            Designed & built by <span className="text-foreground">Your Name</span>
          </p>
          <p className="text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </motion.footer>

      </div>
    </section>
  );
};