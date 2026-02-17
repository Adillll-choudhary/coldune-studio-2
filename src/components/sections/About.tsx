"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { usePerformance } from "@/hooks/usePerformance";

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { isMobile, isLowPower } = usePerformance();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const rotateLeft = useTransform(scrollYProgress, [0, 1], [0, -5]);
    const rotateRight = useTransform(scrollYProgress, [0, 1], [0, 5]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

    return (
        <section ref={containerRef} id="about" className="relative min-h-[150vh] py-32 flex flex-col items-center justify-center overflow-hidden bg-[#050505]">

            {/* Background Texture - Clean Void */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-black to-black opacity-40" />

            {/* TRI-MONOLITHS CONTAINER */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 relative z-10 w-full px-4">

                {/* MONOLITH 1 - Origin (Nature) */}
                <motion.div
                    style={{ scale, rotate: rotateLeft }}
                    className="relative w-[85vw] md:w-[22vw] aspect-[3/4] md:aspect-[9/16] rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(172,200,162,0.1)] group cursor-pointer"
                >
                    {!isMobile ? (
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-1000 ease-out"
                        >
                            <source src="/bg/story-forest.mp4" type="video/mp4" />
                        </video>
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-green-900/20 via-black to-black" />
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent transition-opacity duration-500" />

                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col gap-3 group-hover:-translate-y-2 transition-transform duration-500">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1 h-8 bg-accent/80" />
                            <span className="text-accent font-mono text-xs uppercase tracking-widest">Phase 01 // The Spark</span>
                        </div>
                        <p className="text-white/80 text-sm md:text-base font-light leading-relaxed">
                            A rebellion against the static. We found beauty in the chaos of code and nature.
                        </p>
                    </div>
                </motion.div>

                {/* MONOLITH 2 - Evolution (Tech) */}
                <motion.div
                    style={{ scale }}
                    className="relative w-[85vw] md:w-[22vw] aspect-[3/4] md:aspect-[9/16] rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.05)] group md:-mt-12 cursor-pointer"
                >
                    {!isMobile ? (
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-1000 ease-out brightness-125"
                        >
                            <source src="/bg/firefly.mp4" type="video/mp4" />
                        </video>
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-900/20 via-black to-black" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent transition-opacity duration-500" />

                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col gap-3 group-hover:-translate-y-2 transition-transform duration-500">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1 h-8 bg-white/80" />
                            <span className="text-white/90 font-mono text-xs uppercase tracking-widest">Phase 02 // The Forge</span>
                        </div>
                        <p className="text-white/80 text-sm md:text-base font-light leading-relaxed">
                            Forging raw potential into kinetic reality. Bridging the gap between art and engineering.
                        </p>
                    </div>
                </motion.div>

                {/* MONOLITH 3 - Ascension (Mountain/Height) */}
                <motion.div
                    style={{ scale, rotate: rotateRight }}
                    className="relative w-[85vw] md:w-[22vw] aspect-[3/4] md:aspect-[9/16] rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(172,200,162,0.1)] group cursor-pointer"
                >
                    {!isMobile ? (
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-1000 ease-out"
                        >
                            <source src="/bg/0216.mp4" type="video/mp4" />
                        </video>
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-900/20 via-black to-black" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent transition-opacity duration-500" />

                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col gap-3 group-hover:-translate-y-2 transition-transform duration-500">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1 h-8 bg-accent/80" />
                            <span className="text-accent font-mono text-xs uppercase tracking-widest">Phase 03 // The Legacy</span>
                        </div>
                        <p className="text-white/80 text-sm md:text-base font-light leading-relaxed">
                            Beyond pixels. Building digital empires that stand the test of time.
                        </p>
                    </div>
                </motion.div>

            </div>

            {/* OVERLAY TYPOGRAPHY - Centered and Breaking */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none mix-blend-difference">
                <motion.h2
                    style={{ y: yParallax }}
                    className="text-[15vw] md:text-[12vw] leading-none font-serif font-black text-white opacity-90 tracking-tighter text-center"
                >
                    THE STORY
                </motion.h2>
            </div>

            {/* NARRATIVE CONTENT - Floating Cards */}
            <div className="container mx-auto px-6 relative z-30 w-full h-full pointer-events-none">

                {/* Left Card - Philosophy */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="absolute top-[5%] left-[5%] md:top-[12%] md:left-[5%] max-w-xs pointer-events-auto"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-accent font-mono text-xs uppercase tracking-widest">Manifesto</span>
                        <div className="h-[1px] w-12 bg-accent/50" />
                    </div>
                    <p className="text-white/80 text-lg font-light leading-relaxed">
                        We don't chase trends. We hunt for the feeling that makes you stop and stare.
                    </p>
                </motion.div>

                {/* Right Card - Founders */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="absolute bottom-[5%] right-[5%] md:bottom-[12%] md:right-[5%] max-w-xs text-right pointer-events-auto"
                >
                    <div className="flex items-center justify-end gap-4 mb-4">
                        <div className="h-[1px] w-12 bg-accent/50" />
                        <span className="text-accent font-mono text-xs uppercase tracking-widest">Adil & Arslan</span>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                        <p className="text-white/80 text-lg font-light leading-relaxed">
                            Two minds. <br /> One obsessive vision.
                        </p>

                        <div className="flex -space-x-4">
                            {[
                                { src: "/founders/adil founder.PNG", alt: "Adil" },
                                { src: "/founders/IMG_3498.PNG", alt: "Arslan" }
                            ].map((founder, i) => (
                                <div key={i} className="relative w-14 h-14 rounded-full border border-white/20 overflow-hidden bg-black/50 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110 hover:z-10 cursor-pointer">
                                    <Image
                                        src={founder.src}
                                        alt={founder.alt}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

        </section>
    );
}
