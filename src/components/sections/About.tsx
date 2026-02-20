"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { usePerformance } from "@/hooks/usePerformance";

const PHASES = [
    {
        id: "01",
        title: "Genesis",
        subtitle: "The Spark",
        description: "A rebellion against the static. We found beauty in the chaos of code and nature, planting the seeds of a digital revolution.",
        video: "/bg/story-forest.mp4",
        color: "bg-emerald-500",
        accent: "text-emerald-400"
    },
    {
        id: "02",
        title: "Alchemy",
        subtitle: "The Forge",
        description: "Forging raw potential into kinetic reality. We bridge the gap between art and engineering, turning abstract concepts into tangible magic.",
        video: "/bg/firefly.mp4",
        color: "bg-blue-500",
        accent: "text-blue-400"
    },
    {
        id: "03",
        title: "Horizon",
        subtitle: "The Legacy",
        description: "Beyond pixels. Building digital empires that stand the test of time. We don't just create websites; we architect experiences.",
        video: "/bg/0216.mp4",
        color: "bg-purple-500",
        accent: "text-purple-400"
    }
];

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { isMobile } = usePerformance();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const showMobileLayout = mounted && isMobile;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const yTitle = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacityTitle = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} id="about" className="relative min-h-screen py-32 flex flex-col items-center justify-center overflow-hidden bg-[#030305]">

            {/* Ambient Background */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/20 via-[#030305] to-[#030305] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center">

                {/* Section Header */}
                <motion.div
                    style={{ y: yTitle, opacity: opacityTitle }}
                    className="mb-16 md:mb-32 text-center z-20 relative"
                >
                    <div className="relative inline-block">
                        <h2 className="text-[15vw] md:text-[10vw] leading-[0.75] font-serif font-black tracking-tighter relative">
                            {/* Masked Gradient Text using Brand Accent */}
                            <span className="bg-gradient-to-b from-accent via-accent/80 to-accent/20 bg-clip-text text-transparent italic block transform -rotate-1">
                                THE
                            </span>
                            <span className="relative inline-block mt-2 text-white">
                                <span className="absolute inset-0 blur-3xl bg-accent/30 -z-10 rounded-full scale-150" />
                                STORY
                            </span>
                        </h2>

                        {/* Decorative Flourishes */}
                        <div className="mt-8 flex items-center justify-center gap-6">
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ duration: 1.5, ease: "circOut" }}
                                className="h-[1px] w-12 md:w-32 bg-gradient-to-r from-transparent to-accent/50"
                            />
                            <div className="flex flex-col items-center gap-1">
                                <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-accent/80 font-bold">
                                    Chronicle // 001
                                </span>
                                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 italic">
                                    Established 2024
                                </span>
                            </div>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ duration: 1.5, ease: "circOut" }}
                                className="h-[1px] w-12 md:w-32 bg-gradient-to-l from-transparent to-accent/50"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Interactive Portal Grid */}
                <div className="w-full h-[150vh] md:h-[70vh] flex flex-col md:flex-row gap-4 md:gap-4 relative">
                    {PHASES.map((phase, index) => (
                        <motion.div
                            key={phase.id}
                            onHoverStart={() => setHoveredIndex(index)}
                            onHoverEnd={() => setHoveredIndex(null)}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className={`
                                relative flex-1 group cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl border border-white/5 
                                transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                                ${hoveredIndex === index ? 'md:flex-[2]' : 'md:flex-1'}
                                ${hoveredIndex !== null && hoveredIndex !== index ? 'md:opacity-50 blur-[2px] md:scale-95' : 'md:opacity-100 md:scale-100'}
                            `}
                        >
                            {/* Video Background */}
                            <div className="absolute inset-0 z-0">
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="auto"
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out grayscale group-hover:grayscale-0"
                                >
                                    <source src={phase.video} />
                                </video>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute inset-0 z-10 p-6 md:p-10 flex flex-col justify-end items-start h-full">

                                {/* Top Number */}
                                <div className="absolute top-6 right-6 md:top-10 md:right-10 overflow-hidden">
                                    <span className="font-mono text-4xl md:text-6xl font-bold text-white/5 group-hover:text-white/20 transition-colors duration-500">
                                        {phase.id}
                                    </span>
                                </div>

                                {/* Text Content */}
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 w-full">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`w-1 h-8 ${phase.color}`} />
                                        <h3 className="font-serif text-3xl md:text-4xl text-white font-medium italic">
                                            {phase.title}
                                        </h3>
                                    </div>

                                    <h4 className={`font-mono text-xs uppercase tracking-widest mb-4 opacity-70 ${phase.accent}`}>
                                        // {phase.subtitle}
                                    </h4>

                                    <p className="text-white/70 text-sm md:text-base font-light leading-relaxed max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 h-0 group-hover:h-auto overflow-hidden">
                                        {phase.description}
                                    </p>

                                    {/* Mobile/Default view visible text (short) */}
                                    <p className="md:hidden text-white/70 text-sm mt-2 block">
                                        {phase.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer / Founders Signature - Floating with High Z-Index */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-16 md:mt-24 w-full flex justify-center md:justify-end px-4"
                >
                    <div className="relative group p-2 pr-6 rounded-full bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden hover:border-white/30 transition-all duration-500 cursor-pointer">
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative flex items-center gap-4">
                            <div className="flex -space-x-3 pl-1">
                                {[
                                    { src: "/founders/adil founder.PNG", alt: "Jamal Adil" },
                                    { src: "/founders/IMG_3498.PNG", alt: "Arslan" }
                                ].map((founder, i) => (
                                    <div key={i} className="relative w-12 h-12 rounded-full border border-[#030305] overflow-hidden bg-black ring-2 ring-white/5 group-hover:ring-white/20 transition-all duration-300 transform group-hover:scale-110 group-hover:z-10">
                                        <Image
                                            src={founder.src}
                                            alt={founder.alt}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col">
                                <span className="text-white text-lg font-serif italic leading-none">Jamal Adil & Arslan</span>
                                <span className="text-white/40 text-[10px] uppercase tracking-wider font-mono mt-1">Founders</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
