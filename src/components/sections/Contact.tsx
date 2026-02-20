"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, FormEvent } from "react";
import { Send, CheckCircle2, Loader2, MessageSquare, Sparkles, MapPin, Mail, Phone } from "lucide-react";

export default function Contact() {
    const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setFormState("loading");
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setFormState("success");
    };

    return (
        <section id="contact" className="py-24 md:py-44 relative bg-[#08090B] overflow-hidden">
            {/* Cinematic Background Engine */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[180px] opacity-40" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[140px] opacity-30" />

                {/* Ghost Typography Backdrop */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none pointer-events-none">
                    <h2 className="text-[35vw] font-serif font-black tracking-tighter uppercase leading-none transform rotate-12 -translate-y-20">
                        CONNECT
                    </h2>
                </div>

                {/* Tactical Grid */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(circle, #ACC8A2 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-end gap-16 mb-24 md:mb-40">
                    <div className="max-w-4xl w-full">
                        <div className="space-y-10">
                            <span className="inline-block px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent font-mono text-[9px] tracking-[0.5em] uppercase font-bold">
                                Engagement Terminal // v1.2
                            </span>
                            <h2 className="text-5xl md:text-7xl lg:text-[10vw] font-serif font-bold text-white leading-[0.9] tracking-tighter">
                                Start Your <br />
                                <span className="text-accent italic">Legacy</span>
                            </h2>
                            <p className="text-lg md:text-xl text-text-secondary max-w-xl font-light leading-relaxed border-l-2 border-accent/30 pl-6 md:pl-8">
                                We are currently accepting new high-impact partnerships for Phase 02 // 2026. Secure your digital dominance today.
                            </p>
                        </div>
                    </div>

                    <div className="hidden lg:flex flex-col items-center gap-6 p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl shadow-2xl shrink-0">
                        <div className="flex items-center gap-4">
                            <MessageSquare className="text-accent" size={24} />
                            <span className="text-xs font-mono text-white/40 uppercase tracking-[0.3em]">Encrypted Channel Active</span>
                        </div>
                        <div className="flex gap-10">
                            <div className="text-center">
                                <p className="text-2xl font-serif font-bold text-white">24h</p>
                                <p className="text-[8px] font-mono text-text-secondary uppercase tracking-widest mt-1">Response Time</p>
                            </div>
                            <div className="text-center border-l border-white/5 pl-10">
                                <p className="text-2xl font-serif font-bold text-white">Global</p>
                                <p className="text-[8px] font-mono text-text-secondary uppercase tracking-widest mt-1">Partnerships</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    {/* Left: Contact Credentials */}
                    <div className="lg:col-span-5 space-y-12 md:space-y-16 order-2 lg:order-1">
                        <div className="space-y-8 md:space-y-10">
                            {[
                                { icon: MapPin, label: "Studio Core", value: "Greater Noida, UP, India" },
                                { icon: Mail, label: "Encrypted Mail", value: "coldunestudio@gmail.com" },
                                { icon: Phone, label: "Direct Line", value: "+91 8397083428" }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="group flex items-start gap-6 md:gap-8"
                                >
                                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-black transition-all duration-500">
                                        <item.icon size={28} strokeWidth={1.5} />
                                    </div>
                                    <div className="space-y-1.5 mt-2 overflow-hidden">
                                        <p className="text-[10px] font-mono text-accent uppercase tracking-[0.4em] font-bold">{item.label}</p>
                                        <p className="text-xl md:text-2xl font-serif font-bold text-white tracking-tight break-words">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social HUD */}
                        <div className="pt-12 md:pt-16 border-t border-white/5 flex flex-wrap gap-6 md:gap-8">
                            {[
                                { name: 'Instagram', href: "https://www.instagram.com/iadillchoudhary17?igsh=d212djhra3kzM2Vk&utm_source=qr" },
                                { name: 'Linkedin', href: "https://www.linkedin.com/in/adil-choudhary-831a7035a?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
                                { name: 'Twitter', href: "#" }
                            ].map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] font-bold transition-colors hover:text-accent hover:-translate-y-1 transform duration-300"
                                >
                                    {social.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right: Engagement Terminal (Form) */}
                    <div className="lg:col-span-7 w-full order-1 lg:order-2">
                        {mounted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative bg-[#0E1116]/60 border border-white/5 rounded-3xl md:rounded-[4rem] p-6 md:p-12 lg:p-16 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.5)] w-full"
                            >
                                <AnimatePresence mode="wait">
                                    {formState === "success" ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-10"
                                        >
                                            <div className="relative">
                                                <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                                                    <CheckCircle2 size={48} />
                                                </div>
                                                <motion.div
                                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    className="absolute inset-[-10px] rounded-full border border-accent/20"
                                                />
                                            </div>
                                            <div className="space-y-4">
                                                <h3 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tighter transition-all">Transmission Received</h3>
                                                <p className="text-text-secondary font-light max-w-sm mx-auto">Your inquiry has been successfully encrypted and sent. A project architect will respond within 24 hours.</p>
                                            </div>
                                            <button
                                                onClick={() => setFormState("idle")}
                                                className="px-8 py-3 rounded-full border border-white/10 text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] hover:text-accent hover:border-accent/40 transition-all font-bold"
                                            >
                                                Submit Another
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.form
                                            key="form"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onSubmit={handleSubmit}
                                            className="space-y-8 md:space-y-12"
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] font-bold block ml-2 text-left">Identity // Name</label>
                                                    <input
                                                        type="text"
                                                        suppressHydrationWarning
                                                        className="w-full bg-white/[0.02] border border-white/5 rounded-2xl md:rounded-3xl p-5 md:p-6 text-white text-base md:text-lg font-serif focus:outline-none focus:border-accent/50 focus:bg-white/[0.04] transition-all placeholder:text-white/10"
                                                        placeholder="e.g. Alexander Knight"
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] font-bold block ml-2 text-left">Channel // Email</label>
                                                    <input
                                                        type="email"
                                                        suppressHydrationWarning
                                                        className="w-full bg-white/[0.02] border border-white/5 rounded-2xl md:rounded-3xl p-5 md:p-6 text-white text-base md:text-lg font-serif focus:outline-none focus:border-accent/50 focus:bg-white/[0.04] transition-all placeholder:text-white/10"
                                                        placeholder="e.g. alex@vision.com"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] font-bold block ml-2 text-left">Objective // Service Selection</label>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                    {['Branding', 'Web Core', 'Strategy', 'Creative'].map(service => (
                                                        <button type="button" key={service} className="p-4 rounded-xl md:rounded-2xl bg-white/[0.02] border border-white/5 text-[10px] font-mono uppercase tracking-widest text-white/40 hover:bg-accent/10 hover:border-accent/40 hover:text-accent transition-all">
                                                            {service}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] font-bold block ml-2 text-left">The Vision // Message</label>
                                                <textarea
                                                    rows={5}
                                                    suppressHydrationWarning
                                                    className="w-full bg-white/[0.02] border border-white/5 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 text-white text-base md:text-lg font-serif italic focus:outline-none focus:border-accent/50 focus:bg-white/[0.04] transition-all placeholder:text-white/10 resize-none"
                                                    placeholder="Briefly describe your digital ambitions..."
                                                    required
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={formState === "loading"}
                                                className="w-full py-6 md:py-8 bg-accent text-black font-black text-[11px] uppercase tracking-[0.4em] rounded-[2rem] hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_60px_rgba(172,200,162,0.4)] flex items-center justify-center gap-4 group"
                                            >
                                                {formState === "loading" ? <Loader2 size={24} className="animate-spin" /> : (
                                                    <>
                                                        Secure Transmission
                                                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                    </>
                                                )}
                                            </button>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            // SSR Placeholder to prevent massive layout shifts, identical dimensions to form
                            <div className="relative bg-[#0E1116]/60 border border-white/5 rounded-3xl md:rounded-[4rem] p-6 md:p-12 lg:p-16 w-full h-[800px] flex items-center justify-center">
                                <span className="text-white/20 font-mono text-xs uppercase tracking-widest animate-pulse">Initializing Terminal...</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Footer Meta */}
                <div className="mt-24 md:mt-40 text-center">
                    <div className="flex items-center justify-center gap-6 mb-8">
                        <div className="h-[1px] w-12 md:w-24 bg-white/5" />
                        <Sparkles size={24} className="text-accent/40" />
                        <div className="h-[1px] w-12 md:w-24 bg-white/5" />
                    </div>
                    <p className="text-text-secondary/30 font-mono text-[9px] uppercase tracking-[0.5em] md:tracking-[1em]">
                        Coldune Core Secure Channel // 2026
                    </p>
                </div>
            </div>
        </section>
    );
}
