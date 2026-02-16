"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Newspaper, Sparkles } from "lucide-react";

const articles = [
    {
        title: "The Future of Immersive Web Design",
        excerpt: "How WebGL and 3D interactions are redefining digital storytelling in the age of spatial computing.",
        category: "Design",
        gradient: "from-[#1A2517] to-black",
        date: "Feb 02, 2026",
        readTime: "5 min"
    },
    {
        title: "AI in Creative Workflows",
        excerpt: "Leveraging machine intelligence to amplify human creativity and build the next generation of digital assets.",
        category: "Technology",
        gradient: "from-[#ACC8A2] to-[#0F140D]",
        date: "Jan 28, 2026",
        readTime: "8 min"
    },
    {
        title: "Building Brands in the Metaverse",
        excerpt: "Strategies for digital identity and brand architecture in emerging virtual environments and spatial webs.",
        category: "Branding",
        gradient: "from-[#0F140D] to-[#1A2517]",
        date: "Jan 15, 2026",
        readTime: "6 min"
    }
];

export default function Journal() {
    return (
        <section id="journal" className="py-24 md:py-44 relative bg-[#08090B] overflow-hidden">
            {/* Cinematic Background Engine */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-accent/10 blur-[200px] rounded-full opacity-40" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-white/5 blur-[200px] rounded-full opacity-20" />

                {/* Ghost Typography Backdrop */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none pointer-events-none">
                    <h2 className="text-[35vw] font-serif font-black tracking-tighter uppercase leading-none transform rotate-12 -translate-y-20">
                        JOURNAL
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
                                Intellectual Capital // Insights
                            </span>
                            <h2 className="text-5xl md:text-[10vw] font-serif font-bold text-white leading-[0.85] tracking-tighter">
                                Creative <br />
                                <span className="text-accent italic">Journal</span>
                            </h2>
                            <p className="text-xl text-text-secondary max-w-xl font-light leading-relaxed border-l-2 border-accent/30 pl-8">
                                A curated archive of ideas, strategies, and technical breakthroughs that define the next generation of the digital landscape.
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
                            <Newspaper className="text-accent" size={24} />
                            <span className="text-xs font-mono text-white/40 uppercase tracking-[0.3em]">Latest Editorial Release</span>
                        </div>
                        <div className="flex gap-10">
                            <div className="text-center">
                                <p className="text-2xl font-serif font-bold text-white">Vol. 01</p>
                                <p className="text-[8px] font-mono text-text-secondary uppercase tracking-widest mt-1">Archive Edition</p>
                            </div>
                            <div className="text-center border-l border-white/5 pl-10">
                                <p className="text-2xl font-serif font-bold text-white">2026</p>
                                <p className="text-[8px] font-mono text-text-secondary uppercase tracking-widest mt-1">Year of Impact</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {articles.map((article, index) => (
                        <motion.article
                            key={article.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative cursor-pointer"
                        >
                            {/* Card Body */}
                            <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-10 shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-white/5">
                                <div className={`absolute inset-0 bg-gradient-to-br ${article.gradient}`}>
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-1000" />
                                </div>

                                {/* HUD Elements */}
                                <div className="absolute top-8 left-8 flex items-center gap-3">
                                    <div className="px-5 py-2 bg-accent text-black rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] shadow-2xl group-hover:scale-105 transition-transform">
                                        {article.category}
                                    </div>
                                    <div className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 text-[9px] font-mono font-bold text-white uppercase tracking-[0.2em]">
                                        {article.readTime}
                                    </div>
                                </div>

                                {/* Interactive Icon */}
                                <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all group-hover:translate-y-0 translate-y-4">
                                    <ArrowUpRight size={20} />
                                </div>

                                {/* Active Shine */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 text-[10px] font-mono font-bold text-accent uppercase tracking-[0.3em]">
                                    <Sparkles size={14} className="animate-pulse" />
                                    <span>{article.date}</span>
                                </div>

                                <h3 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tighter group-hover:text-accent transition-colors duration-500 leading-none">
                                    {article.title}
                                </h3>

                                <p className="text-text-secondary text-lg font-light leading-relaxed line-clamp-2 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                                    {article.excerpt}
                                </p>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Bottom Impact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 md:mt-40 pt-16 md:pt-24 border-t border-white/5 flex flex-col items-center text-center gap-12"
                >
                    <h3 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tighter">
                        Stay <span className="text-accent italic">Informed</span>
                    </h3>

                    <button className="group relative px-12 py-5 rounded-full overflow-hidden transition-all active:scale-95">
                        <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-xl border border-white/10 group-hover:bg-accent/10 group-hover:border-accent/40 transition-all" />
                        <div className="relative flex items-center gap-4 text-white group-hover:text-accent font-bold tracking-[0.4em] text-[10px] uppercase transition-all">
                            Browse All Journals
                            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                    </button>

                    <p className="text-text-secondary/30 font-mono text-[9px] uppercase tracking-[1em] mt-12">
                        Coldune Journal Core // Synced for Phase 01
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
