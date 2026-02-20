"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";

interface ContactFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactForm({ isOpen, onClose }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("https://formspree.io/f/xovqbpvb", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    _replyto: formData.email,
                    _subject: `New Project Inquiry from ${formData.name}`
                })
            });

            if (response.ok) {
                setSubmitStatus("success");
                setFormData({ name: "", email: "", phone: "", message: "" });
                setTimeout(() => {
                    onClose();
                    setSubmitStatus("idle");
                }, 2000);
            } else {
                setSubmitStatus("error");
            }
        } catch (error) {
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4 px-4 sm:px-6"
                    >
                        <div className="relative w-full max-w-lg bg-[#0B0D10] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                            {/* Header */}
                            <div className="relative px-6 md:px-8 pt-6 md:pt-8 pb-4 border-b border-white/5 sticky top-0 bg-[#0B0D10] z-10 transition-all">
                                <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 blur-[100px]" />
                                <h2 className="text-xl md:text-3xl font-serif font-bold text-white tracking-tight">
                                    Start a <span className="text-accent italic">Project</span>
                                </h2>
                                <p className="text-[10px] md:text-sm text-white/50 mt-1 md:mt-2 font-mono tracking-wide">
                                    Let's create something extraordinary together
                                </p>
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center group"
                                >
                                    <X className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4 md:space-y-5">
                                {/* Name */}
                                <div>
                                    <label className="block text-[10px] md:text-xs font-mono tracking-wider uppercase text-accent/80 mb-2">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        suppressHydrationWarning
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm md:text-base placeholder:text-white/30 focus:border-accent/50 focus:bg-white/10 transition-all outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-[10px] md:text-xs font-mono tracking-wider uppercase text-accent/80 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        suppressHydrationWarning
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm md:text-base placeholder:text-white/30 focus:border-accent/50 focus:bg-white/10 transition-all outline-none"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-[10px] md:text-xs font-mono tracking-wider uppercase text-accent/80 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        suppressHydrationWarning
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm md:text-base placeholder:text-white/30 focus:border-accent/50 focus:bg-white/10 transition-all outline-none"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-[10px] md:text-xs font-mono tracking-wider uppercase text-accent/80 mb-2">
                                        Project Details *
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        suppressHydrationWarning
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm md:text-base placeholder:text-white/30 focus:border-accent/50 focus:bg-white/10 transition-all outline-none resize-none"
                                        placeholder="Tell us about your project..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-6 py-4 bg-accent hover:bg-accent/90 disabled:bg-accent/50 text-black font-mono text-xs md:text-sm uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-3 group mt-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : submitStatus === "success" ? (
                                        "Sent Successfully!"
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>

                                {submitStatus === "error" && (
                                    <p className="text-red-400 text-xs md:text-sm text-center">
                                        Failed to send. Please try again or email us directly at coldunestudio@gmail.com
                                    </p>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
