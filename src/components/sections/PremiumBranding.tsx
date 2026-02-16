"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const projects = [
    {
        id: 1,
        title: "SnackStop",
        category: "Gourmet F&B",
        year: "2024",
        src: "/work/IMG_3588.PNG",
        description: "Redefining crunchy cravings with bold, pop-art visuals.",
        color: "#1a1a1a"
    },
    {
        id: 2,
        title: "Joyolo",
        category: "Women's Beauty",
        year: "2024",
        src: "/work/IMG_3678.PNG",
        description: "Soft, organic elegance for modern beauty rituals.",
        color: "#242424"
    },
    {
        id: 3,
        title: "Lumina",
        category: "Premium Skincare",
        year: "2025",
        src: "/work/IMG_3679.PNG",
        description: "Minimalist luxury where science meets sophistication.",
        color: "#0f0f0f"
    },
    {
        id: 4,
        title: "Bento Buds",
        category: "Chinese Cuisine",
        year: "2025",
        src: "/work/IMG_3680.PNG",
        description: "Heritage flavors remixed for a playful modern palate.",
        color: "#141414"
    },
    {
        id: 5,
        title: "Burp Up",
        category: "Beverage",
        year: "2026",
        src: "/work/IMG_3681.PNG",
        description: "Explosive energy in a can. Designed to pop globally.",
        color: "#0a0a0a"
    }
];

const Card = ({ i, project, progress, range, targetScale }: { i: number, project: any, progress: MotionValue<number>, range: number[], targetScale: number }) => {

    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [1.3, 1]); // Inner image parallax
    const cardScale = useTransform(progress, range, [1, targetScale]); // Whole card shrinking

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
            <motion.div
                style={{ scale: cardScale, top: `calc(-5vh + ${i * 25}px)` }}
                className="relative flex flex-col relative h-[60vh] md:h-[70vh] w-[90vw] md:w-[70vw] rounded-[3rem] p-10 origin-top overflow-hidden border border-white/10 shadow-2xl"
            >
                {/* Background Color/Image Base */}
                <div style={{ backgroundColor: project.color }} className="absolute inset-0 z-0" />

                {/* Image Container with Parallax */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <motion.div style={{ scale: imageScale }} className="relative w-full h-full">
                        <Image
                            fill
                            src={project.src}
                            alt={project.title}
                            className="object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                    </motion.div>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-4 md:p-8">
                    <div className="flex justify-between items-start">
                        <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                            <span className="text-white/80 text-xs font-mono uppercase tracking-widest">{project.category}</span>
                        </div>
                        <span className="text-white/40 font-mono text-xl">0{i + 1}</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <h2 className="text-6xl md:text-8xl font-serif text-white mb-4 tracking-tighter mix-blend-overlay">{project.title}</h2>
                            <p className="text-white/70 max-w-md text-lg font-light leading-relaxed">{project.description}</p>
                        </div>

                        <button className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center group hover:scale-110 transition-transform duration-300">
                            <ArrowUpRight className="w-8 h-8 group-hover:rotate-45 transition-transform duration-300" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default function PremiumBranding() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <section className="bg-[#050505] relative w-full pt-20">

            {/* Header */}
            <div className="container mx-auto px-6 mb-20 md:mb-32">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-6xl md:text-[10rem] font-serif text-white/10 leading-[0.8] tracking-tighter select-none text-center"
                >
                    SELECTED
                </motion.h2>
                <div className="flex justify-center -mt-8 md:-mt-20 relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-7xl font-serif text-white tracking-tight"
                    >
                        Portfolio <span className="text-accent italic">24-26</span>
                    </motion.h2>
                </div>
            </div>

            {/* Sticky Cards Container */}
            <div ref={container} className="w-full relative px-4">
                {projects.map((project, i) => {
                    // Dynamic scaling calculation
                    const targetScale = 1 - ((projects.length - i) * 0.05);
                    return <Card key={project.id} i={i} project={project} progress={scrollYProgress} range={[i * 0.25, 1]} targetScale={targetScale} />
                })}
            </div>

            {/* Footer Spacer */}
            <div className="h-[20vh] w-full flex items-center justify-center">
                <span className="text-white/20 font-mono text-xs tracking-[0.5em] uppercase">End of Selection</span>
            </div>

        </section>
    );
}
