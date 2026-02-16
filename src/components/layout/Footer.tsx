"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Instagram, Linkedin, Twitter, Sparkles } from "lucide-react";
import { MusicPlayerFooter } from "../ui/MusicPlayerFooter";

export default function Footer() {
    return (
        <footer className="w-full bg-[#08090B] border-t border-white/5 pt-24 md:pt-44 pb-20 relative overflow-hidden">
            {/* Cinematic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] opacity-30 pointer-events-none" />



            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-20 mb-32">
                    <div className="md:col-span-5 space-y-12">
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl font-serif font-bold text-white tracking-tighter"
                            >
                                COLDUNE<span className="text-accent">STUDIO //</span>
                            </motion.div>
                            <p className="text-xl text-text-secondary max-w-sm font-light leading-relaxed italic border-l-2 border-accent/20 pl-8">
                                "We bridge the gap between creative ambition and technical performance. Delivering digital assets that don't just exist—they dominate."
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-accent">
                                <Sparkles size={20} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] font-bold">System Status</p>
                                <p className="text-xs text-white uppercase tracking-widest font-bold">Operational // Phase 01</p>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-10">
                        <h3 className="text-[11px] font-mono font-bold text-accent uppercase tracking-[0.5em]">Navigation //</h3>
                        <ul className="space-y-6">
                            {['About', 'Work', 'Services', 'Pricing', 'Contact'].map((item) => (
                                <li key={item}>
                                    <motion.a
                                        href={`#${item.toLowerCase()}`}
                                        whileHover={{ x: 10, color: "#ACC8A2" }}
                                        className="text-white/60 text-lg font-serif italic transition-all block"
                                    >
                                        {item}
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2 space-y-10">
                        <h3 className="text-[11px] font-mono font-bold text-accent uppercase tracking-[0.5em]">Ecosystem //</h3>
                        <ul className="space-y-6">
                            {['Journal', 'Lab', 'Growth', 'Resources', 'Careers'].map((item) => (
                                <li key={item}>
                                    <motion.a
                                        href="#"
                                        whileHover={{ x: 10, color: "#ACC8A2" }}
                                        className="text-white/60 text-lg font-serif italic transition-all block"
                                    >
                                        {item}
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-3 space-y-10">
                        <h3 className="text-[11px] font-mono font-bold text-accent uppercase tracking-[0.5em]">Terminal //</h3>
                        <div className="space-y-8">
                            <div>
                                <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] font-bold mb-3">Encrypted Mail</p>
                                <a href="mailto:coldunestudio@gmail.com" className="text-xl text-white font-serif italic hover:text-accent transition-colors block">
                                    coldunestudio@gmail.com
                                </a>
                            </div>
                            <div className="flex gap-6 pt-4">
                                {[
                                    { Icon: Instagram, href: "https://www.instagram.com/iadillchoudhary17?igsh=d212djhra3kzM2Vk&utm_source=qr" },
                                    { Icon: Linkedin, href: "https://www.linkedin.com/in/adil-choudhary-831a7035a?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
                                    { Icon: Twitter, href: "#" },
                                    { Icon: Github, href: "#" }
                                ].map(({ Icon, href }, i) => (
                                    <motion.a
                                        key={i}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -5, color: "#ACC8A2" }}
                                        className="text-white/20 transition-all p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent/40"
                                    >
                                        <Icon size={20} strokeWidth={1.5} />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Founders Showcase Player */}
                <MusicPlayerFooter />

                <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-6">
                        <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] font-bold">
                            © {new Date().getFullYear()} Coldune Studio — Dreams in Motion
                        </p>
                        <div className="h-[1px] w-12 bg-white/5 hidden md:block" />
                        <div className="flex gap-6 opacity-40">
                            <a href="#" className="text-[9px] font-mono uppercase tracking-widest hover:text-accent transition-colors">Privacy</a>
                            <a href="#" className="text-[9px] font-mono uppercase tracking-widest hover:text-accent transition-colors">Terms</a>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-text-secondary/40">
                        <span className="text-[9px] font-mono uppercase tracking-[0.3em]">Verified Secure Deployment</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
