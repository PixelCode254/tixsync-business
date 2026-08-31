import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { ArrowLeft, Clock, Tag, User } from "lucide-react";

interface BlogPostPageProps {
  params: { slug: string };
}

async function getBlogPost(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug, published: true },
    });
    return post;
  } catch {
    return null;
  }
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function estimateReadTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function renderMarkdown(content: string): string {
  let html = content;

  // Code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    const language = lang || "text";
    return `<div class="relative my-6 rounded-lg border border-white/10 bg-surface-950/80 overflow-hidden"><div class="flex items-center gap-2 border-b border-white/5 px-4 py-2 text-xs text-surface-500"><span class="font-mono">${language}</span></div><pre class="overflow-x-auto p-4 text-sm leading-relaxed"><code class="font-mono text-surface-300">${code.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim()}</code></pre></div>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="rounded border border-white/10 bg-surface-800/80 px-1.5 py-0.5 text-sm font-mono text-brand-400">$1</code>');

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 class="font-display text-xl font-bold text-white mt-8 mb-3">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="font-display text-2xl font-bold text-white mt-10 mb-4 pb-2 border-b border-white/5">$1</h2>');

  // Bold
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-white">$1</strong>');

  // Lists
  html = html.replace(/^- (.+)$/gm, '<li class="flex gap-2 mb-2"><span class="text-brand-500 mt-1.5">-</span><span>$1</span></li>');
  html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/g, (match) => `<ul class="my-4 space-y-1 text-surface-300">${match}</ul>`);

  // Numbered lists
  html = html.replace(/^(\d+)\. (.+)$/gm, '<li class="flex gap-2 mb-2"><span class="text-brand-500 font-medium">$1.</span><span>$2</span></li>');

  // Tables
  html = html.replace(/\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/g, (_, header, body) => {
    const headers = header.split("|").filter((h: string) => h.trim()).map((h: string) => `<th class="border border-white/10 bg-surface-800/80 px-4 py-2 text-left text-sm font-medium text-surface-200">${h.trim()}</th>`);
    const rows = body.trim().split("\n").map((row: string) => {
      const cells = row.split("|").filter((c: string) => c.trim()).map((c: string) => `<td class="border border-white/10 px-4 py-2 text-sm text-surface-300">${c.trim()}</td>`);
      return `<tr>${cells.join("")}</tr>`;
    });
    return `<div class="my-6 overflow-x-auto rounded-lg border border-white/10"><table class="w-full"><thead><tr>${headers.join("")}</tr></thead><tbody>${rows.join("")}</tbody></table></div>`;
  });

  // Paragraphs (wrap lines that aren't already wrapped)
  html = html.split("\n\n").map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return "";
    if (trimmed.startsWith("<")) return trimmed;
    return `<p class="my-4 text-surface-300 leading-relaxed">${trimmed}</p>`;
  }).join("\n");

  return html;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | TIXSYNC SOLUTIONS`,
    description: post.excerpt || post.title,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);
  if (!post) notFound();

  const readTime = estimateReadTime(post.content);
  const htmlContent = renderMarkdown(post.content);

  return (
    <div className="pt-32 pb-20 section-container">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-surface-500 hover:text-surface-300 transition-colors mb-8">
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      <article className="max-w-4xl">
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-surface-500">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {formatDate(post.createdAt)}
            </span>
            <span className="text-surface-700">|</span>
            <span>{readTime} min read</span>
            <span className="text-surface-700">|</span>
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              {post.author}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-surface-400 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-surface-300"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="h-px bg-gradient-to-r from-transparent via-surface-700 to-transparent mb-10" />

        <div
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>

      <div className="mt-16 card-glow p-8 sm:p-10">
        <h3 className="font-display text-xl font-bold text-white mb-3">Ready to secure your infrastructure?</h3>
        <p className="text-surface-400 mb-6">TIXSYNC SOLUTIONS provides enterprise-grade cybersecurity, cloud architecture, and full-stack development services. Let us help you build resilient, secure systems.</p>
        <Link href="/contact" className="btn-primary">
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
