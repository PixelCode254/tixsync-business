"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "James Kariuki", role: "CTO, FinSecure Bank", content: "TIXSYNC transformed our security posture. Their penetration testing identified vulnerabilities that our internal team had missed for years. Enterprise-grade work.", rating: 5 },
  { name: "Sarah Wanjiku", role: "VP Engineering, EastTel", content: "The cloud migration was seamless. Zero downtime, 40% cost reduction. TIXSYNC's team understood our complex requirements from day one.", rating: 5 },
  { name: "David Mwangi", role: "CEO, SafeHomes Africa", content: "Professional, thorough, and results-driven. Their cybersecurity audit gave us the confidence to scale our operations nationally.", rating: 5 },
  { name: "Grace Nyambura", role: "Director, KINAPSA", content: "TIXSYNC delivered our digital transformation project on time and under budget. Their enterprise approach is what sets them apart.", rating: 5 },
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding">
      <div className="section-container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-16 max-w-2xl">
          <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-brand-500">Testimonials</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            <span className="text-gradient">Trusted By</span>{" "}
            <span className="text-gradient">Industry Leaders</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-glow p-8 hover:border-white/10 transition-all">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <Quote className="h-8 w-8 text-surface-700 mb-4" />
              <p className="text-sm text-surface-300 leading-relaxed mb-6">&ldquo;{t.content}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/10 border border-brand-500/10">
                  <span className="text-sm font-bold text-brand-400">{t.name.split(" ").map(n => n[0]).join("")}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-surface-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
