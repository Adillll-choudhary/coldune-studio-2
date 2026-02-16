"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import CoverflowSlider from "@/components/canvas/CoverflowSlider";
import { Sparkles } from "lucide-react";

// Background colors for each slide - refined for depth
const slideBackgrounds = [
    "from-[#0F172A] via-[#0B0D10]", // Website 1
    "from-[#1E1B4B] via-[#0B0D10]", // Website 2
    "from-[#2C1810] via-[#0B0D10]", // Clothes
    "from-[#1A2517] via-[#0B0D10]", // Frasurbane
    "from-[#3A2F1F] via-[#0B0D10]", // Russian
    "from-[#1F2937] via-[#0B0D10]", // Kim
    "from-[#312E81] via-[#0B0D10]", // CleanPure
    "from-[#4C1D95] via-[#0B0D10]", // Showreel
    "from-[#1E3A8A] via-[#0B0D10]", // Vision
    "from-[#BE123C] via-[#0B0D10]", // Roll
    "from-[#BE185D] via-[#0B0D10]", // Sparkk
    "from-[#065F46] via-[#0B0D10]", // Sanstorm
    "from-[#92400E] via-[#0B0D10]", // 1989
    "from-[#1C1917] via-[#0B0D10]", // Doap
    "from-[#CA8A04] via-[#0B0D10]", // Shoes
    "from-[#EA580C] via-[#0B0D10]", // Timeline
];

export default function Work() {
    const [activeSlide, setActiveSlide] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const rotateHeading = useTransform(scrollYProgress, [0, 1], [5, -5]);
    const opacityHeading = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section
            id="work"
            ref={containerRef}
            className="relative py-44 min-h-screen overflow-hidden flex flex-col items-center justify-center bg-[#08090B]"
        >
            {/* 1. Atmospheric Background Engine */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className={`absolute inset-0 bg-gradient-to-br ${slideBackgrounds[activeSlide]} to-transparent pointer-events-none blur-[150px] mix-blend-screen`}
                />
            </AnimatePresence>

            {/* 2. Ghost Typography Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
                <h2 className="text-[35vw] font-serif font-black tracking-tighter uppercase leading-none transform -rotate-12 translate-y-20">
                    Works
                </h2>
            </div>

            {/* 3. Section Header - Reimagined */}
            <div className="container mx-auto px-6 relative z-30 mb-20">
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        style={{ rotateX: rotateHeading, opacity: opacityHeading }}
                        className="space-y-6 max-w-4xl"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-4 px-6 py-2.5 rounded-2xl border border-accent/20 bg-accent/5 text-accent font-mono text-[9px] tracking-[0.5em] uppercase mb-8"
                        >
                            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                            Curated Selection // Vol. 01
                        </motion.div>

                        <h2 className="text-7xl md:text-[10vw] font-serif font-bold text-white leading-[0.85] tracking-tighter">
                            Creative <br />
                            <span className="text-accent italic">Archive</span>
                        </h2>

                        <p className="text-lg md:text-xl text-text-secondary font-light max-w-xl mx-auto leading-relaxed mt-10">
                            A showcase of digital products, visual narratives, and brand architectures that define digital authority.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* 4. Coverflow Carousel Container - Elevated with Glow */}
            <div className="relative w-full z-20 overflow-visible py-10">
                {/* 3D Coverflow Slider */}
                <CoverflowSlider onSlideChange={setActiveSlide} />

                {/* Decorative Side Glows */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
            </div>

            {/* 5. Navigation Hint / CTA */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="relative z-30 mt-20 flex flex-col items-center gap-8"
            >
                <button className="group relative px-12 py-5 rounded-full overflow-hidden transition-all active:scale-95">
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all" />
                    <div className="relative flex items-center gap-3 text-white font-bold tracking-[0.2em] text-xs uppercase">
                        Explore Full Library
                        <div className="w-8 h-[1px] bg-accent group-hover:w-12 transition-all" />
                    </div>
                </button>
                <div className="text-[10px] font-mono text-text-secondary uppercase tracking-[1em] opacity-40">
                    Scroll to explore
                </div>
            </motion.div>
        </section>
    );
}
