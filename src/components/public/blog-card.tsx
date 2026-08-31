"use client";

import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string | null;
  author: string;
  tags: string[];
  createdAt: string;
}

function estimateReadTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const TAG_COLORS: Record<string, string> = {
  cybersecurity: "bg-red-500/10 text-red-400 border-red-500/20",
  "web-development": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "full-stack": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  cloud: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  devops: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  compliance: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  infrastructure: "bg-green-500/10 text-green-400 border-green-500/20",
  "network-security": "bg-red-500/10 text-red-400 border-red-500/20",
  GRC: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "vulnerability-assessment": "bg-rose-500/10 text-rose-400 border-rose-500/20",
  aws: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  kubernetes: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  terraform: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "cloud-security": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  enterprise: "bg-surface-500/10 text-surface-400 border-surface-500/20",
  nodejs: "bg-green-500/10 text-green-400 border-green-500/20",
  react: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  postgresql: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "api-security": "bg-red-500/10 text-red-400 border-red-500/20",
};

function getTagColor(tag: string): string {
  return TAG_COLORS[tag] || "bg-surface-500/10 text-surface-400 border-surface-500/20";
}

export function BlogCard({ title, slug, excerpt, author, tags, createdAt }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="card-glow h-full p-6 sm:p-8 transition-all duration-300 group-hover:border-brand-500/30">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 mb-4 text-xs text-surface-500">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {formatDate(createdAt)}
            </span>
            <span className="text-surface-700">|</span>
            <span>By {author}</span>
          </div>

          <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-brand-400 transition-colors leading-tight">
            {title}
          </h3>

          {excerpt && (
            <p className="text-surface-400 text-sm leading-relaxed mb-6 flex-grow">
              {excerpt}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mb-6">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium ${getTagColor(tag)}`}
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="inline-flex items-center rounded-md border border-surface-700 bg-surface-800/50 px-2.5 py-1 text-xs text-surface-400">
                +{tags.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-brand-400 group-hover:text-brand-300 transition-colors mt-auto">
            Read Article
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </article>
    </Link>
  );
}
