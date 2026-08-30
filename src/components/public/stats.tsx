"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { Shield, Users, Globe, Clock } from "lucide-react";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const display = useTransform(useTransform(count, (v) => Math.round(v)), (v) => `${v}${suffix}`);

  useEffect(() => {
    if (isInView) animate(count, value, { duration: 2, ease: [0.22, 1, 0.36, 1] });
  }, [isInView, count, value]);

  return <span ref={ref}><motion.span>{display}</motion.span></span>;
}

const stats = [
  { icon: Shield, value: 150, suffix: "+", label: "Security Audits", desc: "Vulnerabilities identified and patched" },
  { icon: Users, value: 80, suffix: "+", label: "Enterprise Clients", desc: "Across Kenya and East Africa" },
  { icon: Globe, value: 99, suffix: "%", label: "Uptime Delivered", desc: "On managed infrastructure" },
  { icon: Clock, value: 5, suffix: "+", label: "Years of Excellence", desc: "In cybersecurity and development" },
];

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 border-y border-white/5 bg-surface-900/30">
      <div className="section-container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 border border-brand-500/10">
                <s.icon className="h-5 w-5 text-brand-400" />
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-white mb-1">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="text-sm font-medium text-surface-300">{s.label}</p>
              <p className="text-xs text-surface-600 mt-1">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
