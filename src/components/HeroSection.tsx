"use client"

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const HeroSection = () => {
    const scrollToProjects = () => {
        const element = document.getElementById('projects')
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const scrollToContact = () => {
        const element = document.getElementById('contact')
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Water Reflection Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-galaxy-deep/80 pointer-events-none" />

            {/* Ambient Glow */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <p className="text-muted-foreground text-sm md:text-base tracking-widest uppercase mb-4">
                        UI/UX Designer
                    </p>
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-glow"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <span className="text-gradient">Nasywa Faizah</span>
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                >
                    Crafting digital experiences that ripple through time — 
                    where emotion meets intention, and every pixel tells a story.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                >
                    <Button
                        size="lg"
                        className="px-8 py-6 text-base rounded-full bg-primary hover:bg-primary/90 text-primary-foreground glow-primary transition-all hover:scale-105"
                        onClick={scrollToProjects}
                    >
                        View My Work
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="px-8 py-6 text-base rounded-full glass border-primary/30 hover:bg-primary/10 transition-all hover:scale-105"
                        onClick={scrollToContact}
                    >
                        Get In Touch
                    </Button>
                </motion.div>

                <motion.p
                    className="text-sm text-muted-foreground/60 italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                >
                    Move your cursor to disturb the water ✦
                </motion.p>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2, repeat: Infinity, repeatType: 'reverse' }}
            >
                <ChevronDown className="w-6 h-6 text-muted-foreground" />
            </motion.div>
        </section>
    );
};

export default HeroSection