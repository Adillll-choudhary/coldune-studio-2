"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [isLoadDone, setIsLoadDone] = useState(false);
    const [particles, setParticles] = useState<{ x: number, y: number, opacity: number, scale: number, duration: number }[]>([]);

    // Synthetic Shutter Sound Effect (Web Audio API)
    const playShutterSound = () => {
        try {
            const context = new (window.AudioContext || (window as any).webkitAudioContext)();
            const masterGain = context.createGain();
            masterGain.connect(context.destination);

            // 1. Technical 'Whoosh' (White Noise Sweep)
            const bufferSize = context.sampleRate * 1.5;
            const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            const noise = context.createBufferSource();
            noise.buffer = buffer;

            const filter = context.createBiquadFilter();
            filter.type = "lowpass";
            filter.frequency.setValueAtTime(100, context.currentTime);
            filter.frequency.exponentialRampToValueAtTime(10000, context.currentTime + 1.2);

            const noiseGain = context.createGain();
            noiseGain.gain.setValueAtTime(0, context.currentTime);
            noiseGain.gain.linearRampToValueAtTime(0.08, context.currentTime + 0.1);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 1.2);

            noise.connect(filter);
            filter.connect(noiseGain);
            noiseGain.connect(masterGain);

            // 2. Cinematic 'Clack' (Deep Sine Drop)
            const osc = context.createOscillator();
            const oscGain = context.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(150, context.currentTime);
            osc.frequency.exponentialRampToValueAtTime(40, context.currentTime + 0.8);

            oscGain.gain.setValueAtTime(0.1, context.currentTime);
            oscGain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.8);

            osc.connect(oscGain);
            oscGain.connect(masterGain);

            noise.start();
            osc.start();
            noise.stop(context.currentTime + 1.5);
            osc.stop(context.currentTime + 1.5);

            // Auto close context
            setTimeout(() => context.close(), 2000);
        } catch (e) {
            // Silently fail if blocked, prevents 'play() failed' log
        }
    };

    useEffect(() => {
        // Capture early interaction to unlock audio engine
        const unlockAudio = () => {
            if (hasInteracted) return;
            const context = new (window.AudioContext || (window as any).webkitAudioContext)();
            if (context.state === 'suspended') context.resume();
            setHasInteracted(true);
            window.removeEventListener("mousedown", unlockAudio);
            window.removeEventListener("keydown", unlockAudio);
        };
        window.addEventListener("mousedown", unlockAudio);
        window.addEventListener("keydown", unlockAudio);

        // Body Scroll Lock
        if (isLoading) {
            document.body.style.overflow = "hidden";
            document.body.style.height = "100svh";
        } else {
            document.body.style.overflow = "";
            document.body.style.height = "";
        }

        // Generate particles only on client to avoid hydration mismatch
        const newParticles = [...Array(25)].map(() => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random(),
            scale: Math.random() * 0.5 + 0.5,
            duration: Math.random() * 2 + 1
        }));
        setParticles(newParticles);

        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoadDone(true);
            setIsLoading(false);

            // Try to play shutter sound silently
            try {
                playShutterSound();
            } catch (e) { }

            window.scrollTo(0, 0);
            (window as any).preloaderDone = true;
            window.dispatchEvent(new Event('preloader-complete'));

            // Unlock scroll after shutters finish (1.5s after loading ends)
            setTimeout(() => {
                document.body.style.overflow = "";
                document.body.style.height = "";
            }, 1500);
        }, 3500);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("mousedown", unlockAudio);
            window.removeEventListener("keydown", unlockAudio);
            document.body.style.overflow = "";
            document.body.style.height = "";
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

                    {/* High-Velocity Scanning Beam */}
                    <motion.div
                        className="absolute h-[2px] w-full bg-accent z-[110] top-1/2 -translate-y-1/2 shadow-[0_0_30px_rgba(172,200,162,1)]"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        exit={{
                            scaleX: 2.5,
                            opacity: 0,
                            transition: { duration: 0.8, ease: "circIn" }
                        }}
                    />

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
                            {/* Orbiting Rings */}
                            <motion.div
                                className="absolute inset-0 rounded-full border border-white/10"
                                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div
                                className="absolute inset-4 rounded-full border border-white/20 border-t-accent/50"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div
                                className="absolute inset-16 rounded-full border border-white/5 border-b-white/30"
                                animate={{ rotate: 180 }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Core Energy */}
                            <motion.div
                                className="w-20 h-20 bg-white rounded-full blur-[50px] mix-blend-screen"
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                                <span className="text-accent font-mono text-[10px] tracking-[0.5em] animate-pulse">
                                    INITIALIZING
                                </span>
                                <span className="text-white/40 font-mono text-[8px] tracking-[0.3em] uppercase">
                                    Loading Nexus Assets...
                                </span>
                            </div>
                        </div>

                        {/* Progress Bar & Data */}
                        <div className="absolute bottom-20 w-full max-w-md px-10 flex flex-col gap-4">
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-[10px] text-white/50 font-sans tracking-[0.4em] animate-pulse font-medium uppercase mb-4">
                                    [ WEAR HEADPHONES FOR BETTER EXPERIENCE ]
                                </span>
                                <div className="flex justify-between w-full text-[10px] font-sans font-medium text-white/60 uppercase tracking-widest">
                                    <span>System Check</span>
                                    <motion.span
                                        animate={{ opacity: [1, 0.5, 1] }}
                                        transition={{ repeat: Infinity, duration: 0.5 }}
                                    >
                                        OK
                                    </motion.span>
                                </div>
                            </div>

                            <div className="h-[1px] w-full bg-white/10 relative overflow-hidden">
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-accent shadow-[0_0_10px_rgba(172,200,162,0.8)]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 3, ease: "easeInOut" }}
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
