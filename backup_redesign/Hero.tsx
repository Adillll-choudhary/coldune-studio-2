"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX, Sparkles, ArrowRight, Play } from "lucide-react";

export default function Hero() {
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { amount: 0.1 });
    const { scrollY } = useScroll();

    // Parallax and Opacity shifts
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

    // Auto-mute audio when scrolling away
    useEffect(() => {
        if (!isInView && !isMuted) {
            setIsMuted(true);
            if (audioRef.current) {
                audioRef.current.pause();
            }
        }
    }, [isInView, isMuted]);

    const toggleSound = () => {
        console.log("Toggling sound. Current muted state:", isMuted);
        if (audioRef.current) {
            if (isMuted) {
                console.log("Attempting to play audio...");
                audioRef.current.volume = 1.0; // Max volume for testing
                const playPromise = audioRef.current.play();

                if (playPromise !== undefined) {
                    playPromise.then(_ => {
                        console.log("Audio started playing successfully");
                        setIsMuted(false);
                    })
                        .catch(error => {
                            console.error("Audio playback failed completely:", error);
                            // Auto-play policy might be blocking it?
                        });
                }
            } else {
                console.log("Pausing audio");
                audioRef.current.pause();
                setIsMuted(true);
            }
        } else {
            console.error("Audio ref is null!");
        }
    };

    return (
        <section ref={sectionRef} className="relative w-full h-screen flex items-center pt-24 overflow-hidden bg-[#0B0D10]">
            {/* 1. Cinematic Video Engine */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div
                    style={{ y: y1, scale }}
                    initial={{ scale: 1.15, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }} // Slower, more cinematic ease
                    className="w-full h-full relative will-change-transform" // Performance hint
                >
                    <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted // Always muted, we use separate audio track
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover transition-opacity duration-1000 brightness-[1.1] contrast-[1.15] saturate-[1.2]"
                    >
                        <source src="/bg/Firefly Ultra cinematic deep space sci-fi scene,_slow cinematic camera push forward,_massive ringed .mp4" type="video/mp4" />
                    </video>

                    {/* Dune Theme Audio Track */}
                    <audio ref={audioRef} loop>
                        <source src="/audio/dune_theme.mp3" type="audio/mpeg" />
                    </audio>

                    {/* Dynamic Atmospheric Overlays - Refined for Clarity */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#08090B]/40 via-transparent to-[#08090B]/80 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#08090B]/80 via-transparent to-transparent z-10" />

                    {/* Sharpening HUD Frame */}
                    <div className="absolute inset-10 border border-white/[0.03] rounded-[3rem] pointer-events-none z-20" />

                    {/* Hyper-Glow Lens Flare - HDR Style */}
                    <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-accent/15 blur-[180px] rounded-full z-10 animate-pulse-slow mix-blend-screen" />
                    <div className="absolute bottom-[-15%] left-[5%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full z-10 mix-blend-overlay" />
                </motion.div>
            </div>




            {/* 4. Main Control Hub (Content) */}
            <div className="w-full px-6 lg:px-28 relative z-30">
                <motion.div
                    style={{ opacity }}
                    className="max-w-5xl"
                >
                    {/* Status Ticker */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="flex items-center gap-4 mb-12"
                    >
                        <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
                        <span className="text-accent font-mono text-[9px] tracking-[0.5em] uppercase">Phase 01</span>
                    </motion.div>

                    {/* Elite Typography Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-[7.8vw] font-serif font-bold text-white mb-10 leading-[0.88] tracking-tighter will-change-transform"
                    >
                        We don't create <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-accent italic font-light pb-3 pr-2 inline-block leading-[0.9]">
                            just content,
                        </span>
                        <br />
                        We create <span className="relative inline-block text-white">
                            impact.
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ delay: 2.5, duration: 1.5, ease: "easeInOut" }}
                                className="absolute -bottom-4 left-0 h-1.5 bg-accent/30 blur-sm shadow-[0_0_20px_rgba(172,200,162,0.4)]"
                            />
                        </span>
                    </motion.h1>

                    {/* Minimal Description */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.8, duration: 1 }}
                        className="text-base md:text-lg text-text-secondary max-w-xl mb-14 leading-relaxed font-light"
                    >
                        Synthesizing raw strategy, cinematic visuals, and tactical engineering into high-performance digital experiences. The engine for brands that demand authority.
                    </motion.p>

                    {/* Tactical CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8 }}
                        className="flex flex-col sm:flex-row items-center gap-8"
                    >
                        <a
                            href="#work"
                            className="group relative px-12 py-5 rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(172,200,162,0.2)]"
                        >
                            <div className="absolute inset-0 bg-accent transition-transform duration-500 group-hover:scale-110" />
                            <div className="relative flex items-center gap-3 text-black font-black text-xs uppercase tracking-[0.2em]">
                                Explore Archive
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </a>

                        <a
                            href="#contact"
                            className="group flex items-center gap-4 text-white hover:text-accent transition-colors py-2"
                        >
                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent transition-all">
                                <Play size={14} className="fill-current text-white group-hover:text-accent" />
                            </div>
                            <span className="text-[10px] uppercase font-mono tracking-[0.4em]">Propel Your Vision</span>
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* 5. Audio Visualization & Control */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="absolute bottom-12 right-12 z-40 flex items-center gap-6"
            >
                {!isMuted && (
                    <div className="flex items-end gap-[3px] h-6">
                        {[0.4, 1, 0.6, 0.8, 0.5, 0.9, 0.7].map((h, i) => (
                            <motion.div
                                key={i}
                                animate={{ height: ["10%", `${h * 100}%`, "10%"] }}
                                transition={{ duration: 0.5 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
                                className="w-[2px] bg-accent"
                            />
                        ))}
                    </div>
                )}

                <button
                    onClick={toggleSound}
                    className="flex flex-col items-center gap-2 group"
                >
                    <div className={`w-14 h-14 rounded-2xl border ${isMuted ? "border-white/10" : "border-accent/40 bg-accent/5"} flex items-center justify-center transition-all group-hover:scale-110`}>
                        {isMuted ? <VolumeX size={20} className="text-white/40" /> : <Volume2 size={20} className="text-accent" />}
                    </div>
                </button>
            </motion.div>

            {/* 6. Vertical Phase Ticker (Scroll Indicator) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                className="absolute left-10 bottom-0 h-44 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent flex flex-col items-center"
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
