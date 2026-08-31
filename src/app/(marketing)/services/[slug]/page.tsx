import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Shield, Code, Cloud, Laptop, Briefcase, ArrowRight } from "lucide-react";

const services: Record<string, {
  title: string;
  icon: React.ElementType;
  tagline: string;
  description: string;
  features: string[];
  process: string[];
  technologies: string[];
}> = {
  web: {
    title: "Web Development",
    icon: Code,
    tagline: "Custom web applications built for performance, security, and scale.",
    description: "We build enterprise-grade web applications using modern frameworks like Next.js, React, and Node.js. Every application is architected with security-first principles, optimized for performance, and designed to scale with your business. From complex dashboards to e-commerce platforms, we deliver solutions that drive results.",
    features: [
      "Custom Web Applications (Next.js, React, Vue.js)",
      "RESTful & GraphQL API Development",
      "E-Commerce Platforms & Payment Integration",
      "Real-time Dashboards & Analytics",
      "Progressive Web Apps (PWA)",
      "Performance Optimization & SEO",
    ],
    process: ["Discovery & Requirements", "Architecture Design", "Development Sprints", "Security Review", "Testing & QA", "Deployment & Support"],
    technologies: ["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL", "Tailwind CSS", "Redis", "Docker"],
  },
  security: {
    title: "Cybersecurity",
    icon: Shield,
    tagline: "Defend your digital infrastructure with enterprise-grade security.",
    description: "Our cybersecurity services protect your organization from evolving threats. We conduct comprehensive security assessments, penetration testing, and vulnerability management to identify and remediate risks before they can be exploited. Our team follows industry-standard frameworks including MITRE ATT&CK, NIST, and OWASP.",
    features: [
      "Penetration Testing & Red Team Exercises",
      "Vulnerability Assessment & Management",
      "Security Architecture Review",
      "Compliance Auditing (ISO 27001, PCI-DSS, NIST)",
      "SOC Setup & Managed Detection",
      "Incident Response & Forensics",
    ],
    process: ["Scope Definition", "Threat Modeling", "Active Testing", "Vulnerability Analysis", "Report & Remediation", "Re-testing"],
    technologies: ["Burp Suite", "Metasploit", "Nmap", "SIEM", "Splunk", "MITRE ATT&CK", "OWASP ZAP", "Wireshark"],
  },
  cloud: {
    title: "Cloud Infrastructure",
    icon: Cloud,
    tagline: "Migrate, optimize, and manage your cloud infrastructure.",
    description: "We help organizations migrate to the cloud, optimize their infrastructure, and implement DevOps best practices. Whether you're on AWS, GCP, or Azure, we design architectures that are resilient, cost-effective, and secure. Our infrastructure-as-code approach ensures reproducibility and consistency.",
    features: [
      "Cloud Migration Strategy & Execution",
      "Infrastructure as Code (Terraform, Pulumi)",
      "Containerization (Docker, Kubernetes)",
      "CI/CD Pipeline Design & Implementation",
      "Cost Optimization & FinOps",
      "24/7 Monitoring & Incident Response",
    ],
    process: ["Infrastructure Audit", "Migration Planning", "Implementation", "Testing", "Optimization", "Ongoing Management"],
    technologies: ["AWS", "GCP", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Prometheus", "Grafana"],
  },
  digital: {
    title: "Digital Transformation",
    icon: Laptop,
    tagline: "Modernize your business with digital-first solutions.",
    description: "We guide organizations through digital transformation, modernizing legacy systems, automating workflows, and building digital-first experiences. Our approach focuses on measurable business outcomes, ensuring technology investments drive real value.",
    features: [
      "Legacy System Modernization",
      "Workflow Automation & Integration",
      "Digital Experience Platforms",
      "Data Analytics & Business Intelligence",
      "API-First Architecture",
      "Change Management & Training",
    ],
    process: ["Current State Assessment", "Strategy Development", "Pilot Implementation", "Full Rollout", "Training & Adoption", "Continuous Improvement"],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS", "Power BI", "Zapier"],
  },
  consulting: {
    title: "Consulting",
    icon: Briefcase,
    tagline: "Strategic technology guidance for business leaders.",
    description: "Our consulting services help organizations make informed technology decisions. We provide strategic advice on architecture, security posture, vendor selection, and technology roadmaps. Whether you need a CTO-as-a-Service or project-specific guidance, we bring clarity to complexity.",
    features: [
      "Technology Strategy & Roadmapping",
      "Architecture Review & Advisory",
      "Vendor Evaluation & Selection",
      "CTO-as-a-Service",
      "Security Posture Assessment",
      "Digital Readiness Consulting",
    ],
    process: ["Initial Consultation", "Assessment", "Strategy Development", "Implementation Support", "Ongoing Advisory"],
    technologies: ["Strategy", "Architecture", "Security", "DevOps", "Cloud", "Agile"],
  },
};

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = services[params.slug];
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.tagline,
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services[params.slug];
  if (!service) notFound();

  const Icon = service.icon;

  return (
    <div className="pt-32 pb-20 section-container max-w-5xl">
      <Link href="/services" className="text-sm text-brand-400 hover:text-brand-300 mb-8 inline-block">
        ← All Services
      </Link>

      <div className="flex items-start gap-4 mb-6">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 border border-brand-500/10">
          <Icon className="h-6 w-6 text-brand-400" />
        </div>
        <div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2">
            <span className="text-gradient">{service.title}</span>
          </h1>
          <p className="text-lg text-surface-400">{service.tagline}</p>
        </div>
      </div>

      <p className="text-surface-300 leading-relaxed mb-12 max-w-3xl">{service.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="card-glow p-8">
          <h2 className="text-lg font-semibold text-white mb-4">What We Deliver</h2>
          <ul className="space-y-3">
            {service.features.map(f => (
              <li key={f} className="flex items-start gap-2 text-sm text-surface-300">
                <div className="h-1.5 w-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="card-glow p-8">
          <h2 className="text-lg font-semibold text-white mb-4">Our Process</h2>
          <ol className="space-y-3">
            {service.process.map((step, i) => (
              <li key={step} className="flex items-start gap-3 text-sm text-surface-300">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-400 text-xs font-mono font-bold">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="card-glow p-8 mb-12">
        <h2 className="text-lg font-semibold text-white mb-4">Technologies</h2>
        <div className="flex flex-wrap gap-2">
          {service.technologies.map(t => (
            <span key={t} className="rounded-lg bg-white/5 border border-white/5 px-3 py-1.5 text-sm text-surface-400 font-mono">{t}</span>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Link href="/contact" className="btn-primary inline-flex">
          Get Started <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      </div>
    </div>
  );
}
