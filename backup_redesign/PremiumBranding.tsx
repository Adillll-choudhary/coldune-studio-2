"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";

const projects = [
    {
        id: 1,
        title: "VANGUARD VISION",
        category: "Brand Identity",
        src: "/work/IMG_3588.PNG",
        alt: "Premium branding mockup",
        description: "Reimagining corporate identity with dark mode aesthetics.",
    },
    {
        id: 2,
        title: "NOIR ESSENCE",
        category: "Packaging Design",
        src: "/work/IMG_3595.PNG",
        alt: "Luxury cosmetic packaging",
        description: "Tactile packaging experiences for modern luxury.",
    },
    {
        id: 3,
        title: "AETHER FLUX",
        category: "Visual System",
        src: "/work/IMG_3602.PNG",
        alt: "Abstract digital art",
        description: "Dynamically generated visual systems.",
    },
    {
        id: 4,
        title: "OBSIDIAN REALM",
        category: "Art Direction",
        src: "/work/IMG_3613.PNG",
        alt: "High-contrast photography",
        description: "Cinematic art direction for fashion editorial.",
    },
    {
        id: 5,
        title: "CHRONOS ELITE",
        category: "Digital Experience",
        src: "/work/IMG_3622.PNG",
        alt: "Futuristic watch interface",
        description: "Interface design for next-gen wearable tech.",
    },
];

const Card = ({ project, index }: { project: typeof projects[0], index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 100, rotate: index % 2 === 0 ? -5 : 5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                type: "spring",
                stiffness: 50,
                damping: 15,
                delay: index * 0.15
            }}
            whileHover={{
                scale: 1.02,
                rotate: index % 2 === 0 ? 1 : -1,
                transition: { type: "spring", stiffness: 400, damping: 25 }
            }}
            className="relative mb-12 break-inside-avoid group"
        >
            <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl">
                {/* Image - Natural Aspect Ratio */}
                <div className="relative w-full">
                    <Image
                        src={project.src}
                        alt={project.alt}
                        width={800}
                        height={1000} // Aspect ratio will be maintained by CSS
                        className="w-full h-auto object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                {/* Floating Badge */}
                <motion.div
                    className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0"
                >
                    <span className="text-[10px] text-accent font-mono uppercase tracking-wider flex items-center gap-2">
                        <Sparkles size={10} className="text-accent" />
                        {project.category}
                    </span>
                </motion.div>

                {/* Content Overlay - Always visible but enhanced on hover */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent pt-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-serif text-white mb-1">{project.title}</h3>
                    <p className="text-zinc-400 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {project.description}
                    </p>
                </div>
            </div>

            {/* Playful Cursor Follower Effect (CSS only for perf) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        </motion.div>
    );
};

export default function PremiumBranding() {
    const containerRef = useRef(null);

    return (
        <section ref={containerRef} className="relative w-full py-32 bg-[#050505] overflow-hidden">
            {/* Playful Background Mesh */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-purple-900/30 rounded-full blur-[120px] mix-blend-screen animate-blob" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/30 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-2000" />
                <div className="absolute top-[40%] left-[30%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[80px] mix-blend-screen animate-blob animation-delay-4000" />
            </div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Header Section */}
                <div className="mb-24 text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
                    >
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-accent font-mono text-[10px] tracking-[0.3em] uppercase">Showcase 2026</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-5xl md:text-8xl font-serif text-white leading-[0.9] tracking-tighter mb-8"
                    >
                        Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500 italic">Works.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light"
                    >
                        A curated collection of digital artifacts, branding systems, and visual experiments designed to provoke and inspire.
                    </motion.p>
                </div>

                {/* Dynamic Masonry Grid - using CSS Columns */}
                <div className="columns-1 md:columns-2 gap-12 space-y-12">
                    {projects.map((project, index) => (
                        <Card key={project.id} project={project} index={index} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-32 flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="group relative px-10 py-5 bg-white text-black rounded-full overflow-hidden font-bold tracking-wide shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] transition-shadow duration-300"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            VIEW FULL ARCHIVE
                            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </span>
                    </motion.button>
                </div>

            </div>
        </section>
    );
}
