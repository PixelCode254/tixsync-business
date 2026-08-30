import { Metadata } from "next";
import { Hero } from "@/components/public/hero";

export const metadata: Metadata = {
  title: "Enterprise Digital Solutions | Cybersecurity, Web Dev, Cloud",
  description: "TIXSYNC SOLUTIONS delivers enterprise-grade cybersecurity, web development, and cloud infrastructure to businesses across Africa.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-16 section-container">
        <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-brand-500">Services</span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
          <span className="text-gradient">Enterprise</span>{" "}
          <span className="text-gradient">Solutions</span>
        </h1>
        <p className="max-w-2xl text-lg text-surface-400 leading-relaxed">
          Comprehensive digital solutions built for businesses that demand reliability, security, and scale.
        </p>
      </section>
      <div id="services"><ServicesSection /></div>
    </>
  );
}

import { Services as ServicesSection } from "@/components/public/services";
