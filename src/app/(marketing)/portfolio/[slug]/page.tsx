"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, Code, Shield, Cloud, Laptop, Briefcase } from "lucide-react";

type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string | null;
  category: string;
  techStack: string[];
  imageUrl: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
};

const catLabels: Record<string, string> = {
  WEB_DEVELOPMENT: "Web Dev",
  CYBERSECURITY: "Security",
  CLOUD_INFRASTRUCTURE: "Cloud",
  DIGITAL_TRANSFORMATION: "Digital",
  CONSULTING: "Consulting",
};

const catColors: Record<string, string> = {
  WEB_DEVELOPMENT: "from-blue-500/20 to-blue-600/5",
  CYBERSECURITY: "from-emerald-500/20 to-emerald-600/5",
  CLOUD_INFRASTRUCTURE: "from-violet-500/20 to-violet-600/5",
  DIGITAL_TRANSFORMATION: "from-amber-500/20 to-amber-600/5",
  CONSULTING: "from-cyan-500/20 to-cyan-600/5",
};

const catIcons: Record<string, React.ElementType> = {
  WEB_DEVELOPMENT: Code,
  CYBERSECURITY: Shield,
  CLOUD_INFRASTRUCTURE: Cloud,
  DIGITAL_TRANSFORMATION: Laptop,
  CONSULTING: Briefcase,
};

export default function PortfolioDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/projects?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.project) {
          setProject(data.project);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center">
        <div className="text-surface-400 text-sm">Loading project...</div>
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-surface-400 mb-6">The project you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const Icon = catIcons[project.category] || Code;

  return (
    <div className="min-h-screen bg-surface-950">
      <div className="section-padding">
        <div className="section-container max-w-4xl mx-auto">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-surface-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>

          <div className="card-glow overflow-hidden">
            <div className={`relative h-64 sm:h-80 bg-gradient-to-br ${catColors[project.category] || "from-surface-700/50 to-surface-800/50"} flex items-center justify-center`}>
              {project.imageUrl ? (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <Icon className="h-16 w-16 text-white/20" />
              )}
              {project.featured && (
                <div className="absolute top-4 left-4">
                  <span className="rounded-md bg-brand-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                    Featured
                  </span>
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="rounded-md bg-white/5 px-3 py-1 text-xs font-medium text-surface-300 border border-white/10">
                  {catLabels[project.category]}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{project.title}</h1>

              <p className="text-surface-300 leading-relaxed text-lg mb-8">{project.description}</p>

              {project.content && (
                <div className="prose prose-invert max-w-none mb-8">
                  <div className="text-surface-300 leading-relaxed whitespace-pre-wrap">{project.content}</div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-sm font-semibold text-surface-400 uppercase tracking-wider mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg bg-brand-600/10 border border-brand-600/20 px-3 py-1.5 text-sm text-brand-400 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Live
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-sm"
                  >
                    <Github className="h-4 w-4" />
                    Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
