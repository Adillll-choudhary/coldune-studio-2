"use client";

import Image from "next/image";
import clsx from "clsx";

// Map available logos
const clientLogos = [
    { name: "Faiqa Clothing", src: "/clients/IMG_3520.PNG" },
    { name: "Essence Perfume", src: "/clients/IMG_3521.PNG", tint: "red" },
    { name: "Wonderhill University", src: "/clients/IMG_3522.PNG" },
    { name: "Joyolo", src: "", font: "font-sans uppercase tracking-[0.2em]" },
    { name: "Hotchix Kitchen", src: "/clients/IMG_3523.PNG" },
    { name: "SnackStop", src: "", font: "font-mono font-black" },
    { name: "The Ideal Restaurant", src: "/clients/IMG_3524.PNG" },
    { name: "Burp Up", src: "", font: "font-serif italic font-bold" },
    { name: "TechNova", src: "/clients/IMG_3525.PNG" },
    { name: "Apex Dynamics", src: "/clients/IMG_3527.PNG" },
];

export default function Clients() {
    return (
        <section className="py-24 bg-[#08090B] border-y border-white/5 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="text-accent font-mono text-[10px] tracking-[0.5em] uppercase mb-4 opacity-50">Impact Delivered // Worldwide</p>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tighter">
                        Brands <span className="text-accent italic">Optimized</span>
                    </h2>
                </div>

                {/* Marquee Container */}
                <div className="relative">
                    {/* Gradient Mask for Smooth Edges */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#08090B] to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#08090B] to-transparent z-10 pointer-events-none" />

                    <div className="flex w-max animate-marquee hover:[animation-play-state:paused] whitespace-nowrap items-center space-x-20 md:space-x-32">
                        {/* Duplicate logos 4 times for seamless loop */}
                        {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((logo, index) => (
                            <div
                                key={`${logo.name}-${index}`}
                                className="relative w-40 h-20 md:w-56 md:h-28 shrink-0 opacity-40 hover:opacity-100 transition-all duration-500 hover:scale-110 flex items-center justify-center group/logo"
                                style={{
                                    animation: `float 4s ease-in-out infinite`,
                                    animationDelay: `${(index % clientLogos.length) * 0.15}s`
                                }}
                            >
                                {logo.src ? (
                                    <div className="relative w-full h-full overflow-hidden">
                                        <div className={clsx(
                                            "relative h-full transition-all duration-700",
                                            (logo as any).crop ? "w-[300%]" : "w-full",
                                            (logo as any).tint === "red"
                                                ? "opacity-60 grayscale-0 group-hover/logo:opacity-100 group-hover/logo:scale-125"
                                                : (logo as any).removeBg
                                                    ? "group-hover/logo:grayscale-0"
                                                    : "grayscale group-hover/logo:grayscale-0"
                                        )}
                                            style={{
                                                left: (logo as any).crop === "center" ? "-100%" : ((logo as any).crop === "right" ? "-200%" : "0%"),
                                                filter: (logo as any).tint === "red"
                                                    ? "invert(16%) sepia(99%) saturate(7404%) hue-rotate(4deg) brightness(95%) contrast(118%) drop-shadow(0 0 15px rgba(255, 0, 0, 0.4))"
                                                    : (logo as any).removeBg
                                                        ? "brightness(0) invert(1)"
                                                        : "none",
                                                mixBlendMode: (logo as any).removeBg ? "multiply" : "normal"
                                            }}>
                                            <Image
                                                src={logo.src}
                                                alt={logo.name}
                                                fill
                                                className="object-contain"
                                                sizes="(max-width: 768px) 480px, 672px"
                                                quality={90}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <span className={clsx(
                                        "text-2xl md:text-3xl tracking-tighter text-white/80 group-hover/logo:text-accent transition-colors duration-500",
                                        (logo as any).font
                                    )}>
                                        {logo.name}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
