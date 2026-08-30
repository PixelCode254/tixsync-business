"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";

export function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-brand-950/50">
      <div className="section-container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            <span className="text-gradient">Ready to Secure</span>{" "}
            <span className="text-gradient">Your Business?</span>
          </h2>
          <p className="text-lg text-surface-400 leading-relaxed mb-10">
            Let&apos;s discuss how TIXSYNC SOLUTIONS can protect and accelerate your digital operations. 
            Free initial consultation for all enterprise clients.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary group">
              Schedule a Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="tel:+254704440164" className="btn-outline">
              <Phone className="h-4 w-4" /> +254 704 440 164
            </a>
            <a href="https://wa.me/254704440164" target="_blank" rel="noopener noreferrer" className="btn-outline">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
