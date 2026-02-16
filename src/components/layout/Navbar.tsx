"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import ContactForm from "../ui/ContactForm";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Work", href: "/#work" },
    { name: "Lab", href: "/#lab" },
    { name: "Journal", href: "/#journal" },
    { name: "Growth", href: "/#growth" },
    { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isContactFormOpen, setIsContactFormOpen] = useState(false);

    const [hasPreloaded, setHasPreloaded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const handlePreloaderComplete = () => {
            setHasPreloaded(true);
        };

        // Manual check for already completed preloader
        if (typeof window !== 'undefined' && (window as any).preloaderDone) {
            setHasPreloaded(true);
        }

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("preloader-complete", handlePreloaderComplete);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("preloader-complete", handlePreloaderComplete);
        };
    }, []);

    return (
        <>
            {/* Desktop Navigation */}
            {/* Desktop Navigation */}
            <motion.nav
                initial={{ y: -100 }}
                animate={hasPreloaded ? { y: 0 } : { y: -100 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
                className={clsx(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-700 border-b h-20 will-change-[background-color,backdrop-filter]",
                    isScrolled
                        ? "bg-[#0B0D10]/60 backdrop-blur-md backdrop-saturate-150 border-white/5 shadow-2xl"
                        : "bg-transparent border-transparent"
                )}
            >
                <div className="container mx-auto px-6 h-full flex justify-between items-center relative">
                    <Link href="/" className="z-50 absolute left-6 top-0 h-20 md:h-28 w-auto aspect-[3/1]">
                        <motion.div
                            className="h-full w-full relative"
                            whileHover={{
                                scale: 1.05,
                                filter: "drop-shadow(0 0 8px rgba(172, 200, 162, 0.8)) drop-shadow(0 0 20px rgba(172, 200, 162, 0.4)) brightness(1.2)"
                            }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <Image
                                src="/logo.png"
                                alt="Coldune Logo"
                                height={112}
                                width={336}
                                className="object-contain h-full w-auto drop-shadow-lg"
                                priority
                            />
                        </motion.div>
                    </Link>

                    {/* Spacer to push menu right since logo is absolute */}
                    <div className="w-24 md:w-32 lg:w-40"></div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {/* Navigation Links - Fancy Serif Style */}
                        <div className="flex gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="relative group py-2"
                                >
                                    <span className="relative z-10 text-lg font-serif italic font-medium tracking-wide text-white/90 group-hover:text-accent transition-colors duration-500">
                                        {link.name}
                                    </span>
                                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-accent transition-all duration-500 ease-out group-hover:w-full opacity-60" />
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-6">

                            {/* CTA Button - Elegant Serif Pill */}
                            <motion.button
                                onClick={() => setIsContactFormOpen(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative px-8 py-3 rounded-full bg-white text-black text-sm font-serif italic font-bold tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(172,200,162,0.6)] overflow-hidden group"
                            >
                                <span className="relative z-10 group-hover:text-black transition-colors">Start Project</span>
                                <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="lg:hidden flex items-center gap-4">

                        <button
                            className="text-white z-50"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl flex flex-col justify-center items-center lg:hidden"
                    >
                        <ul className="flex flex-col gap-8 text-center">
                            {navLinks.map((link, i) => (
                                <motion.li
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * i }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-3xl font-light text-white hover:text-accent transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>

                        {/* Mobile CTA Button */}
                        <motion.button
                            onClick={() => {
                                setIsContactFormOpen(true);
                                setMobileMenuOpen(false);
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * navLinks.length }}
                            className="mt-12 px-10 py-4 rounded-full bg-accent text-black text-lg font-serif italic font-bold tracking-wide shadow-[0_0_30px_rgba(172,200,162,0.4)]"
                        >
                            Start Project
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Contact Form Modal */}
            <ContactForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} />
        </>
    );
}
