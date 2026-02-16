"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
    Megaphone, Video as VideoIcon, PenTool, Music, Cpu, Globe,
    Layout, Share2, TrendingUp, Smartphone, Server,
    Users, Camera, Shirt, Image as ImageIcon, MessageSquare,
    Palette, Code2, LineChart, Zap, Sparkles, Orbit
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

// --- Service Data ---
const creativeServices = [
    { name: "Graphic Designing", icon: PenTool, desc: "Visual storytelling that captivates." },
    { name: "Branding", icon: Globe, desc: "Identities that resonate and endure." },
    { name: "Garments Designing", icon: Shirt, desc: "Fashion-forward concepts." },
    { name: "YouTube Thumbnails", icon: ImageIcon, desc: "High-CTR graphics." },
    { name: "Posts & Creatives", icon: MessageSquare, desc: "Engaging social visuals." },
    { name: "Song Composer", icon: Music, desc: "Sonic branding landscapes." },
];

const techServices = [
    { name: "Web Designs", icon: Layout, desc: "Immersive digital experiences." },
    { name: "Mobile Apps", icon: Smartphone, desc: "iOS/Android ecosystems." },
    { name: "AI Automations", icon: Cpu, desc: "Next-gen workflow efficiency." },
    { name: "Web Hosting", icon: Server, desc: "Robust infrastructure." },
];

const growthServices = [
    { name: "Marketing Strategy", icon: Megaphone, desc: "Data-driven amplification." },
    { name: "Video Editing", icon: VideoIcon, desc: "Cinematic storytelling." },
    { name: "Social Media", icon: Share2, desc: "Community engagement." },
    { name: "SEO Growth", icon: TrendingUp, desc: "Organic visibility scaling." },
    { name: "Influencer Marketing", icon: Users, desc: "Authentic brand voices." },
    { name: "Video Shoots", icon: Camera, desc: "Premium production quality." },
];

// --- Sub-Components ---

function ServiceItem({ service, index }: { service: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.6 }}
            className="group/item relative flex items-center gap-5 p-5 rounded-[1.5rem] bg-white/[0.01] border border-white/5 hover:bg-white/[0.04] hover:border-accent/40 hover:shadow-[0_15px_35px_rgba(172,200,162,0.1)] transition-all duration-500 cursor-pointer"
        >
            <div className="p-3 rounded-xl bg-accent/5 text-accent/40 group-hover/item:text-black group-hover/item:bg-accent transition-all duration-500">
                <service.icon size={20} strokeWidth={1.5} />
            </div>
            <div className="flex-1">
                <h4 className="text-[14px] font-bold text-white/90 group-hover/item:text-white transition-colors tracking-tight">
                    {service.name}
                </h4>
                <p className="text-[9px] text-text-secondary group-hover/item:text-white/60 transition-colors uppercase tracking-[0.2em] font-mono mt-1.5 opacity-60">
                    {service.desc}
                </p>
            </div>
            <motion.div
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                className="opacity-0 group-hover/item:opacity-100 transition-opacity"
            >
                <Zap size={14} className="text-accent" />
            </motion.div>
        </motion.div>
    );
}

function Pillar({ title, icon: Icon, services, ghostText, delay, accent = false }: { title: string, icon: any, services: any[], ghostText: string, delay: number, accent?: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);

    const rotateX = useSpring(useTransform(y, [0, 1], [4, -4]), { stiffness: 100, damping: 20 });
    const rotateY = useSpring(useTransform(x, [0, 1], [-4, 4]), { stiffness: 100, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width);
        y.set((e.clientY - rect.top) / rect.height);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.8 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0.5); y.set(0.5); }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative group h-full"
        >
            {/* Ghost Background Text */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 opacity-[0.02] select-none pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-700">
                <h3 className="text-[12vw] font-serif font-black uppercase tracking-tighter leading-none transform rotate-90">
                    {ghostText}
                </h3>
            </div>

            {/* Glowing Border for Accent Pillar */}
            {accent && (
                <div className="absolute -inset-[1px] bg-gradient-to-b from-accent/30 via-accent/5 to-transparent rounded-[2.5rem] opacity-50 group-hover:opacity-100 transition-opacity blur-sm" />
            )}

            {/* Pillar Body */}
            <div className="relative h-full bg-[#0E1116]/60 backdrop-blur-3xl border border-white/5 rounded-[3.5rem] p-8 md:p-12 flex flex-col hover:border-accent/30 transition-all duration-1000 overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
                {/* Dynamic Radial Highlight */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(172,200,162,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                <div className="relative z-10 flex items-center justify-between mb-14" style={{ transform: "translateZ(50px)" }}>
                    <div className="flex items-center gap-5">
                        <div className={`p-5 rounded-[1.75rem] ${accent ? "bg-accent text-black" : "bg-white/5 text-accent"} shadow-2xl`}>
                            <Icon size={28} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-4xl font-serif font-bold text-white tracking-tighter leading-none">{title}</h3>
                    </div>
                </div>

                <div className="relative z-10 grid grid-cols-1 gap-3" style={{ transform: "translateZ(20px)" }}>
                    {services.map((s, i) => (
                        <ServiceItem key={s.name} service={s} index={i} />
                    ))}
                </div>

                {/* Bottom Graphic */}
                <div className="mt-12 pt-8 border-t border-white/5 relative z-10" style={{ transform: "translateZ(40px)" }}>
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-text-secondary uppercase tracking-[0.3em]">Full Retainer Avail.</span>
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-6 h-6 rounded-full border border-white/20 bg-accent/20 flex items-center justify-center text-[8px] font-bold text-accent">
                                    {i}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function Services() {
    return (
        <section id="services" className="py-44 relative bg-[#0B0D10] overflow-hidden">
            {/* Cinematic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[180px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[140px]" />

                {/* Animated Particles */}
                <div className="absolute inset-0 opacity-[0.05]">
                    <div className="absolute h-full w-[1px] left-1/4 bg-gradient-to-b from-transparent via-white to-transparent" />
                    <div className="absolute h-full w-[1px] right-1/4 bg-gradient-to-b from-transparent via-white to-transparent" />
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-32">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent font-mono text-[10px] tracking-[0.5em] uppercase mb-4">
                                Our Engine
                            </span>
                            <h2 className="text-6xl md:text-9xl font-serif font-bold text-white leading-[0.9] tracking-tighter">
                                Core <br />
                                <span className="text-accent italic relative inline-block">
                                    Capabilities
                                    <svg className="absolute -bottom-4 left-0 w-full h-4 text-accent/20" viewBox="0 0 200 12" fill="none">
                                        <path d="M1 11C20.5 4.33333 118.6 -4.2 199 4.33333" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                                    </svg>
                                </span>
                            </h2>
                            <p className="text-xl text-text-secondary font-light leading-relaxed max-w-xl">
                                We've engineered a multi-disciplinary ecosystem to handle every facet of your brand's digital evolution.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="hidden lg:flex flex-col items-center gap-4 text-center pb-10"
                    >
                        <div className="w-24 h-24 rounded-full border border-accent/20 flex items-center justify-center relative">
                            <Orbit className="text-accent animate-spin-slow" size={40} />
                            <div className="absolute inset-0 rounded-full border border-accent/40 animate-ping" />
                        </div>
                        <span className="text-[10px] font-mono text-accent uppercase tracking-[0.4em]">Integrated Ecosystem</span>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
                    {/* Pillar 1: Creative */}
                    <Pillar
                        title="Visionary"
                        icon={Palette}
                        ghostText="CREATE"
                        services={creativeServices}
                        delay={0.1}
                    />

                    {/* Pillar 2: Tech (Center) */}
                    <Pillar
                        title="Engineering"
                        icon={Code2}
                        ghostText="BUILD"
                        services={techServices}
                        delay={0.2}
                        accent={true}
                    />

                    {/* Pillar 3: Growth */}
                    <Pillar
                        title="Velocity"
                        icon={LineChart}
                        ghostText="SCALE"
                        services={growthServices}
                        delay={0.3}
                    />
                </div>

                {/* Bottom Stats/Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 pt-20 border-t border-white/5 flex flex-wrap justify-between items-center gap-10"
                >
                    <div className="flex items-center gap-3">
                        <Sparkles className="text-accent" size={20} />
                        <span className="text-white font-bold tracking-[0.3em] uppercase text-xs">Full-Service Architecture</span>
                    </div>
                    <div className="flex gap-12">
                        <div className="space-y-1">
                            <p className="text-2xl font-serif font-bold text-white">16+</p>
                            <p className="text-[10px] text-text-secondary uppercase tracking-widest">Core Disciplines</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-2xl font-serif font-bold text-white">24/7</p>
                            <p className="text-[10px] text-text-secondary uppercase tracking-widest">Project Monitoring</p>
                        </div>
                    </div>
                </motion.div>
            </div>


        </section>
    );
}
