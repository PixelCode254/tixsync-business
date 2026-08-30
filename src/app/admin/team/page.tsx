"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TeamMember { id: string; name: string; role: string; bio: string; imageUrl: string | null; linkedin: string | null; email: string | null; order: number; published: boolean; }

export default function AdminTeam() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", bio: "", imageUrl: "", linkedin: "", email: "" });

  const load = async () => {
    const res = await fetch("/api/team");
    const data = await res.json();
    setMembers(data.members || []);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    const payload = { ...form, order: editing?.order || members.length };
    if (editing) {
      await fetch("/api/team", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing.id, ...payload, published: editing.published }) });
    } else {
      await fetch("/api/team", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, published: true }) });
    }
    setShowForm(false); setEditing(null); setForm({ name: "", role: "", bio: "", imageUrl: "", linkedin: "", email: "" }); load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete team member?")) return;
    await fetch(`/api/team?id=${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold text-white">Team</h1><p className="text-sm text-surface-500">{members.length} members</p></div>
        <button onClick={() => { setEditing(null); setForm({ name: "", role: "", bio: "", image: "", linkedin: "", email: "" }); setShowForm(true); }} className="btn-primary text-sm">
          <Plus className="h-4 w-4" /> Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map(m => (
          <div key={m.id} className="card-glow p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-sm font-bold text-brand-400">{m.name.charAt(0)}</div>
                <div><p className="font-medium text-white text-sm">{m.name}</p><p className="text-xs text-surface-500">{m.role}</p></div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditing(m); setForm({ name: m.name, role: m.role, bio: m.bio, imageUrl: m.imageUrl || "", linkedin: m.linkedin || "", email: m.email || "" }); setShowForm(true); }} className="text-surface-400 hover:text-white"><Pencil className="h-3.5 w-3.5" /></button>
                <button onClick={() => del(m.id)} className="text-surface-400 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
            {m.bio && <p className="text-xs text-surface-500 line-clamp-2">{m.bio}</p>}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="card-glow w-full max-w-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">{editing ? "Edit Member" : "New Member"}</h2>
                <button onClick={() => { setShowForm(false); setEditing(null); }} className="text-surface-500 hover:text-white"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-4">
                {(["name", "role", "bio", "imageUrl", "linkedin", "email"] as const).map(key => (
                  <div key={key}>
                    <label className="mb-1.5 block text-xs font-medium text-surface-400 capitalize">{key === "imageUrl" ? "Image URL" : key === "linkedin" ? "LinkedIn URL" : key}</label>
                    {key === "bio" ? (
                      <textarea value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} rows={3}
                        className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-surface-600 outline-none focus:border-brand-500/50 resize-none" />
                    ) : (
                      <input value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                        className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-surface-600 outline-none focus:border-brand-500/50" />
                    )}
                  </div>
                ))}
                <div className="flex justify-end gap-3 pt-2">
                  <button onClick={() => { setShowForm(false); setEditing(null); }} className="btn-outline text-sm">Cancel</button>
                  <button onClick={save} className="btn-primary text-sm" disabled={!form.name || !form.role}>Save</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
