"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX, Sparkles, ArrowRight, Play } from "lucide-react";
import { usePerformance } from "@/hooks/usePerformance";

export default function Hero() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { amount: 0.5 });
    const { scrollY } = useScroll();
    const { isMobile, isLowPower } = usePerformance();

    const [hasPreloaded, setHasPreloaded] = useState(true);

    // Removed preloader effect
    // useEffect(() => { ... }, []);

    // Parallax and Opacity shifts
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

    return (
        <section ref={sectionRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#030305]">
            {/* 1. Background Layer - Desktop Only */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Mobile: Static Gradient Background (No Video for Performance) */}
                <div className="md:hidden absolute inset-0 bg-gradient-to-b from-[#08090B] via-[#0B0D10] to-[#030305]">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
                    {/* Subtle animated particles */}
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent/30 rounded-full animate-pulse" />
                    <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/20 rounded-full animate-pulse delay-300" />
                    <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-accent/20 rounded-full animate-pulse delay-700" />
                </div>

                {/* Desktop: Video Background with Poster */}
                {!isMobile && (
                    <motion.div
                        style={{ y: y1, scale }}
                        initial={{ scale: 1.15, opacity: 0 }}
                        animate={hasPreloaded ? { scale: 1, opacity: 1 } : { scale: 1.15, opacity: 0 }}
                        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                        className="hidden md:block w-full h-full relative will-change-transform"
                    >
                        <video
                            ref={videoRef}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            poster="/bg/IMG_3692.PNG"
                            className="w-full h-full object-cover transition-opacity duration-1000 brightness-[1.05]"
                        >
                            <source src="/bg/firefly.mp4" type="video/mp4" />
                        </video>

                        {/* Dynamic Atmospheric Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#08090B]/40 via-transparent to-[#08090B]/80 z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#08090B]/80 via-transparent to-transparent z-10" />

                        {/* Sharpening HUD Frame */}
                        <div className="absolute inset-10 border border-white/[0.03] rounded-[3rem] pointer-events-none z-20" />

                        {/* Hyper-Glow Lens Flare */}
                        <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-accent/15 blur-[180px] rounded-full z-10 animate-pulse-slow mix-blend-screen" />
                        <div className="absolute bottom-[-15%] left-[5%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full z-10 mix-blend-overlay" />
                    </motion.div>
                )}
            </div>




            {/* 4. Main Content */}
            <div className="w-full px-4 md:px-28 relative z-30 pointer-events-none">
                <motion.div
                    style={{ opacity }}
                    className="max-w-7xl mx-auto"
                >
                    {/* Status Ticker */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={hasPreloaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="flex items-center gap-2 md:gap-4 mb-4 md:mb-8"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="text-accent font-mono text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.6em] uppercase">System Online</span>
                    </motion.div>

                    {/* Elite Typography Heading */}
                    <div className="relative flex flex-col justify-center z-20">
                        {/* Top Line */}
                        <motion.div
                            className="flex items-center gap-2 md:gap-6 mb-4 md:mb-6"
                            initial={{ opacity: 0, x: -50 }}
                            animate={hasPreloaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1 }}
                        >
                            <div className="w-6 md:w-12 h-[1px] bg-accent/60 shadow-[0_0_10px_rgba(172,200,162,0.5)]" />
                            <h2 className="text-[8px] sm:text-[9px] md:text-xl font-mono font-bold text-white/50 tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.4em] uppercase">
                                We don't just <span className="text-white">create content</span>
                            </h2>
                        </motion.div>

                        {/* Main Title Block */}
                        <div className="relative mt-4 md:mt-0">
                            <div className="relative group pointer-events-auto">
                                {/* 'we create' - Absolutely positioned relative to IMPACT */}
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={hasPreloaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                                    transition={{ duration: 1.2, ease: "circOut", delay: 1.5 }}
                                    className="absolute -top-[24%] left-[2%] md:-top-[28%] md:left-[5%] z-30 pointer-events-none"
                                >
                                    <span className="font-serif italic text-[5vw] sm:text-[4.5vw] md:text-[4vw] text-accent font-light tracking-wide drop-shadow-[0_2px_10px_rgba(172,200,162,0.5)]">
                                        we create
                                    </span>
                                </motion.div>

                                {/* 'IMPACT' The Hero */}
                                <motion.h1
                                    initial={{ opacity: 0, scale: 0.8, y: 80, rotateX: 15 }}
                                    animate={hasPreloaded ? { opacity: 1, scale: 1, y: 0, rotateX: 0 } : { opacity: 0, scale: 0.8, y: 80, rotateX: 15 }}
                                    transition={{
                                        duration: 1.5,
                                        ease: [0.16, 1, 0.3, 1],
                                        delay: 1.2
                                    }}
                                    className="relative z-20 font-serif font-black italic text-[17vw] md:text-[17vw] leading-[0.8] md:leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-white/40 select-none"
                                >
                                    IMPACT
                                </motion.h1>

                                {/* Interactive Glow Layer */}
                                <div className="absolute inset-0 bg-accent/10 blur-[120px] rounded-full z-[-1] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
                            </div>
                        </div>
                    </div>

                    {/* Minimal Description */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={hasPreloaded ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 2.2, duration: 1 }}
                        className="flex flex-col md:flex-row items-start gap-4 md:gap-8 mt-8 md:mt-16 ml-0 md:ml-4"
                    >
                        <div className="space-y-3 md:space-y-4">
                            <p className="text-[10px] md:text-sm text-accent/80 font-mono tracking-[0.3em] md:tracking-[0.4em] uppercase">
                                [CREATIVE_ENGINEERING_UNIT]
                            </p>
                            <p className="text-xs md:text-base text-white/70 max-w-md leading-relaxed font-light tracking-wide">
                                Precision-crafted digital experiences that don't just look good—they perform, convert, and dominate.
                            </p>
                        </div>

                        {/* Tactical CTAs - Enabled Pointer Events */}
                        <div className="flex items-center gap-4 md:gap-8 pointer-events-auto">
                            <a
                                href="#work"
                                className="group relative px-6 md:px-8 py-3 md:py-4 overflow-hidden border border-white/20 rounded-full hover:border-white/50 transition-colors"
                            >
                                <span className="relative z-10 text-white font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] group-hover:text-accent transition-colors">Enter Archive</span>
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            </div>



            {/* 6. Vertical Phase Ticker (Scroll Indicator) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={hasPreloaded ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 3 }}
                className="hidden md:flex absolute left-10 bottom-0 h-44 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent flex-col items-center"
            >
                <div className="absolute top-0 -translate-y-full py-4 overflow-hidden">
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] [writing-mode:vertical-lr] animate-scroll-vertical">
                        COLDUNE PHASE 01 // COLDUNE PHASE 01 //
                    </span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce mt-4 shadow-[0_0_10px_rgba(172,200,162,1)]" />
            </motion.div>
        </section>
    );
}
