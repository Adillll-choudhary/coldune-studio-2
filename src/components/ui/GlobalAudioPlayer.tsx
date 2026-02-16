"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalAudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [userManuallyPaused, setUserManuallyPaused] = useState(false);
    const [isHeroVisible, setIsHeroVisible] = useState(true);
    const [isAudioSupported, setIsAudioSupported] = useState(true);

    // Initial Setup
    useEffect(() => {
        try {
            audioRef.current = new Audio("/audio/scifi_theme.mp3");
            audioRef.current.loop = true;
            audioRef.current.volume = 0.5;

            if (audioRef.current.canPlayType("audio/mpeg") === "") {
                setIsAudioSupported(false);
            }

            audioRef.current.addEventListener('error', () => setIsAudioSupported(false));

            // Try initial autoplay
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                }).catch(() => {
                    // Autoplay blocked, wait for interaction
                    console.log("Autoplay blocked");
                });
            }

        } catch (e) {
            setIsAudioSupported(false);
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // Scroll Listener for "Hero Audio" behavior
    useEffect(() => {
        const handleScroll = () => {
            const heroThreshold = window.innerHeight * 0.9;
            const isVisible = window.scrollY < heroThreshold;
            setIsHeroVisible(isVisible);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Manage Playback State based on Visibility & User Preference
    useEffect(() => {
        if (!audioRef.current || !isAudioSupported) return;

        if (isHeroVisible && !userManuallyPaused) {
            // Should be playing
            if (!isPlaying) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => setIsPlaying(true)).catch(() => { });
                }
            }
        } else {
            // Should be paused
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        }
    }, [isHeroVisible, userManuallyPaused, isAudioSupported]);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (!audioRef.current || !isAudioSupported) return;

        if (isPlaying) {
            setUserManuallyPaused(true);
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            setUserManuallyPaused(false);
            if (isHeroVisible) {
                audioRef.current.play().catch(() => { });
                setIsPlaying(true);
            } else {
                // If user clicks play while scrolled away, scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    // Global Interaction Fallback
    useEffect(() => {
        const handleInteraction = () => {
            if (isHeroVisible && !userManuallyPaused && audioRef.current && audioRef.current.paused) {
                audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
            }
        };

        window.addEventListener('click', handleInteraction, { once: true });
        return () => window.removeEventListener('click', handleInteraction);
    }, [isHeroVisible, userManuallyPaused]);

    const [hovered, setHovered] = useState(false);

    // if (!isAudioSupported) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: isHeroVisible ? 1 : 0,
                    scale: isHeroVisible ? 1 : 0.8,
                    pointerEvents: isHeroVisible ? 'auto' : 'none'
                }}
                className="fixed bottom-8 left-8 z-[100]"
            >
                <div className="relative">
                    <motion.button
                        onClick={togglePlay}
                        onHoverStart={() => setHovered(true)}
                        onHoverEnd={() => setHovered(false)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.3)] overflow-hidden cursor-pointer"
                        aria-label={isPlaying ? "Mute" : "Unmute"}
                    >
                        {/* Static/CSS Animated Visualizer to reduce JS load */}
                        {isPlaying ? (
                            <div className="flex items-center gap-[3px] h-4">
                                <div className="w-[2px] h-3 bg-accent animate-pulse"></div>
                                <div className="w-[2px] h-5 bg-accent animate-pulse delay-75"></div>
                                <div className="w-[2px] h-2 bg-accent animate-pulse delay-150"></div>
                                <div className="w-[2px] h-4 bg-accent animate-pulse delay-100"></div>
                            </div>
                        ) : (
                            <div className="w-2 h-2 rounded-sm bg-white/50" />
                        )}

                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                    </motion.button>

                    {/* Tooltip */}
                    <div className={`absolute left-16 top-1/2 -translate-y-1/2 ml-2 transition-all duration-300 ${hovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
                        <div className="bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg shadow-xl">
                            <span className="text-[10px] font-mono tracking-widest uppercase text-white/90">
                                {isPlaying ? "Sound On" : "Sound Off"}
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
