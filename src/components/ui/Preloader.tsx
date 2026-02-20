"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [isLoadDone, setIsLoadDone] = useState(false);
    const [particles, setParticles] = useState<{ x: number, y: number, opacity: number, scale: number, duration: number }[]>([]);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;

        // Initialize Audio
        audioRef.current = new Audio("/audio/scifi_theme.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = isMobile ? 0.3 : 0.4;

        // Capture early interaction to unlock audio engine
        const unlockAudio = () => {
            if (hasInteracted) return;
            const context = new (window.AudioContext || (window as any).webkitAudioContext)();
            if (context.state === 'suspended') context.resume();

            if (audioRef.current) {
                audioRef.current.play().catch(() => console.log("Audio play failed"));
            }

            setHasInteracted(true);
            window.removeEventListener("mousedown", unlockAudio);
            window.removeEventListener("keydown", unlockAudio);
            window.removeEventListener("touchstart", unlockAudio);
        };

        window.addEventListener("mousedown", unlockAudio);
        window.addEventListener("keydown", unlockAudio);
        window.addEventListener("touchstart", unlockAudio);

        // Body Scroll Lock
        if (isLoading) {
            document.body.style.overflow = "hidden";
            document.body.style.height = "100svh";
        }

        // Generate particles - fewer on mobile
        const particleCount = isMobile ? 12 : 25;
        const newParticles = [...Array(particleCount)].map(() => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random(),
            scale: Math.random() * 0.5 + 0.5,
            duration: Math.random() * 2 + 1
        }));
        setParticles(newParticles);

        // Faster loading on mobile to reduce wait time
        const loadingTime = isMobile ? 2200 : 3500;
        const timer = setTimeout(() => {
            setIsLoadDone(true);
            setIsLoading(false);

            window.scrollTo(0, 0);
            (window as any).preloaderDone = true;
            window.dispatchEvent(new Event('preloader-complete'));

            // Unlock scroll after shutters finish
            setTimeout(() => {
                document.body.style.overflow = "";
                document.body.style.height = "";
            }, 1500);
        }, loadingTime);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("mousedown", unlockAudio);
            window.removeEventListener("keydown", unlockAudio);
            window.removeEventListener("touchstart", unlockAudio);
            document.body.style.overflow = "";
            document.body.style.height = "";
            // Keep audio playing into the site if needed, or pause it.
            // GlobalAudioPlayer will take over, so we should bridge or pause.
            // For now, let's pause it to prevent duplicates if GlobalAudioPlayer starts.
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [isLoading, hasInteracted, isLoadDone]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-[#030305]"
                >
                    {/* Cinematic Horizontal Shutters (Split Reveal) */}
                    <motion.div
                        className="absolute inset-x-0 top-0 z-[100] bg-[#030305] border-b border-white/5"
                        initial={{ height: "50%" }}
                        animate={{ height: "50%" }}
                        exit={{
                            height: 0,
                            transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.3 }
                        }}
                    />
                    <motion.div
                        className="absolute inset-x-0 bottom-0 z-[100] bg-[#030305] border-t border-white/5"
                        initial={{ height: "50%" }}
                        animate={{ height: "50%" }}
                        exit={{
                            height: 0,
                            transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.3 }
                        }}
                    />

                    {/* Background Video */}
                    <motion.div
                        className="absolute inset-0 z-[105] overflow-hidden"
                        exit={{ opacity: 0, transition: { duration: 0.8 } }}
                    >
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-100"
                        >
                            <source src="/bg/IMG_3736.MP4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-transparent" />
                    </motion.div>

                    {/* Entrance Flash Overlay */}
                    <motion.div
                        className="absolute inset-0 z-[120] pointer-events-none bg-white opacity-0"
                        exit={{
                            opacity: [0, 0.1, 0],
                            transition: { duration: 0.5, times: [0, 0.5, 1] }
                        }}
                    />

                    {/* Main Loading Content */}
                    <motion.div
                        className="relative z-[150] flex flex-col items-center justify-center w-full h-full"
                        exit={{
                            opacity: 0,
                            scale: 0.9,
                            y: -30,
                            filter: "blur(10px)",
                            transition: { duration: 0.7, ease: [0.32, 0, 0.67, 0] }
                        }}
                    >
                        {/* Stars / Space Dust Particles */}
                        <div className="absolute inset-0 z-0 text-white">
                            {particles.map((p, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute bg-white rounded-full"
                                    initial={{
                                        x: p.x,
                                        y: p.y,
                                        opacity: p.opacity,
                                        scale: p.scale
                                    }}
                                    animate={{
                                        y: [null, Math.random() * -100],
                                        opacity: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: p.duration,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    style={{
                                        width: Math.random() * 2 + "px",
                                        height: Math.random() * 2 + "px",
                                    }}
                                />
                            ))}
                        </div>

                        {/* Central Core - Black Hole / Portal */}
                        <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
                            {/* Minimal Branding */}
                            <motion.span
                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="text-white/20 font-mono text-[8px] tracking-[1em] uppercase"
                            >
                                Coldune Studio // 4K_Uplink
                            </motion.span>
                        </div>

                        {/* Progress Bar & Data */}
                        <div className="absolute bottom-20 w-full max-w-md px-10 flex flex-col gap-4">
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-[10px] text-white/50 font-sans tracking-[0.4em] animate-pulse font-medium uppercase mb-4">
                                    [ WEAR HEADPHONES FOR BETTER EXPERIENCE ]
                                </span>
                                <div className="flex justify-between w-full text-[10px] font-sans font-medium text-white/60 uppercase tracking-widest">
                                    <span>System Diagnostics</span>
                                    <motion.span
                                        animate={{ opacity: [1, 0.5, 1] }}
                                        transition={{ repeat: Infinity, duration: 0.5 }}
                                    >
                                        OK
                                    </motion.span>
                                </div>
                            </div>

                            <div className="h-[2px] w-full bg-white/5 relative overflow-hidden rounded-full">
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent/50 via-accent to-accent/50 shadow-[0_0_20px_rgba(172,200,162,1)]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 3.2, ease: "easeInOut" }}
                                />
                            </div>

                            <div className="flex justify-between items-center mt-1">
                                <span className="text-[10px] text-accent font-sans font-bold tracking-widest uppercase">
                                    :: Connection Established
                                </span>
                                <motion.span
                                    className="text-xs font-bold text-white font-sans"
                                >
                                    <CountUp target={100} />%
                                </motion.span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Simple counter component
function CountUp({ target }: { target: number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => {
                if (prev < target) return prev + 1;
                clearInterval(interval);
                return prev;
            })
        }, 30); // Adjust speed to match 3s total roughly

        return () => clearInterval(interval);
    }, [target]);

    return <>{count}</>;
}
