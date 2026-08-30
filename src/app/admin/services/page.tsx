"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, GripVertical, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Service { id: string; title: string; description: string; icon: string; features: string[]; order: number; published: boolean; }

const ICONS = ["Shield", "Globe", "Cloud", "Building", "Lock", "Database", "Monitor", "Zap", "Server", "Key"];

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", icon: "Shield", features: "" });

  const load = async () => {
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(data.services || []);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    const payload = { ...form, features: form.features.split(",").map(f => f.trim()).filter(Boolean), order: editing?.order || services.length };
    if (editing) {
      await fetch("/api/services", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing.id, ...payload, published: editing.published }) });
    } else {
      await fetch("/api/services", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, published: true }) });
    }
    setShowForm(false); setEditing(null); setForm({ title: "", description: "", icon: "Shield", features: "" }); load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete service?")) return;
    await fetch(`/api/services?id=${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold text-white">Services</h1><p className="text-sm text-surface-500">{services.length} services</p></div>
        <button onClick={() => { setEditing(null); setForm({ title: "", description: "", icon: "Shield", features: "" }); setShowForm(true); }} className="btn-primary text-sm">
          <Plus className="h-4 w-4" /> Add Service
        </button>
      </div>

      <div className="space-y-3">
        {services.map(s => (
          <div key={s.id} className="card-glow flex items-center gap-4 p-4">
            <GripVertical className="h-4 w-4 text-surface-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white truncate">{s.title}</p>
              <p className="text-sm text-surface-500 truncate">{s.description}</p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${s.published ? "bg-emerald-500/10 text-emerald-400" : "bg-surface-500/10 text-surface-500"}`}>
              {s.published ? "Published" : "Draft"}
            </span>
            <button onClick={() => { setEditing(s); setForm({ title: s.title, description: s.description, icon: s.icon, features: s.features.join(", ") }); setShowForm(true); }} className="text-surface-400 hover:text-white"><Pencil className="h-4 w-4" /></button>
            <button onClick={() => del(s.id)} className="text-surface-400 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
        {services.length === 0 && <p className="text-surface-500 text-center py-12">No services yet. Click "Add Service" to create one.</p>}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="card-glow w-full max-w-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">{editing ? "Edit Service" : "New Service"}</h2>
                <button onClick={() => { setShowForm(false); setEditing(null); }} className="text-surface-500 hover:text-white"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-surface-400">Title</label>
                  <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-surface-600 outline-none focus:border-brand-500/50" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-surface-400">Description</label>
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-surface-600 outline-none focus:border-brand-500/50 resize-none" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-surface-400">Icon</label>
                  <select value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none focus:border-brand-500/50">
                    {ICONS.map(i => <option key={i} value={i} className="bg-surface-900">{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-surface-400">Features (comma-separated)</label>
                  <input value={form.features} onChange={e => setForm({ ...form, features: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-surface-600 outline-none focus:border-brand-500/50" placeholder="Feature 1, Feature 2, Feature 3" />
                </div>
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
