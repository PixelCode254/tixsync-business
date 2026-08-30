import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Insights",
  description: "Expert insights on cybersecurity, cloud infrastructure, and enterprise technology from TIXSYNC SOLUTIONS.",
};

export default function BlogPage() {
  return (
    <div className="pt-32 pb-20 section-container">
      <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-brand-500">Blog</span>
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
        <span className="text-gradient">Insights</span>{" "}
        <span className="text-gradient">& Analysis</span>
      </h1>
      <p className="max-w-2xl text-lg text-surface-400 leading-relaxed mb-12">
        Expert perspectives on cybersecurity threats, cloud best practices, and enterprise technology trends.
      </p>
      <div className="card-glow p-12 text-center">
        <p className="text-surface-500">Blog posts coming soon. Check back for expert insights on cybersecurity and enterprise technology.</p>
      </div>
    </div>
  );
}
