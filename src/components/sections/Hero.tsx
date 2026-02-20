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
            {/* 1. Background Layer - Video Enabled for All Devices */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div
                    style={{ y: y1, scale }}
                    initial={{ scale: 1.15, opacity: 0 }}
                    animate={hasPreloaded ? { scale: 1, opacity: 1 } : { scale: 1.15, opacity: 0 }}
                    transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                    className="w-full h-full relative will-change-transform"
                >
                    <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        suppressHydrationWarning
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

                    {/* Hyper-Glow Lens Flare - Disabled on mobile for performance */}
                    {!isMobile && (
                        <>
                            <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-accent/15 blur-[180px] rounded-full z-10 animate-pulse-slow mix-blend-screen" />
                            <div className="absolute bottom-[-15%] left-[5%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full z-10 mix-blend-overlay" />
                        </>
                    )}
                </motion.div>
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
                        {/* Mobile Only Metadata */}
                        <span className="md:hidden text-white/20 font-mono text-[8px] tracking-[0.2em] uppercase border-l border-white/10 pl-3 italic">
                            [Nexus_Core]
                        </span>
                    </motion.div>

                    {/* Elite Typography Heading */}
                    <div className="relative flex flex-col justify-center z-20">
                        {/* Top Line */}
                        <motion.div
                            className="flex items-center gap-2 md:gap-6 mb-2 md:mb-6"
                            initial={{ opacity: 0, x: -50 }}
                            animate={hasPreloaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1 }}
                        >
                            <div className="w-6 md:w-12 h-[1px] bg-accent/60 shadow-[0_0_10px_rgba(172,200,162,0.5)]" />
                            <h2 className="text-[13px] md:text-xl font-serif font-bold text-white/80 tracking-[0.1em] md:tracking-[0.4em] uppercase whitespace-nowrap italic">
                                We don't just <span className="text-white">create content</span>
                            </h2>
                        </motion.div>

                        {/* Main Title Block */}
                        <div className="relative mt-4 md:mt-0">
                            {/* Mobile Scanning Line Effect - Hidden on PC */}
                            <motion.div
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: 1, opacity: 0.2 }}
                                transition={{ duration: 2, delay: 2 }}
                                className="md:hidden absolute top-[-50%] left-0 w-full h-[1px] bg-accent z-40 overflow-hidden"
                            >
                                <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent animate-marquee" />
                            </motion.div>

                            <div className="relative group pointer-events-auto">
                                {/* 'we create' - Absolutely positioned relative to IMPACT */}
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={hasPreloaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                                    transition={{ duration: 1.2, ease: "circOut", delay: 1.5 }}
                                    className="absolute -top-[50%] left-[3%] md:-top-[28%] md:left-[5%] z-30 pointer-events-none"
                                >
                                    <div className="flex flex-col">
                                        <span className="font-serif italic text-[8vw] sm:text-[4.5vw] md:text-[4vw] text-accent font-light tracking-wide drop-shadow-[0_2px_15px_rgba(172,200,162,0.6)]">
                                            we create
                                        </span>
                                    </div>
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
                                    className="relative z-20 font-serif font-black italic text-[18vw] md:text-[17vw] leading-[0.8] md:leading-[0.8] tracking-tighter md:tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-white/40 select-none pb-2"
                                >
                                    IMPACT
                                </motion.h1>

                                {/* Mobile Specific Glow - Extra layer for phones */}
                                <div className="md:hidden absolute inset-0 bg-accent/20 blur-[60px] rounded-full z-[-1] opacity-40 animate-pulse-slow" />

                                {/* Interactive Glow Layer (Desktop Hover) */}
                                <div className="absolute inset-0 bg-accent/10 blur-[120px] rounded-full z-[-1] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
                            </div>
                        </div>
                    </div>

                    {/* Minimal Description */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={hasPreloaded ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 2.2, duration: 1 }}
                        className="flex flex-col md:flex-row items-start gap-4 md:gap-8 mt-12 md:mt-16 ml-0 md:ml-4"
                    >
                        <div className="space-y-4 md:space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="md:hidden w-8 h-[1px] bg-accent/30" />
                                <p className="text-[9px] md:text-sm text-accent font-mono tracking-[0.4em] uppercase font-bold">
                                    [CREATIVE_ENGINEERING]
                                </p>
                            </div>
                            <p className="text-[11px] md:text-base text-white/60 max-w-md leading-relaxed font-light tracking-wide border-l border-accent/10 pl-4 md:border-0 md:pl-0">
                                Precision-crafted digital experiences that don't just look good—they perform, convert, and <span className="text-white italic">dominate.</span>
                            </p>
                        </div>

                        {/* Tactical CTAs - Enabled Pointer Events */}
                        <div className="flex items-center gap-4 md:gap-8 pointer-events-auto mt-4 md:mt-0">
                            <a
                                href="#work"
                                className="group relative px-8 md:px-8 py-4 md:py-4 overflow-hidden border border-accent/30 bg-accent/5 rounded-full hover:border-accent/50 transition-all duration-500"
                            >
                                <span className="relative z-10 text-white font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] group-hover:text-accent transition-colors">Enter Archive</span>
                                <div className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
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
