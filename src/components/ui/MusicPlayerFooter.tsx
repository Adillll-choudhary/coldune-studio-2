"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const tracks = [
    {
        title: "Coldune Studio",
        artist: "Adil - Founder",
        image: "/bg/IMG_3705.PNG", // Updated image
        duration: "03:45"
    },
    {
        title: "Coldune Studio",
        artist: "Arslan - Founder",
        image: "/bg/IMG_3704.PNG", // Updated image
        duration: "04:20"
    }
];

export function MusicPlayerFooter() {
    return (
        <section className="relative w-full py-24 px-4 m-0 overflow-hidden flex justify-center items-center">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-transparent">
                <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] -translate-y-1/2 animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
            </div>

            {/* Solid Olive Green Card Container */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-5xl h-[500px] md:h-[600px] bg-[#1A2118] border border-[#ACC8A2]/10 rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
                {/* Left Content (Text) */}
                <div className="flex-1 p-8 md:p-16 flex flex-col justify-center relative z-20">
                    <div className="inline-block px-4 py-2 rounded-full bg-[#ACC8A2]/20 border border-[#ACC8A2]/20 w-fit mb-8">
                        <span className="text-[#ACC8A2] text-xs font-bold tracking-widest uppercase">The Minds Behind //</span>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none">
                            FOUNDERS
                        </h2>
                        <div className="flex flex-col gap-1">
                            <p className="text-xl md:text-2xl text-white/60 font-serif italic">
                                Adil & Arslan
                            </p>
                            <p className="text-sm text-white/40 font-mono tracking-widest uppercase">
                                Coldune Studio
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Content (Dual Images - Shoulder to Shoulder) */}
                <div className="flex-1 relative h-full w-full md:w-1/2 overflow-hidden flex items-end justify-center">

                    {/* Background Gradients for Blending (Olive) */}
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#1A2118] z-20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A2118] via-[#1A2118]/20 to-transparent z-20" />

                    {/* Combined Image Container for precise overlap */}
                    <div className="relative w-[400px] md:w-[600px] h-full flex items-end">

                        {/* Founder 1 (Left - Arslan) */}
                        <div className="absolute left-0 md:left-10 bottom-0 w-[240px] h-[430px] md:w-[350px] md:h-[530px] z-10">
                            <Image
                                src="/bg/IMG_3704.PNG" // Arslan
                                alt="Arslan - Founder"
                                fill
                                className="object-cover object-top mix-blend-screen saturate-0 contrast-125" // Blending black bg into olive
                                priority
                            />
                        </div>

                        {/* Founder 2 (Right - Adil) - Overlapping */}
                        <div className="absolute right-0 md:right-10 bottom-0 w-[260px] h-[450px] md:w-[360px] md:h-[550px] z-0 opacity-90">
                            <Image
                                src="/bg/IMG_3705.PNG" // Adil
                                alt="Adil - Founder"
                                fill
                                className="object-cover object-top mix-blend-screen saturate-0 contrast-125" // Blending black bg into olive
                                priority
                            />
                        </div>
                    </div>
                </div>


            </motion.div>
        </section>
    );
}
