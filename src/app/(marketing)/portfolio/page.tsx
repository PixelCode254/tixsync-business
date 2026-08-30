import { Metadata } from "next";
import { Portfolio } from "@/components/public/portfolio";

export const metadata: Metadata = {
  title: "Case Studies & Portfolio",
  description: "Explore TIXSYNC SOLUTIONS' portfolio of enterprise cybersecurity, web development, and cloud infrastructure projects.",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="pt-32 pb-16 section-container">
        <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-brand-500">Portfolio</span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
          <span className="text-gradient">Case</span>{" "}
          <span className="text-gradient">Studies</span>
        </h1>
        <p className="max-w-2xl text-lg text-surface-400 leading-relaxed">
          A selection of enterprise projects showcasing our expertise across cybersecurity, development, and cloud.
        </p>
      </section>
      <Portfolio />
    </>
  );
}
