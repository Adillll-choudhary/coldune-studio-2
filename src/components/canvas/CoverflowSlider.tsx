"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { Play, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX, Maximize2, Sparkles, MapPin, Cloudy, Wind } from "lucide-react";

// --- Project Data ---
const projects = [
    { id: 1, file: "website 1.png", type: "image", title: "Neo-Platform", location: "San Francisco", temp: "72°", distance: "2.4km", category: "Identity", brand: "Nebula" },
    { id: 2, file: "website 2.png", type: "image", title: "Creative Engine", location: "New York", temp: "65°", distance: "12km", category: "Website", brand: "Axis" },
    { id: 3, file: "clothes.png", type: "image", title: "Culture Thread", location: "Tokyo", temp: "58°", distance: "8.1km", category: "Fashion", brand: "Vertex" },
    { id: 4, file: "frasurbane.png", type: "image", title: "Future Retro", location: "Berlin", temp: "45°", distance: "5km", category: "Design", brand: "Aura" },
    { id: 5, file: "russian.png", type: "image", title: "Visual Narrative", location: "Moscow", temp: "30°", distance: "15km", category: "Editorial", brand: "Slate" },
    { id: 6, file: "kim.png", type: "image", title: "Elite Identity", location: "Paris", temp: "62°", distance: "3.2km", category: "Luxury", brand: "Elysium" },
    { id: 7, file: "cleanpure.png", type: "image", title: "Purity Flow", location: "Seoul", temp: "55°", distance: "1.1km", category: "SaaS", brand: "CleanPure" },
    { id: 8, file: "portfolio-2.mov", type: "video", title: "Cinematic Motion", location: "Los Angeles", temp: "78°", distance: "0km", category: "Showreel", brand: "Coldune" },
    { id: 9, file: "vision.png", type: "image", title: "Strategic Roadmap", location: "London", temp: "50°", distance: "6km", category: "Strategy", brand: "Horizon" },
    { id: 10, file: "roll.png", type: "image", title: "Analog Soul", location: "Kyoto", temp: "60°", distance: "9km", category: "Art", brand: "Grain" },
    { id: 11, file: "sparkk.png", type: "image", title: "Interface Zero", location: "Silicon Valley", temp: "70°", distance: "4km", category: "UI/UX", brand: "Sparkk" },
    { id: 12, file: "sanstorm.png", type: "image", title: "Visual Vengeance", location: "Dubai", temp: "85°", distance: "7km", category: "Visuals", brand: "Storm" },
    { id: 13, file: "1989.png", type: "image", title: "Legacy Codex", location: "Rome", temp: "68°", distance: "10km", category: "Archival", brand: "Vintage" },
    { id: 14, file: "doap.png", type: "image", title: "Content Core", location: "Amsterdam", temp: "52°", distance: "3km", category: "Content", brand: "Doap" },
    { id: 15, file: "shoes.mov", type: "video", title: "Kinetic Form", location: "Portland", temp: "59°", distance: "11km", category: "Commerce", brand: "Stride" },
    { id: 16, file: "timeline-1.mov", type: "video", title: "Editor's Cut", location: "Vancouver", temp: "48°", distance: "14km", category: "Motion", brand: "Prime" },
];

export default function CoverflowSlider({ onSlideChange }: { onSlideChange?: (index: number) => void }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    // Mobile Detection
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        onSlideChange?.(activeIndex);
    }, [activeIndex, onSlideChange]);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
            setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
        } else if (e.key === "ArrowRight") {
            setActiveIndex((prev) => (prev + 1) % projects.length);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Center the active card
    const getCardStyle = (index: number) => {
        const offset = index - activeIndex;
        const absOffset = Math.abs(offset);
        const isActive = offset === 0;

        // Visual Parameters matching "Vision Pro" Aesthetic - Tighter Stacking
        let translateX = offset * 140; // Reduced significantly to force overlap
        if (absOffset > 2) translateX = offset * 110;

        const translateZ = isActive ? 0 : -absOffset * 80; // Flatten the Z depth differences so side cards aren't too far back
        const rotateY = isActive ? 0 : offset * -35; // Stronger angle to show "spine" of side cards
        const scale = isActive ? 1.0 : Math.max(0.7, 1 - absOffset * 0.1);
        const opacity = isActive ? 1 : Math.max(0.6, 1 - absOffset * 0.1); // Keep high opacity
        // Reduced blur on mobile
        const blur = isActive ? 0 : (isMobile ? absOffset * 0.5 : absOffset * 1);
        const brightness = isActive ? 1.0 : Math.max(0.5, 0.8 - absOffset * 0.1);

        return {
            x: translateX,
            z: translateZ,
            rotateY,
            scale,
            opacity,
            filter: `blur(${blur}px) brightness(${brightness})`,
            zIndex: 100 - absOffset
        };
    };

    return (
        <div className="relative w-full h-[800px] flex flex-col items-center justify-center overflow-visible">

            {/* Main Stage */}
            <div className="relative w-full max-w-[1400px] h-[600px] flex items-center justify-center perspective-[1200px] overflow-visible">
                <div className="relative w-full h-full flex items-center justify-center transform-style-3d">
                    {projects.map((project, index) => {
                        const style = getCardStyle(index);
                        const isVisible = Math.abs(index - activeIndex) <= (isMobile ? 1 : 3); // Reduce range for performance

                        if (!isVisible) return null;

                        return (
                            <motion.div
                                key={project.id}
                                className="absolute cursor-pointer will-change-transform"
                                initial={style}
                                animate={style}
                                transition={{ type: "spring", stiffness: 120, damping: 20, mass: 1 }}
                                onClick={() => setActiveIndex(index)}
                                style={{
                                    transformStyle: "preserve-3d",
                                }}
                            >
                                {/* Card Container - Vision Glass Style - Simplified for Mobile */}
                                <div className={`relative w-[280px] md:w-[320px] h-[420px] md:h-[480px] rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 ${isMobile ? '' : 'backdrop-blur-2xl'} shadow-[0_20px_50px_rgba(0,0,0,0.5)] group transform-gpu`}>

                                    {/* Glass Reflection/Sheen */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50 z-20 pointer-events-none" />

                                    {/* Image */}
                                    <div className="absolute inset-0 z-0">
                                        {project.type === "video" ? (
                                            <video
                                                ref={(el) => { videoRefs.current[index] = el; }}
                                                src={`/work/${project.file}`}
                                                className={`w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 ${activeIndex !== index ? 'brightness-75' : ''}`}
                                                muted
                                                loop
                                                playsInline
                                                autoPlay={activeIndex === index} // Only autoplay active
                                                preload={Math.abs(index - activeIndex) <= 1 ? "auto" : "none"}
                                                onError={(e) => {
                                                    console.error("Video load failed", project.file);
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                            />
                                        ) : (
                                            <Image
                                                src={`/work/${project.file}`}
                                                alt={project.title}
                                                fill
                                                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                            />
                                        )}
                                    </div>

                                    {/* Vignette */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 z-10" />

                                    {/* Content Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 z-30 flex flex-col items-center text-center">
                                        <h3 className="text-2xl font-serif font-bold text-white drop-shadow-lg mb-1">{project.title}</h3>
                                        <p className="text-xs font-mono text-white/60 tracking-widest uppercase">{project.location}</p>
                                    </div>

                                    {/* Top Tags - Glass Pills */}
                                    <div className="absolute top-4 right-4 z-30">
                                        <div className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-mono text-white/80">
                                            1 / 20
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Floating Menu - Vision Style */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-10 flex items-center gap-4 z-50 pointer-events-auto"
            >
                {/* Control Pills */}
                <div className="flex items-center gap-2 p-1.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                        <MapPin size={14} className="text-accent group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-mono text-white/80">{projects[activeIndex].distance}</span>
                    </div>
                    <div className="w-[1px] h-4 bg-white/10" />
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                        <Wind size={14} className="text-blue-400 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-mono text-white/80">{projects[activeIndex].temp}</span>
                    </div>
                    <div className="w-[1px] h-4 bg-white/10" />
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                        <Cloudy size={14} className="text-white/60 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-mono text-white/80">Clear</span>
                    </div>
                </div>

                {/* Navigation Pills */}
                <div className="flex items-center gap-2 p-1.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl ml-4">
                    <button
                        onClick={() => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)}
                        className="p-3 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={() => setActiveIndex((prev) => (prev + 1) % projects.length)}
                        className="p-3 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
