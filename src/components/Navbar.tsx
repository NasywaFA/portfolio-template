"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { id: "hero", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Achievements" },
  { id: "contact", label: "Contact" },
]

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState("hero")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id),
      }))

      for (const section of sections.reverse()) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.nav
      className={`fixed z-40 transition-all duration-500 ${
        isScrolled
            ? "top-10 inset-x-0 flex justify-center"
            : "top-10 left-0 w-full"
        }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div
        className={`transition-all duration-500 ${
            isScrolled
            ? "glass-strong rounded-full px-2 py-2 shadow-lg"
            : "w-full flex justify-center py-6"
        }`}
        >
        <ul className="flex items-center justify-center gap-1">
          {navItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full"
              >
                <span
                  className={`relative z-10 transition-colors duration-300 ${
                    activeSection === item.id
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </span>

                <AnimatePresence>
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute inset-0 bg-primary rounded-full"
                      layoutId="activeSection"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </AnimatePresence>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  )
}