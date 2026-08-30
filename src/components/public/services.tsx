"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Shield, Code, Cloud, Lock, Laptop, Globe, Building, Database, Monitor, Zap, Server, Key, Briefcase } from "lucide-react";

type Service = {
  id: string; title: string; slug: string; icon: string | null;
  description: string; features: string[]; price: string | null;
};

const iconMap: Record<string, React.ElementType> = {
  Shield, Code, Cloud, Lock, Laptop, Globe, Building, Database, Monitor, Zap, Server, Key, Briefcase,
};

const fallback: Service[] = [
  { id: "1", title: "Cybersecurity", slug: "cybersecurity", icon: "Shield",
    description: "Comprehensive security assessments, penetration testing, and ongoing threat monitoring for enterprise environments.",
    features: ["Penetration Testing", "Vulnerability Assessment", "SOC Setup", "Compliance (ISO 27001, PCI-DSS)"], price: "From KES 150,000" },
  { id: "2", title: "Web Development", slug: "web-development", icon: "Code",
    description: "Custom enterprise web applications built with modern frameworks, optimized for performance and security.",
    features: ["Full-Stack Applications", "E-Commerce Platforms", "API Development", "Performance Optimization"], price: "From KES 200,000" },
  { id: "3", title: "Cloud Infrastructure", slug: "cloud", icon: "Cloud",
    description: "Cloud migration, architecture design, and managed infrastructure on AWS, Azure, and GCP.",
    features: ["Cloud Migration", "DevOps & CI/CD", "Infrastructure as Code", "24/7 Monitoring"], price: "From KES 100,000" },
  { id: "4", title: "Digital Transformation", slug: "digital", icon: "Laptop",
    description: "End-to-end digital strategy and implementation to modernize your business operations.",
    features: ["Process Automation", "Legacy System Modernization", "Data Analytics", "Staff Training"], price: "Custom" },
];

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [services, setServices] = useState<Service[]>(fallback);

  useEffect(() => {
    fetch("/api/services").then(r => r.json()).then(d => {
      if (d.services?.length) setServices(d.services);
    }).catch(() => {});
  }, []);

  return (
    <section id="services" className="section-padding">
      <div className="section-container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-16 max-w-2xl">
          <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-brand-500">Our Services</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            <span className="text-gradient">Enterprise</span>{" "}
            <span className="text-gradient">Solutions</span>
          </h2>
          <p className="text-lg text-surface-400 leading-relaxed">
            Comprehensive digital solutions designed for businesses that demand reliability, security, and scale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon || "Code"] || Code;
            return (
              <motion.div key={s.id} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-glow p-8 hover:border-white/10 transition-all group">
                <div className="flex items-start gap-5 mb-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 border border-brand-500/10 group-hover:bg-brand-500/20 transition-colors">
                    <Icon className="h-5 w-5 text-brand-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{s.title}</h3>
                    <p className="text-sm text-surface-400 leading-relaxed">{s.description}</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {s.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-surface-300">
                      <div className="h-1 w-1 rounded-full bg-brand-500 shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-sm font-semibold text-brand-400">{s.price || "Custom"}</span>
                  <Link href="/contact" className="flex items-center gap-1 text-sm text-surface-400 hover:text-white transition-colors group/l">
                    Request quote <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/l:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
