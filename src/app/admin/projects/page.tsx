"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, ExternalLink, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Project { id: string; title: string; description: string; category: string; imageUrl: string | null; techStack: string[]; liveUrl: string | null; featured: boolean; order: number; published: boolean; }

const CATEGORIES = [
  { value: "WEB_DEVELOPMENT", label: "Web Development" },
  { value: "CYBERSECURITY", label: "Cybersecurity" },
  { value: "CLOUD_INFRASTRUCTURE", label: "Cloud Infrastructure" },
  { value: "DIGITAL_TRANSFORMATION", label: "Digital Transformation" },
  { value: "CONSULTING", label: "Consulting" },
];

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", category: "WEB_DEVELOPMENT", imageUrl: "", techStack: "", liveUrl: "", featured: false });

  const load = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data.projects || []);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    const payload = { ...form, techStack: form.techStack.split(",").map(t => t.trim()).filter(Boolean), order: editing?.order || projects.length };
    if (editing) {
      await fetch("/api/projects", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing.id, ...payload, published: editing.published }) });
    } else {
      await fetch("/api/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, published: true }) });
    }
    setShowForm(false); setEditing(null); setForm({ title: "", description: "", category: "WEB_DEVELOPMENT", imageUrl: "", techStack: "", liveUrl: "", featured: false }); load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete project?")) return;
    await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold text-white">Projects</h1><p className="text-sm text-surface-500">{projects.length} projects</p></div>
        <button onClick={() => { setEditing(null); setForm({ title: "", description: "", category: "WEB_DEVELOPMENT", imageUrl: "", techStack: "", liveUrl: "", featured: false }); setShowForm(true); }} className="btn-primary text-sm">
          <Plus className="h-4 w-4" /> Add Project
        </button>
      </div>

      <div className="space-y-3">
        {projects.map(p => (
          <div key={p.id} className="card-glow flex items-center gap-4 p-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-white truncate">{p.title}</p>
                {p.featured && <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">Featured</span>}
              </div>
              <p className="text-sm text-surface-500 truncate">{p.description}</p>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400">{CATEGORIES.find(c => c.value === p.category)?.label || p.category}</span>
            {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-surface-400 hover:text-brand-400"><ExternalLink className="h-4 w-4" /></a>}
                <button onClick={() => { setEditing(p); setForm({ title: p.title, description: p.description, category: p.category, imageUrl: p.imageUrl || "", techStack: p.techStack.join(", "), liveUrl: p.liveUrl || "", featured: p.featured }); setShowForm(true); }} className="text-surface-400 hover:text-white"><Pencil className="h-4 w-4" /></button>
            <button onClick={() => del(p.id)} className="text-surface-400 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="card-glow w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">{editing ? "Edit Project" : "New Project"}</h2>
                <button onClick={() => { setShowForm(false); setEditing(null); }} className="text-surface-500 hover:text-white"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-4">
                <div><label className="mb-1.5 block text-xs font-medium text-surface-400">Title</label>
                  <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-surface-600 outline-none focus:border-brand-500/50" /></div>
                <div><label className="mb-1.5 block text-xs font-medium text-surface-400">Description</label>
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-surface-600 outline-none focus:border-brand-500/50 resize-none" /></div>
                <div><label className="mb-1.5 block text-xs font-medium text-surface-400">Category</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none">
                    {CATEGORIES.map(c => <option key={c.value} value={c.value} className="bg-surface-900">{c.label}</option>)}
                  </select></div>
                <div><label className="mb-1.5 block text-xs font-medium text-surface-400">Image URL</label>
                  <input value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-surface-600 outline-none focus:border-brand-500/50" placeholder="/images/project.jpg or https://..." /></div>
                <div><label className="mb-1.5 block text-xs font-medium text-surface-400">Tech Stack (comma-separated)</label>
                  <input value={form.techStack} onChange={e => setForm({ ...form, techStack: e.target.value })} className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-surface-600 outline-none focus:border-brand-500/50" placeholder="Next.js, TypeScript, Prisma" /></div>
                <div><label className="mb-1.5 block text-xs font-medium text-surface-400">Live URL</label>
                  <input value={form.liveUrl} onChange={e => setForm({ ...form, liveUrl: e.target.value })} className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-surface-600 outline-none focus:border-brand-500/50" /></div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="rounded border-white/10 bg-white/[0.03] text-brand-500 focus:ring-brand-500/20" />
                  <span className="text-sm text-surface-400">Featured project</span>
                </label>
                <div className="flex justify-end gap-3 pt-2">
                  <button onClick={() => { setShowForm(false); setEditing(null); }} className="btn-outline text-sm">Cancel</button>
                  <button onClick={save} className="btn-primary text-sm" disabled={!form.title || !form.description}>Save</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
