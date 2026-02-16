"use client";

import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Check, Zap, Crown, Shield, Rocket, Sparkles } from "lucide-react";
import { useRef, useState } from "react";

const plans = [
    {
        name: "Standard",
        icon: Rocket,
        price: "$1,500",
        period: "/mo",
        description: "Ideal for growing startups.",
        features: ["Standard Branding", "5 Social Posts", "Basic Web Presence", "Email Support"],
        color: "from-[#2A2E36] to-[#14171C]",
        accent: "#EDEFF2"
    },
    {
        name: "Professional",
        icon: Zap,
        price: "$3,000",
        period: "/mo",
        description: "Scale your brand velocity.",
        features: ["Full Identity System", "15 Social Posts", "Dynamic Website", "Priority Support", "SEO Basic"],
        isPopular: true,
        color: "from-[#1F291B] to-[#0F140D]",
        accent: "#ACC8A2"
    },
    {
        name: "Elite",
        icon: Crown,
        price: "$5,500",
        period: "/mo",
        description: "The complete visual engine.",
        features: ["3D Visuals & Motion", "30 Social Posts/mo", "App Development", "24/7 Priority Support", "Advanced SEO", "Video Production"],
        color: "from-[#1A2517] to-[#0B0D10]",
        accent: "#ACC8A2"
    },
    {
        name: "Extreme",
        icon: Shield,
        price: "Contact",
        period: "",
        description: "Unlimited creative power.",
        features: ["Full Agency Retainer", "Unlimited Requests", "Dedicated Team", "Global Campaigns", "AI Integration"],
        color: "from-[#08090B] to-[#000000]",
        accent: "#ACC8A2"
    }
];

function PricingCard({ plan, index }: { plan: typeof plans[0], index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

    const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    const Icon = plan.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                x.set(0);
                y.set(0);
                setIsHovered(false);
            }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={`relative group min-h-[600px] md:h-[850px] w-full perspective-2000 ${plan.isPopular ? "z-10" : "z-0"}`}
        >
            {/* Card Main Body */}
            <div
                className={`flex flex-col h-full bg-gradient-to-br ${plan.color} rounded-[3rem] md:rounded-[4rem] border border-white/5 transition-all duration-1000 
                p-8 md:p-14 md:pb-16 overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)] ${plan.isPopular ? "border-accent/40" : "hover:border-white/20"}`}
                style={{ transform: "translateZ(80px)" }}
            >
                {/* Dynamic Glare Effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ left: glareX, top: glareY, transform: "translate(-50%, -50%)", width: "250%", height: "250%" }}
                />

                {/* Tactical Grid Background */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{ backgroundImage: 'linear-gradient(rgba(172,200,162,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(172,200,162,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                {/* Popular Badge - Centered */}
                {plan.isPopular && (
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap" style={{ transform: "translateZ(120px)" }}>
                        <div className="px-6 py-2 rounded-full bg-accent text-black text-[9px] font-black uppercase tracking-[0.4em] shadow-[0_10px_30px_rgba(172,200,162,0.4)] text-center">
                            Strategic Pick
                        </div>
                    </div>
                )}

                {/* Content Container */}
                <div className="relative z-10 flex flex-col items-center h-full text-center" style={{ transform: "translateZ(100px)" }}>
                    {/* Icon & Name */}
                    <div className="mb-10 flex flex-col items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${plan.isPopular ? "bg-accent text-black" : "bg-white/5 border border-white/10 text-white/40 group-hover:bg-white/10"}`}>
                            <Icon size={26} strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="text-[9px] font-mono tracking-[0.4em] text-accent uppercase font-bold">
                                {plan.name} //
                            </h3>
                            <p className="text-white font-serif italic text-xl tracking-tight mt-1 opacity-80">{plan.description}</p>
                        </div>
                    </div>

                    {/* Price - Refined Size */}
                    <div className="mb-10 h-28 flex flex-col items-center justify-center relative w-full">
                        {plan.price === "Contact" ? (
                            <span className="text-4xl font-serif font-bold tracking-tighter text-white uppercase italic">Contact</span>
                        ) : (
                            <div className="flex items-start justify-center">
                                <span className="text-xl font-serif font-bold text-accent mt-2 mr-1">$</span>
                                <span className={`text-5xl md:text-7xl font-bold tracking-tighter leading-none ${plan.isPopular ? "text-white" : "text-white/90"}`}>
                                    {plan.price.replace('$', '').replace(',', '')}
                                </span>
                                <div className="flex flex-col ml-3 mt-3 text-left">
                                    <span className="text-accent font-mono tracking-[0.4em] text-[10px] uppercase font-bold">
                                        {plan.period.replace('/', '')}
                                    </span>
                                    <div className="h-[1px] w-6 bg-accent/30 mt-1" />
                                </div>
                            </div>
                        )}
                        {/* Underline Shape */}
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
                    </div>

                    {/* Features List - Optimized Spacing */}
                    <ul className="space-y-4 flex-1 pt-4 inline-block">
                        {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-4 text-white/50 group-hover:text-white/90 transition-all duration-500 group-hover:translate-x-1">
                                <div className="relative flex items-center justify-center flex-shrink-0">
                                    <div className={`w-1 h-1 rounded-full ${plan.isPopular ? "bg-accent shadow-[0_0_8px_rgba(172,200,162,1)]" : "bg-white/20"}`} />
                                    <div className="absolute inset-[-3px] border border-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <span className="text-[11px] font-mono font-medium tracking-wider uppercase leading-none">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    {/* CTA Button */}
                    <div className="mt-10 w-full" style={{ transform: "translateZ(150px)" }}>
                        <button className={`w-full py-6 rounded-2xl font-black text-[9px] uppercase tracking-[0.5em] transition-all duration-700
                            ${plan.isPopular
                                ? "bg-accent text-black hover:scale-[1.05] shadow-[0_20px_60px_rgba(172,200,162,0.4)] active:scale-95"
                                : "bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white hover:border-accent/40 active:scale-95"
                            }`}>
                            Secure Deployment
                        </button>
                    </div>
                </div>

                {/* Phase Indicator */}
                <div className="absolute bottom-6 right-10 text-[8px] font-mono text-white/10 tracking-[1em] uppercase">
                    Coldune_Phase_0{index + 1}
                </div>
            </div>

            {/* Dimensional Shadow */}
            <div className={`absolute -inset-10 bg-accent/20 blur-[120px] rounded-full -z-20 transition-opacity duration-1000 pointer-events-none ${plan.isPopular || isHovered ? "opacity-30" : "opacity-0"}`} />
        </motion.div>
    );
}

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 md:py-44 relative bg-[#08090B] overflow-hidden">
            {/* Cinematic Background Engine */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-accent/5 via-transparent to-transparent opacity-40" />
                <div className="absolute bottom-0 right-0 w-[1000px] h-[1000px] bg-accent/5 rounded-full blur-[200px] opacity-30" />

                {/* Tactical Vertical Lines */}
                <div className="absolute inset-0 opacity-[0.03]">
                    <div className="absolute left-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-white to-transparent" />
                    <div className="absolute right-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-white to-transparent" />
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-end gap-16 mb-20 md:mb-40">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-10"
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent font-mono text-[9px] tracking-[0.5em] uppercase">
                                Growth Architecture
                            </span>
                            <h2 className="text-7xl md:text-[10vw] font-serif font-bold text-white leading-[0.85] tracking-tighter">
                                Strategic <br />
                                <span className="text-accent italic">Investment</span>
                            </h2>
                            <p className="text-xl text-text-secondary font-light max-w-xl leading-relaxed italic border-l-2 border-accent/30 pl-8">
                                Scalable financial pathways engineered for brands that demand authority. Select your level of digital dominance.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="hidden lg:flex flex-col items-center gap-6 p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl"
                    >
                        <div className="flex items-center gap-4">
                            <Sparkles className="text-accent" size={24} />
                            <span className="text-xs font-mono text-white/40 uppercase tracking-[0.3em]">Premium Support Included</span>
                        </div>
                        <div className="flex gap-10">
                            <div className="text-center">
                                <p className="text-2xl font-serif font-bold text-white">24/7</p>
                                <p className="text-[8px] font-mono text-text-secondary uppercase tracking-widest mt-1">Uptime</p>
                            </div>
                            <div className="text-center border-l border-white/5 pl-10">
                                <p className="text-2xl font-serif font-bold text-white">Elite</p>
                                <p className="text-[8px] font-mono text-text-secondary uppercase tracking-widest mt-1">Standard</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {plans.map((plan, index) => (
                        <PricingCard key={plan.name} plan={plan} index={index} />
                    ))}
                </div>

                {/* Bottom Detail */}
                <div className="mt-32 pt-20 border-t border-white/5 text-center">
                    <p className="text-text-secondary/30 font-mono text-[9px] uppercase tracking-[1em]">
                        All deployments verified by Coldune Security Core // Phase 01
                    </p>
                </div>
            </div>
        </section>
    );
}
