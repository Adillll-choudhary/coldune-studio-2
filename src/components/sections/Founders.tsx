"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Sparkles, Quote, Instagram, Linkedin, Twitter, Users } from "lucide-react";
import { usePerformance } from "@/hooks/usePerformance";

const founders = [
    {
        name: "Jamal Adil",
        role: "Founder & Visionary",
        age: 19,
        image: "/founders/adil%20founder.PNG",
        badge: "The Visionary",
        bio: [
            <span key="1">At just 19 years old, <span className="text-3xl font-serif font-bold text-accent">J</span>amal Adil represents the new generation of creative entrepreneurs.</span>,
            <span key="2">Col<span className="text-3xl font-serif font-bold text-accent">d</span>une Studio was born from a dream where creativity meets professionalism.</span>,
            <span key="3">In every project, his v<span className="text-3xl font-serif font-bold text-accent">i</span>sion creates a story worth telling.</span>,
            <span key="4">He is not just running a studio, he is bui<span className="text-3xl font-serif font-bold text-accent">l</span>ding a legacy.</span>
        ],
        quote: "Age is not a limitation when passion and hard work walk together.",
        signature: "Jamal Adil",
        accent: "#ACC8A2",
        socials: {
            instagram: "https://www.instagram.com/iadillchoudhary17?igsh=d212djhra3kzM2Vk&utm_source=qr",
            linkedin: "https://www.linkedin.com/in/adil-choudhary-831a7035a?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
            twitter: "#"
        }
    },
    {
        name: "Arslan",
        role: "Co-Founder & Visual Director",
        age: 19,
        image: "/founders/IMG_3498.PNG",
        badge: "The Visual Maestro",
        bio: [
            <span key="1"><span className="text-3xl font-serif font-bold text-accent">A</span>rslan is a highly skilled creative professional specializing in visual production.</span>,
            <span key="2">Raw cinematic moments a<span className="text-3xl font-serif font-bold text-accent">r</span>e his expertise, communicating emotion in every frame.</span>,
            <span key="3">With a <span className="text-3xl font-serif font-bold text-accent">s</span>oulful approach, he commands cameras with instinctive precision.</span>,
            <span key="4">Contro<span className="text-3xl font-serif font-bold text-accent">l</span>ling light and shadow to deliver maximum impact.</span>,
            <span key="5"><span className="text-3xl font-serif font-bold text-accent">A</span>rtistry is his language, speaking fluently through every edit.</span>,
            <span key="6">Defined by u<span className="text-3xl font-serif font-bold text-accent">n</span>seen details and a relentless pursuit of perfection.</span>
        ],
        quote: "Every frame tells a story, every story deserves perfection.",
        signature: "Arslan",
        accent: "#EDEFF2",
        socials: {
            instagram: "https://www.instagram.com/_arshlan_18?igsh=M205ZGc2aHBxY2F0",
            linkedin: "https://www.linkedin.com/in/adil-choudhary-831a7035a?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
            twitter: "#"
        }
    }
];

function FounderCard({ founder, index, isMobile }: { founder: typeof founders[0], index: number, isMobile: boolean }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Parallax Physics
    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);
    const rotateX = useSpring(useTransform(y, [0, 1], [isMobile ? 0 : 10, isMobile ? 0 : -10]), { stiffness: 100, damping: 30 });
    const rotateY = useSpring(useTransform(x, [0, 1], [isMobile ? 0 : -10, isMobile ? 0 : 10]), { stiffness: 100, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width);
        y.set((e.clientY - rect.top) / rect.height);
    };

    return (
        <div
            className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 min-h-[80vh] py-20 ${index % 2 === 0 ? "" : "lg:flex-row-reverse"}`}
        >
            {/* Image Section with 3D Depth */}
            <motion.div
                ref={cardRef}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => { x.set(0.5); y.set(0.5); setIsHovered(false); }}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="w-full lg:w-1/2 relative group"
            >
                <div className="relative aspect-[4/5] w-full max-w-xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 bg-[#14171C]">
                    <Image
                        src={founder.image}
                        alt={founder.name}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        quality={100}
                        priority={index === 0}
                    />

                    {/* Atmospheric Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-transparent opacity-80" />

                    {/* Scanline Effect - Disable on mobile */}
                    {!isMobile && (
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03] animate-pulse">
                            <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
                        </div>
                    )}

                    {/* Age Badge */}
                    <motion.div
                        style={{ transform: "translateZ(120px)" }}
                        className="absolute bottom-10 left-10 p-7 bg-accent text-black rounded-3xl shadow-[0_20px_40px_rgba(172,200,162,0.4)]"
                    >
                        <p className="font-mono text-[9px] font-black uppercase tracking-[0.4em] mb-1.5 opacity-60">Established</p>
                        <p className="text-4xl font-serif font-bold leading-none">{founder.age}</p>
                        <p className="text-[9px] font-bold opacity-60 uppercase tracking-widest mt-1">Years of Vision</p>
                    </motion.div>
                </div>

                {/* Decorative Layers */}
                <div className="absolute -inset-10 bg-accent/20 blur-[120px] rounded-full -z-10 opacity-0 group-hover:opacity-30 transition-opacity duration-1000" />
            </motion.div>

            {/* Content Section */}
            <div className={`w-full lg:w-1/2 space-y-12 ${index % 2 === 0 ? "text-left" : "text-left lg:text-right"}`}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <div className={`flex items-center gap-4 ${index % 2 === 0 ? "justify-start" : "justify-start lg:justify-end"}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                        <span className="text-accent font-mono text-[10px] tracking-[0.6em] uppercase font-bold">{founder.badge}</span>
                    </div>

                    <h2 className="text-6xl md:text-9xl font-serif font-bold text-white tracking-tighter leading-[0.85]">
                        {founder.name} <br />
                        <span className="text-accent italic font-light">{founder.role.split("&")[1]?.trim() || founder.role}</span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className={`space-y-6 max-w-xl ${index % 2 === 0 ? "" : "lg:ml-auto"}`}
                >
                    {founder.bio.map((p, i) => (
                        <p key={i} className="text-lg text-text-secondary font-light leading-relaxed">
                            {p}
                        </p>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className={`relative p-12 bg-white/[0.01] border border-white/5 rounded-[3.5rem] group overflow-hidden ${isMobile ? 'bg-black/40' : 'backdrop-blur-3xl'}`}
                >
                    <div className="absolute top-8 left-8 opacity-10 text-accent">
                        <Quote size={48} strokeWidth={1} />
                    </div>
                    <p className="text-2xl md:text-3xl font-serif text-white italic leading-tight relative z-10 pr-10">
                        "{founder.quote}"
                    </p>
                    <div className={`mt-10 flex items-center gap-4 relative z-10 ${index % 2 === 0 ? "" : "lg:justify-end"}`}>
                        <div className="h-[1px] w-12 bg-accent/40" />
                        <span className="font-mono text-[10px] text-accent tracking-[0.4em] uppercase font-bold">Coldune_Auth // {founder.name}</span>
                    </div>
                </motion.div>

                {/* Social Links */}
                <div className={`flex gap-8 ${index % 2 === 0 ? "justify-start" : "justify-start lg:justify-end"}`}>
                    {[
                        { Icon: Instagram, href: founder.socials.instagram },
                        { Icon: Linkedin, href: founder.socials.linkedin },
                        { Icon: Twitter, href: founder.socials.twitter }
                    ].map(({ Icon, href }, i) => (
                        <motion.a
                            key={i}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, color: "#ACC8A2", rotate: 5 }}
                            className="text-white/20 transition-all duration-300"
                        >
                            <Icon size={24} strokeWidth={1.5} />
                        </motion.a>
                    ))}
                </div>
            </div >
        </div >
    );
}


export default function Founders() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { isMobile } = usePerformance();

    return (
        <section id="founders" ref={containerRef} className="relative bg-[#08090B] overflow-hidden">
            {/* Ghost Background Engine */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none pointer-events-none">
                <h2 className="text-[35vw] font-serif font-black tracking-tighter uppercase leading-none transform -rotate-6 translate-y-40">
                    Legacy
                </h2>
            </div>

            {/* Cinematic Background Engine */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-[800px] bg-gradient-to-b from-accent/5 to-transparent opacity-40" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[80%] h-[80%] bg-accent/5 blur-[200px] rounded-full opacity-30" />

                {/* Tactical Vertical Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block" />
            </div>

            <div className="container mx-auto px-6 relative z-10 pt-24 md:pt-44">
                <div className="max-w-4xl mb-24 md:mb-40">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-10"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent font-mono text-[9px] tracking-[0.5em] uppercase font-bold">
                            The Human Engine // Founders
                        </span>
                        <h2 className="text-7xl md:text-[10vw] font-serif font-bold text-white leading-[0.85] tracking-tighter">
                            Architects of <br />
                            <span className="text-accent italic">Excellence</span>
                        </h2>
                        <p className="text-xl text-text-secondary max-w-xl font-light leading-relaxed border-l-2 border-accent/30 pl-8">
                            Meet the visionaries behind Coldune Studio. A blend of raw passion, technical mastery, and unyielding ambition.
                        </p>
                    </motion.div>
                </div>

                <div className="space-y-32 md:space-y-60 pb-24 md:pb-44">
                    {founders.map((founder, index) => (
                        <FounderCard key={founder.name} founder={founder} index={index} isMobile={isMobile} />
                    ))}
                </div>

                {/* Bottom Impact Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="pt-40 border-t border-white/5 flex flex-col items-center text-center gap-16 pb-44"
                >
                    <div className="space-y-6">
                        <h3 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tighter">
                            A Collective <span className="text-accent italic">Vision</span>
                        </h3>
                        <p className="text-xl text-text-secondary max-w-2xl mx-auto font-light leading-relaxed">
                            We don't just build brands. We build relationships based on trust, transparency, and a relentless pursuit of the extraordinary.
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-6">
                        <div className="flex -space-x-6">
                            <div className="w-20 h-20 rounded-full border-4 border-[#08090B] bg-accent/20 overflow-hidden relative">
                                <Image src="/founders/IMG_3694.PNG" alt="Jamal Adil" fill className="object-cover" />
                            </div>
                            <div className="w-20 h-20 rounded-full border-4 border-[#08090B] bg-white/10 overflow-hidden relative">
                                <Image src="/founders/IMG_3498.PNG" alt="Arslan" fill className="object-cover" />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="h-[1px] w-24 bg-white/10" />
                            <Sparkles size={24} className="text-accent" />
                            <div className="h-[1px] w-24 bg-white/10" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
