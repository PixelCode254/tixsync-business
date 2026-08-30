"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Shield, Code, Cloud, Laptop, Briefcase } from "lucide-react";

type Project = {
  id: string; title: string; slug: string; description: string;
  category: string; techStack: string[]; imageUrl: string | null;
  liveUrl: string | null; featured: boolean;
};

const catIcons: Record<string, React.ElementType> = {
  WEB_DEVELOPMENT: Code, CYBERSECURITY: Shield, CLOUD_INFRASTRUCTURE: Cloud,
  DIGITAL_TRANSFORMATION: Laptop, CONSULTING: Briefcase,
};
const catLabels: Record<string, string> = {
  WEB_DEVELOPMENT: "Web Dev", CYBERSECURITY: "Security",
  CLOUD_INFRASTRUCTURE: "Cloud", DIGITAL_TRANSFORMATION: "Digital", CONSULTING: "Consulting",
};
const catColors: Record<string, string> = {
  WEB_DEVELOPMENT: "from-blue-500/20 to-blue-600/5",
  CYBERSECURITY: "from-emerald-500/20 to-emerald-600/5",
  CLOUD_INFRASTRUCTURE: "from-violet-500/20 to-violet-600/5",
  DIGITAL_TRANSFORMATION: "from-amber-500/20 to-amber-600/5",
  CONSULTING: "from-cyan-500/20 to-cyan-600/5",
};

const fallback: Project[] = [
  { id: "1", title: "FinSecure Banking Platform", slug: "finsecure", description: "End-to-end encrypted digital banking platform with PCI-DSS compliance and real-time fraud detection.", category: "WEB_DEVELOPMENT", techStack: ["Next.js", "PostgreSQL", "Stripe", "Redis"], imageUrl: null, liveUrl: null, featured: true },
  { id: "2", title: "TelcoShield SOC", slug: "telcoshield", description: "Managed Security Operations Center for a leading East African telecommunications provider.", category: "CYBERSECURITY", techStack: ["SIEM", "Splunk", "Python", "MITRE ATT&CK"], imageUrl: null, liveUrl: null, featured: true },
  { id: "3", title: "CloudFirst Migration", slug: "cloudfirst", description: "Full AWS migration for a 500-employee organization, reducing infrastructure costs by 40%.", category: "CLOUD_INFRASTRUCTURE", techStack: ["AWS", "Terraform", "Docker", "GitHub Actions"], imageUrl: null, liveUrl: null, featured: false },
];

export function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [projects, setProjects] = useState<Project[]>(fallback);

  useEffect(() => {
    fetch("/api/projects").then(r => r.json()).then(d => {
      if (d.projects?.length) setProjects(d.projects);
    }).catch(() => {});
  }, []);

  return (
    <section className="section-padding bg-surface-900/20">
      <div className="section-container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-16 flex items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-brand-500">Case Studies</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-gradient">Featured</span>{" "}
              <span className="text-gradient">Work</span>
            </h2>
          </div>
          <Link href="/portfolio" className="hidden sm:flex items-center gap-1 text-sm text-brand-400 hover:text-brand-300 transition-colors shrink-0 group">
            View all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => {
            const Icon = catIcons[p.category] || Code;
            return (
              <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }} className="group">
                <div className="card-glow h-full hover:border-white/10 transition-all">
                  <div className={`relative h-48 rounded-t-xl bg-gradient-to-br ${catColors[p.category] || "from-surface-700/50 to-surface-800/50"} flex items-center justify-center`}>
                    <Icon className="h-10 w-10 text-white/30" />
                    {p.featured && (
                      <div className="absolute top-3 left-3">
                        <span className="rounded-md bg-brand-500/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">Featured</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-surface-400">{catLabels[p.category]}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-brand-300 transition-colors">{p.title}</h3>
                    <p className="text-sm text-surface-400 leading-relaxed line-clamp-3 mb-4">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {p.techStack.slice(0, 4).map(t => (
                        <span key={t} className="rounded-md bg-white/5 px-2 py-1 text-[11px] text-surface-400">{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-brand-400 hover:text-brand-300 transition-colors">
                          <ExternalLink className="h-3.5 w-3.5" /> Live
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
