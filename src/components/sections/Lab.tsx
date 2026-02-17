"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useScroll, animate } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { usePerformance } from "@/hooks/usePerformance";
import { Camera, Laptop, Play, Brush, Layout, Grid3x3, Sparkles, Cpu, ScanLine, Atom, Code2, Globe2, ArrowUpRight } from "lucide-react";

// Experiment data - Bento Grid Layout Config
const experiments = [
    {
        id: 1,
        title: "Neural Engine",
        subtitle: "Generative AI Core",
        status: "Online",
        progress: 100,
        mode: "Live Demo",
        icon: Cpu,
        color: "#FF2E63",
        span: "md:col-span-2 md:row-span-2", // Large Square
        bg: "bg-gradient-to-br from-[#FF2E63]/10 to-transparent"
    },
    {
        id: 2,
        title: "Kinetics",
        subtitle: "Mocap",
        status: "Beta",
        progress: 85,
        mode: "Preview",
        icon: Camera,
        color: "#08D9D6",
        span: "md:col-span-1 md:row-span-1", // Small
        bg: "bg-gradient-to-br from-[#08D9D6]/10 to-transparent"
    },
    {
        id: 3,
        title: "Holo-Sync",
        subtitle: "Real-time",
        status: "Alpha",
        progress: 40,
        mode: "Concept",
        icon: Globe2,
        color: "#EAEAEA",
        span: "md:col-span-1 md:row-span-1", // Small
        bg: "bg-white/5"
    },
    {
        id: 5,
        title: "Void UI",
        subtitle: "Zero-G Interface",
        status: "Stable",
        progress: 95,
        mode: "Live Demo",
        icon: Layout,
        color: "#F08A5D",
        span: "md:col-span-1 md:row-span-2", // Tall
        bg: "bg-gradient-to-b from-[#F08A5D]/10 to-transparent"
    },
    {
        id: 6,
        title: "Nexus 3D",
        subtitle: "Asset Vault",
        status: "Online",
        progress: 100,
        mode: "Live Demo",
        icon: Grid3x3,
        color: "#B83B5E",
        span: "md:col-span-2 md:row-span-1", // Wide
        bg: "bg-gradient-to-r from-[#B83B5E]/10 to-transparent"
    },
    {
        id: 4,
        title: "Prisma",
        subtitle: "Style Transfer",
        status: "Processing",
        progress: 65,
        mode: "Preview",
        icon: Brush,
        color: "#252A34",
        span: "md:col-span-1 md:row-span-1", // Small
        bg: "bg-white/5"
    },
];

export default function Lab() {
    const [activeMode, setActiveMode] = useState<"Live Demo" | "Preview" | "Concept">("Live Demo");
    const { isMobile, isLowPower } = usePerformance();
    const containerRef = useRef<HTMLDivElement>(null);

    // Mobile detect removed - handled by hook

    // Mouse tilt effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <section id="lab" className="py-32 relative bg-[#030304] overflow-hidden" ref={containerRef} onMouseMove={handleMouseMove}>
            {/* Background Video - Earth */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {!isMobile && !isLowPower ? (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
                    >
                        <source src="/bg/earth.mp4" type="video/mp4" />
                    </video>
                ) : (
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-950/30 via-black to-black" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030304] via-[#030304]/50 to-[#030304] opacity-90" />
            </div>

            <div className="container mx-auto px-6 relative z-10 w-full max-w-7xl">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-3 mb-6 px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md"
                    >
                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
                        <span className="text-white/60 font-mono text-[10px] uppercase tracking-[0.3em]">Experimental_Output</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-7xl md:text-9xl font-serif text-white tracking-tighter mb-6"
                    >
                        The <span className="text-white/20 italic">Lab</span>
                    </motion.h2>
                    <p className="max-w-xl text-white/50 text-lg font-light leading-relaxed">
                        A playground for digital alchemy. Where code meets chaos.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center mb-16">
                    <div className="flex bg-white/5 backdrop-blur-xl rounded-full p-1.5 border border-white/10 gap-1">
                        {(["Live Demo", "Preview", "Concept"] as const).map((mode) => (
                            <button
                                key={mode}
                                onClick={() => setActiveMode(mode)}
                                className={`px-6 py-2.5 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all duration-300 relative ${activeMode === mode ? "text-black font-bold" : "text-white/50 hover:text-white"
                                    }`}
                            >
                                {activeMode === mode && (
                                    <motion.div
                                        layoutId="tab-pill-lab"
                                        className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                                    />
                                )}
                                <span className="relative z-10">{mode}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* BENTO GRID LAYOUT */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {experiments
                            .filter((exp) => exp.mode === activeMode)
                            .map((exp, i) => (
                                <motion.div
                                    layout
                                    key={exp.id}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                    className={`relative group rounded-[2.5rem] overflow-hidden border border-white/5 backdrop-blur-md hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,255,255,0.05)] cursor-pointer ${exp.span}`}
                                >
                                    {/* Dynamic Background */}
                                    <div className={`absolute inset-0 ${exp.bg} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />

                                    {/* Giant Icon Background */}
                                    <exp.icon
                                        className="absolute -bottom-10 -right-10 text-white/[0.03] transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700"
                                        size={300}
                                        strokeWidth={1}
                                    />

                                    {/* Content Container */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">

                                        {/* Top Header */}
                                        <div className="flex justify-between items-start">
                                            <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                                                <exp.icon size={18} />
                                            </div>
                                            <ArrowUpRight className="text-white/30 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                                        </div>

                                        {/* Bottom Info */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                                <span className={`w-1.5 h-1.5 rounded-full ${exp.progress === 100 ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                                <span className="text-[10px] uppercase tracking-widest text-white/60 font-mono">{exp.status}</span>
                                            </div>

                                            <h3 className="text-3xl font-serif text-white leading-none mb-1 group-hover:text-white transition-colors duration-300">{exp.title}</h3>
                                            <p className="text-white/40 text-sm font-light">{exp.subtitle}</p>
                                        </div>

                                    </div>

                                    {/* Hover Border Glow */}
                                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/10 rounded-[2.5rem] transition-colors duration-500 pointer-events-none" />

                                </motion.div>
                            ))}
                    </AnimatePresence>
                </motion.div>

            </div>
        </section>
    );
}
