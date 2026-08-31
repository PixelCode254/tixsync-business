"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Code, Cloud, Lock } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 h-[600px] w-[600px] rounded-full bg-brand-500/5 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-brand-800/5 blur-[120px]" />
      </div>

      <div className="section-container relative z-10 pt-32 pb-20">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl">
          <motion.div variants={item} className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/5 px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              <span className="text-xs font-medium text-brand-400">Enterprise Digital Solutions</span>
            </div>
          </motion.div>

          <motion.h1 variants={item} className="mb-6">
            <span className="block font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              <span className="text-gradient">Securing & Building</span>
              <br />
              <span className="text-gradient">Digital Futures</span>
            </span>
          </motion.h1>

          <motion.p variants={item} className="mb-10 max-w-2xl text-lg sm:text-xl text-surface-400 leading-relaxed">
            TIXSYNC SOLUTIONS delivers{" "}
            <span className="text-brand-400 font-medium">enterprise-grade cybersecurity</span>,{" "}
            <span className="text-brand-400 font-medium">web development</span>, and{" "}
            <span className="text-brand-400 font-medium">cloud infrastructure</span>{" "}
            to businesses worldwide. We protect what matters most.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4 mb-16">
            <Link href="/contact" className="btn-primary group">
              Get a Free Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/portfolio" className="btn-outline">
              View Case Studies
            </Link>
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap gap-3">
            {[
              { icon: Shield, label: "Cybersecurity" },
              { icon: Code, label: "Web Development" },
              { icon: Cloud, label: "Cloud Infrastructure" },
              { icon: Lock, label: "Compliance" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-2.5">
                <Icon className="h-4 w-4 text-surface-500" />
                <span className="text-sm text-surface-300">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-surface-600">Scroll</span>
            <div className="h-10 w-px bg-gradient-to-b from-surface-600 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
