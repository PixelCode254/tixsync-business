"use client";

import { useEffect, useState } from "react";
import { FolderOpen, MessageSquare, Users, Briefcase, FileText } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, messages: 0, unread: 0, services: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/projects").then(r => r.json()),
      fetch("/api/contact").then(r => r.json()),
      fetch("/api/services").then(r => r.json()),
    ]).then(([p, m, s]) => {
      setStats({
        projects: p.projects?.length || 0,
        messages: m.pagination?.total || 0,
        unread: m.messages?.filter((x: any) => !x.read).length || 0,
        services: s.services?.length || 0,
      });
    });
  }, []);

  const cards = [
    { label: "Services", value: stats.services, icon: Briefcase, href: "/admin/services", color: "text-brand-400", bg: "bg-brand-500/10" },
    { label: "Projects", value: stats.projects, icon: FolderOpen, href: "/admin/projects", color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Messages", value: stats.messages, icon: MessageSquare, href: "/admin/messages", color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Unread", value: stats.unread, icon: MessageSquare, href: "/admin/messages?filter=unread", color: "text-amber-400", bg: "bg-amber-500/10" },
    { label: "Blog", value: null, icon: FileText, href: "/admin/blog", color: "text-purple-400", bg: "bg-purple-500/10" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-surface-500 mt-1">Welcome back. Here&apos;s your business overview.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(c => (
          <Link key={c.label} href={c.href} className="card-glow group p-6 hover:border-white/10 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${c.bg}`}>
                <c.icon className={`h-5 w-5 ${c.color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{c.value ?? "—"}</p>
            <p className="text-sm text-surface-500">{c.label}</p>
          </Link>
        ))}
      </div>
      <div className="card-glow p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/services" className="btn-primary text-sm"><Briefcase className="h-4 w-4" /> Manage Services</Link>
          <Link href="/admin/projects" className="btn-outline text-sm"><FolderOpen className="h-4 w-4" /> Manage Projects</Link>
          <Link href="/admin/messages" className="btn-outline text-sm"><MessageSquare className="h-4 w-4" /> View Messages</Link>
          <Link href="/admin/blog" className="btn-outline text-sm"><FileText className="h-4 w-4" /> Blog</Link>
          <Link href="/" className="btn-outline text-sm">View Live Site</Link>
        </div>
      </div>
    </div>
  );
}
