"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    rotation: number;
    type: 'smoke' | 'sparkle' | 'lightning';
}

export default function Cursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const lastParticleTime = useRef(0);
    const particleIdCounter = useRef(0);

    // Detect touch device
    useEffect(() => {
        const checkTouch = () => {
            setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
        };
        checkTouch();
    }, []);

    // Don't render cursor on touch devices
    if (isTouchDevice) return null;

    // Liquid Smooth Spring Physics
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 35, stiffness: 1200, mass: 0.1 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Particle Logic - Optimized Frequency
            const now = Date.now();
            if (now - lastParticleTime.current > 50) {
                lastParticleTime.current = now;
                const rand = Math.random();
                let type: 'smoke' | 'sparkle' | 'lightning' = 'smoke';

                if (rand > 0.95) type = 'lightning';
                else if (rand > 0.7) type = 'sparkle';
                else type = 'smoke';

                const newParticle: Particle = {
                    id: particleIdCounter.current++,
                    x: e.clientX,
                    y: e.clientY,
                    size: type === 'lightning' ? Math.random() * 12 + 8 : (type === 'sparkle' ? Math.random() * 3 + 1 : Math.random() * 8 + 4),
                    rotation: Math.random() * 360,
                    type: type
                };
                setParticles((prev) => [...prev.slice(-15), newParticle]);
            }

            // Hover Check
            const target = e.target as HTMLElement;
            const isClickable = target.closest('a, button, [role="button"], .group');
            setIsHovering(!!isClickable);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Cleanup old particles
    useEffect(() => {
        const cleanupInterval = setInterval(() => {
            if (particles.length > 0) {
                setParticles((prev) => prev.slice(1));
            }
        }, 60);

        return () => clearInterval(cleanupInterval);
    }, [particles.length]);

    return (
        <>
            {/* 1. PRIMARY SPOTLIGHT - Micro-Dot Size */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-accent rounded-full pointer-events-none z-[10001] mix-blend-exclusion shadow-[0_0_20px_rgba(172,200,162,0.5)]"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 1.8 : 1,
                }}
            />

            {/* 2. PARTICLE ENGINE - Subtler Trail */}
            <AnimatePresence>
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        initial={{ opacity: 0.4, scale: 0.5 }}
                        animate={{
                            opacity: 0,
                            scale: particle.type === 'smoke' ? 2 : 1,
                            y: particle.y - 80,
                            x: particle.x + (Math.random() * 40 - 20),
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="fixed pointer-events-none z-[9999]"
                        style={{
                            left: particle.x,
                            top: particle.y,
                            width: particle.size,
                            height: particle.size,
                            backgroundColor: particle.type === 'sparkle' ? '#FFF' : '#ACC8A2',
                            boxShadow: `0 0 10px ${particle.type === 'sparkle' ? '#FFF' : '#ACC8A2'}`,
                            borderRadius: particle.type === 'lightning' ? '0%' : '50%',
                            filter: particle.type === 'smoke' ? 'blur(4px)' : 'none',
                        }}
                    >
                        {particle.type === 'lightning' && (
                            <svg viewBox="0 0 24 24" fill="white" className="w-full h-full text-accent opacity-40">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                            </svg>
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
        </>
    );
}
