"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, Building, Briefcase, MessageSquare, CheckCircle, ArrowLeft, Loader2, AlertCircle } from "lucide-react";

interface ContactMessage { id: string; name: string; email: string; phone: string | null; company: string | null; subject: string | null; message: string; service: string | null; budget: string | null; read: boolean; replied: boolean; createdAt: string; }

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [replyStatus, setReplyStatus] = useState<"idle" | "success" | "error">("idle");

  const load = async () => {
    const res = await fetch(`/api/contact?unread=${filter === "unread" ? "true" : ""}`);
    const data = await res.json();
    setMessages(data.messages || []);
  };
  useEffect(() => { load(); }, [filter]);

  const markRead = async (id: string) => {
    await fetch(`/api/contact/${id}/read`, { method: "POST" });
  };

  const handleReply = async () => {
    if (!selected || !replyText.trim()) return;
    setSending(true);
    try {
      const res = await fetch("/api/contact/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId: selected.id, replyMessage: replyText }),
      });
      if (res.ok) { setReplyStatus("success"); setReplyText(""); load(); }
      else { setReplyStatus("error"); }
      setTimeout(() => setReplyStatus("idle"), 3000);
    } catch { setReplyStatus("error"); setTimeout(() => setReplyStatus("idle"), 3000); }
    setSending(false);
  };

  if (selected) {
    return (
      <div>
        <button onClick={() => { setSelected(null); setReplyText(""); }} className="flex items-center gap-2 text-sm text-surface-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to messages
        </button>
        <div className="card-glow p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-white">{selected.subject || "No subject"}</h2>
              <p className="text-sm text-surface-500 mt-1">From <span className="text-brand-400">{selected.name}</span> ({selected.email})</p>
            </div>
            <span className="text-xs text-surface-600">{new Date(selected.createdAt).toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 py-4 border-y border-white/5">
            {selected.phone && <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-surface-500" /><span className="text-sm text-surface-300">{selected.phone}</span></div>}
            {selected.company && <div className="flex items-center gap-2"><Building className="h-3.5 w-3.5 text-surface-500" /><span className="text-sm text-surface-300">{selected.company}</span></div>}
            {selected.service && <div className="flex items-center gap-2"><Briefcase className="h-3.5 w-3.5 text-surface-500" /><span className="text-sm text-surface-300">{selected.service}</span></div>}
            {selected.budget && <div className="flex items-center gap-2"><span className="text-sm text-surface-300">Budget: {selected.budget}</span></div>}
          </div>
          <div className="prose prose-invert max-w-none"><p className="text-surface-300 whitespace-pre-wrap leading-relaxed">{selected.message}</p></div>
        </div>
        <div className="card-glow p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><MessageSquare className="h-5 w-5" /> Reply</h3>
          <textarea value={replyText} onChange={e => setReplyText(e.target.value)} rows={5}
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-surface-600 outline-none focus:border-brand-500/50 resize-none mb-4"
            placeholder="Write your reply..." />
          <div className="flex items-center gap-3">
            <button onClick={handleReply} disabled={sending || !replyText.trim()} className="btn-primary text-sm disabled:opacity-50">
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Mail className="h-4 w-4" /> Send Reply</>}
            </button>
            {replyStatus === "success" && <span className="text-sm text-emerald-400 flex items-center gap-1"><CheckCircle className="h-4 w-4" /> Reply sent!</span>}
            {replyStatus === "error" && <span className="text-sm text-red-400 flex items-center gap-1"><AlertCircle className="h-4 w-4" /> Failed to send</span>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold text-white">Messages</h1><p className="text-sm text-surface-500">{messages.length} messages</p></div>
        <div className="flex gap-2">
          {(["all", "unread"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === f ? "bg-brand-500/10 text-brand-400 border border-brand-500/20" : "text-surface-400 hover:text-white border border-white/5"}`}>
              {f === "all" ? "All" : "Unread"}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {messages.map(m => (
          <button key={m.id} onClick={() => { setSelected(m); if (!m.read) markRead(m.id); }}
            className={`card-glow w-full text-left p-4 transition-all hover:border-white/10 ${!m.read ? "border-brand-500/20" : ""}`}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <p className={`font-medium text-sm ${!m.read ? "text-white" : "text-surface-300"}`}>{m.name}</p>
                {!m.read && <span className="h-2 w-2 rounded-full bg-brand-400" />}
                {m.replied && <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Replied</span>}
              </div>
              <span className="text-xs text-surface-600">{new Date(m.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-xs text-surface-500 mb-1">{m.email}{m.company ? ` · ${m.company}` : ""}</p>
            <p className="text-sm text-surface-400 truncate">{m.message}</p>
          </button>
        ))}
        {messages.length === 0 && <p className="text-surface-500 text-center py-12">No messages {filter === "unread" ? "unread" : ""}.</p>}
      </div>
    </div>
  );
}
