"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, FormEvent } from "react";
import { Send, CheckCircle2, Loader2, MessageSquare, Sparkles, MapPin, Mail, Phone } from "lucide-react";

export default function Contact() {
    const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");

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
                                Engagement Terminal // v1.2
                            </span>
                            <h2 className="text-5xl md:text-[10vw] font-serif font-bold text-white leading-[0.85] tracking-tighter">
                                Start Your <br />
                                <span className="text-accent italic">Legacy</span>
                            </h2>
                            <p className="text-xl text-text-secondary max-w-xl font-light leading-relaxed border-l-2 border-accent/30 pl-8">
                                We are currently accepting new high-impact partnerships for Phase 02 // 2026. Secure your digital dominance today.
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
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
                    {/* Left: Contact Credentials */}
                    <div className="lg:col-span-5 space-y-16">
                        <div className="space-y-10">
                            {[
                                { icon: MapPin, label: "Studio Core", value: "Greater Noida, UP, India" },
                                { icon: Mail, label: "Encrypted Mail", value: "coldunestudio@gmail.com" },
                                { icon: Phone, label: "Direct Line", value: "+91 8397083428" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.8 }}
                                    className="group flex items-start gap-8"
                                >
                                    <div className="w-16 h-16 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-black transition-all duration-500">
                                        <item.icon size={28} strokeWidth={1.5} />
                                    </div>
                                    <div className="space-y-1.5 mt-2">
                                        <p className="text-[10px] font-mono text-accent uppercase tracking-[0.4em] font-bold">{item.label}</p>
                                        <p className="text-2xl font-serif font-bold text-white tracking-tight">{item.value}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Social HUD */}
                        <div className="pt-16 border-t border-white/5 flex gap-8">
                            {[
                                { name: 'Instagram', href: "https://www.instagram.com/iadillchoudhary17?igsh=d212djhra3kzM2Vk&utm_source=qr" },
                                { name: 'Linkedin', href: "https://www.linkedin.com/in/adil-choudhary-831a7035a?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
                                { name: 'Twitter', href: "#" }
                            ].map((social, i) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -5, color: "#ACC8A2" }}
                                    className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] font-bold transition-colors"
                                >
                                    {social.name}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Right: Engagement Terminal (Form) */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative bg-[#0E1116]/60 border border-white/5 rounded-[4rem] p-12 md:p-16 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
                        >
                            <AnimatePresence mode="wait">
                                {formState === "success" ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="h-[500px] flex flex-col items-center justify-center text-center space-y-10"
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
                                            <h3 className="text-4xl font-serif font-bold text-white tracking-tighter transition-all">Transmission Received</h3>
                                            <p className="text-text-secondary font-light max-w-sm mx-auto">Your inquiry has been successfully encrypted and sent. A project architect will respond within 24 hours.</p>
                                        </div>
                                        <button
                                            onClick={() => setFormState("idle")}
                                            className="px-8 py-3 rounded-full border border-white/10 text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] hover:text-accent hover:border-accent/40 transition-all font-bold"
                                        >
                                            Submit Another Inquire
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-12"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] font-bold block ml-2 text-left">Identity // Name</label>
                                                <input suppressHydrationWarning type="text" className="w-full bg-white/[0.02] border border-white/5 rounded-3xl p-6 text-white text-lg font-serif focus:outline-none focus:border-accent/50 focus:bg-white/[0.04] transition-all placeholder:text-white/10" placeholder="e.g. Alexander Knight" required />
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] font-bold block ml-2 text-left">Channel // Email</label>
                                                <input suppressHydrationWarning type="email" className="w-full bg-white/[0.02] border border-white/5 rounded-3xl p-6 text-white text-lg font-serif focus:outline-none focus:border-accent/50 focus:bg-white/[0.04] transition-all placeholder:text-white/10" placeholder="e.g. alex@vision.com" required />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] font-bold block ml-2 text-left">Objective // Service Selection</label>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                {['Branding', 'Web Core', 'Strategy', 'Creative'].map(service => (
                                                    <button type="button" key={service} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[10px] font-mono uppercase tracking-widest text-white/40 hover:bg-accent/10 hover:border-accent/40 hover:text-accent transition-all">
                                                        {service}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] font-bold block ml-2 text-left">The Vision // Message</label>
                                            <textarea suppressHydrationWarning rows={5} className="w-full bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 text-white text-lg font-serif italic focus:outline-none focus:border-accent/50 focus:bg-white/[0.04] transition-all placeholder:text-white/10 resize-none" placeholder="Briefly describe your digital ambitions..." required />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={formState === "loading"}
                                            className="w-full py-8 bg-accent text-black font-black text-[11px] uppercase tracking-[0.4em] rounded-[2rem] hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_60px_rgba(172,200,162,0.4)] flex items-center justify-center gap-4 group"
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
                    </div>
                </div>

                {/* Bottom Footer Meta */}
                <div className="mt-40 text-center">
                    <div className="flex items-center justify-center gap-6 mb-8">
                        <div className="h-[1px] w-24 bg-white/5" />
                        <Sparkles size={24} className="text-accent/40" />
                        <div className="h-[1px] w-24 bg-white/5" />
                    </div>
                    <p className="text-text-secondary/30 font-mono text-[9px] uppercase tracking-[1em]">
                        Coldune Core Secure Channel // All rights reserved 2026
                    </p>
                </div>
            </div>
        </section>
    );
}
