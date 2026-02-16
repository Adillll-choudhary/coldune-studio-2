"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { TrendingUp, Sparkles, Zap, Target } from "lucide-react";

const stats = [
    { label: "User Engagement", before: 15, after: 94, color: "from-accent to-accent/40", description: "Average session duration and interaction depth." },
    { label: "Conversion Velocity", before: 2.1, after: 12.8, color: "from-white to-white/20", description: "Speed of user transition from lead to customer." },
    { label: "Market Growth", before: 10, after: 180, color: "from-accent to-accent/60", suffix: "%", description: "Direct revenue increase post-deployment." },
];

function AnimatedCounter({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, motionValue, value]);

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = `${latest.toFixed(value % 1 !== 0 ? 1 : 0)}${suffix}`;
            }
        });
    }, [springValue, suffix, value]);

    return <span ref={ref} className="tabular-nums">0{suffix}</span>;
}

export default function Growth() {
    return (
        <section id="growth" className="py-24 md:py-44 relative bg-[#08090B] overflow-hidden">
            {/* Cinematic Background Engine */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[180px] opacity-40" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[140px] opacity-30" />

                {/* Ghost Typography Backdrop */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none pointer-events-none">
                    <h2 className="text-[35vw] font-serif font-black tracking-tighter uppercase leading-none transform rotate-6 -translate-y-20">
                        VELOCITY
                    </h2>
                </div>

                {/* Tactical Grid Overlay */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(circle, #ACC8A2 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-end gap-16 mb-40">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-10"
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent font-mono text-[9px] tracking-[0.5em] uppercase font-bold">
                                Performance Architecture // Growth
                            </span>
                            <h2 className="text-5xl md:text-[10vw] font-serif font-bold text-white leading-[0.85] tracking-tighter">
                                Measurable <br />
                                <span className="text-accent italic">Impact</span>
                            </h2>
                            <p className="text-xl text-text-secondary max-w-xl font-light leading-relaxed border-l-2 border-accent/30 pl-8">
                                We don't just optimize for beauty. We build high-performance systems designed to outperform the competition and accelerate your market dominance.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="hidden lg:flex flex-col items-center gap-6 p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl shadow-2xl"
                    >
                        <div className="flex items-center gap-4">
                            <Zap className="text-accent" size={24} />
                            <span className="text-xs font-mono text-white/40 uppercase tracking-[0.3em]">Real-time Acceleration</span>
                        </div>
                        <div className="flex gap-10">
                            <div className="text-center">
                                <p className="text-2xl font-serif font-bold text-white">94%</p>
                                <p className="text-[8px] font-mono text-text-secondary uppercase tracking-widest mt-1">Efficiency</p>
                            </div>
                            <div className="text-center border-l border-white/5 pl-10">
                                <p className="text-2xl font-serif font-bold text-white">12.8x</p>
                                <p className="text-[8px] font-mono text-text-secondary uppercase tracking-widest mt-1">Velocity</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                    {/* Left: Progression Metrics */}
                    <div className="lg:col-span-7 space-y-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="bg-white/[0.01] border border-white/5 p-12 rounded-[3.5rem] backdrop-blur-3xl group hover:border-accent/30 transition-all duration-700 shadow-2xl overflow-hidden relative"
                            >
                                {/* Active Glare */}
                                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                <div className="flex justify-between items-start mb-10 relative z-10">
                                    <div className="space-y-3">
                                        <h3 className="text-3xl font-serif font-bold text-white tracking-tight group-hover:text-accent transition-colors">{stat.label}</h3>
                                        <p className="text-[11px] font-mono text-text-secondary uppercase tracking-[0.2em] opacity-60 font-medium">{stat.description}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-5xl font-bold text-white tracking-tighter mb-2">
                                            <AnimatedCounter value={stat.after} suffix={stat.suffix} />
                                        </div>
                                        <div className="text-[9px] text-accent font-mono uppercase tracking-[0.4em] font-bold">Verified Metrics</div>
                                    </div>
                                </div>

                                <div className="relative h-2.5 bg-white/5 rounded-full border border-white/5 overflow-hidden">
                                    {/* Progress Track */}
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${stat.after}%` }}
                                        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                                        viewport={{ once: true }}
                                        className={`absolute h-full left-0 bg-gradient-to-r ${stat.color} shadow-[0_0_20px_rgba(172,200,162,0.4)]`}
                                    >
                                        <motion.div
                                            animate={{ x: ['-100%', '100%'] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[45deg]"
                                        />
                                    </motion.div>

                                    {/* Initial Marker */}
                                    <motion.div
                                        initial={{ left: 0 }}
                                        whileInView={{ left: `${stat.before}%` }}
                                        transition={{ duration: 1.5, ease: "circOut", delay: 0.5 }}
                                        viewport={{ once: true }}
                                        className="absolute top-0 bottom-0 w-[2px] bg-white/40 z-30 shadow-[0_0_15px_white]"
                                    >
                                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] text-white/40 font-mono tracking-widest uppercase font-bold">Origin</div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right: Master Result Bento */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="relative h-full bg-[#0E1116]/60 border border-white/5 rounded-[3rem] md:rounded-[4rem] p-8 md:p-16 overflow-hidden group flex flex-col justify-between shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-3xl"
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(172,200,162,0.1),transparent_70%)] group-hover:scale-110 transition-transform duration-1000" />

                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-accent rounded-[2rem] flex items-center justify-center mb-12 shadow-[0_20px_50px_rgba(172,200,162,0.4)] group-hover:rotate-12 transition-all duration-700">
                                    <Target size={36} strokeWidth={1.5} className="text-black" />
                                </div>

                                <h3 className="text-5xl md:text-6xl font-serif font-bold text-white mb-10 leading-[0.9] tracking-tighter">
                                    Transform <br />
                                    Your <span className="text-accent italic">Authority</span>
                                </h3>
                                <p className="text-xl text-text-secondary font-light leading-relaxed mb-16 italic border-l-2 border-accent/20 pl-8">
                                    We bridge the gap between creative ambition and technical performance, delivering assets that don't just exist - they dominate the market.
                                </p>
                            </div>

                            <div className="relative z-10 grid grid-cols-2 gap-10 pt-12 border-t border-white/5">
                                <div className="space-y-3">
                                    <div className="text-4xl font-bold text-accent tracking-tighter">
                                        <AnimatedCounter value={250} suffix="+" />
                                    </div>
                                    <div className="text-[10px] font-mono text-text-secondary uppercase tracking-[0.3em] font-bold">Global Launches</div>
                                </div>
                                <div className="space-y-3">
                                    <div className="text-4xl font-bold text-white tracking-tighter">
                                        <AnimatedCounter value={98} suffix="%" />
                                    </div>
                                    <div className="text-[10px] font-mono text-text-secondary uppercase tracking-[0.3em] font-bold">Success Core</div>
                                </div>
                                <div className="col-span-2 space-y-3 pt-6">
                                    <div className="text-6xl font-bold text-accent tracking-tighter">
                                        <AnimatedCounter value={150} suffix="%" />
                                    </div>
                                    <div className="text-[10px] font-mono text-text-secondary uppercase tracking-[0.4em] font-bold">Avg Revenue Velocity Increase</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Footnote */}
                <div className="mt-40 text-center">
                    <p className="text-text-secondary/30 font-mono text-[9px] uppercase tracking-[1em]">
                        Performance data synchronized with Coldune Global Node // v1.2.0
                    </p>
                </div>
            </div>
        </section>
    );
}
