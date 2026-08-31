"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  published: boolean;
  createdAt: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", excerpt: "", tags: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/blog").then(r => r.json()).then(d => {
      setPosts(d.posts || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          content: form.content,
          excerpt: form.excerpt || undefined,
          tags: form.tags ? form.tags.split(",").map(t => t.trim()) : [],
          published: true,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(prev => [data.post, ...prev]);
        setForm({ title: "", content: "", excerpt: "", tags: "" });
        setShowForm(false);
      }
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  }

  return (
    <div className="min-h-screen bg-surface-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <div className="flex gap-3">
            <Link href="/admin" className="text-sm text-surface-400 hover:text-white transition-colors">← Dashboard</Link>
            <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-brand-500 text-white rounded-lg text-sm font-medium hover:bg-brand-600 transition-colors">
              {showForm ? "Cancel" : "+ New Post"}
            </button>
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleCreate} className="mb-8 p-6 rounded-xl border border-white/10 bg-white/[0.02] space-y-4">
            <input type="text" placeholder="Post title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-500/50" />
            <input type="text" placeholder="Excerpt (optional)" value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-500/50" />
            <textarea placeholder="Post content (HTML supported)" value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} required rows={10}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-brand-500/50" />
            <input type="text" placeholder="Tags (comma-separated)" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-500/50" />
            <button type="submit" disabled={saving}
              className="px-6 py-2 bg-brand-500 text-white rounded-lg text-sm font-medium hover:bg-brand-600 transition-colors disabled:opacity-50">
              {saving ? "Creating..." : "Create Post"}
            </button>
          </form>
        )}

        {loading ? (
          <p className="text-surface-400 text-sm">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-surface-400 text-sm">No posts yet. Create one above.</p>
        ) : (
          <div className="space-y-3">
            {posts.map(post => (
              <div key={post.id} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <div>
                  <h3 className="text-sm font-medium text-white">{post.title}</h3>
                  <p className="text-xs text-surface-500 mt-1">
                    /blog/{post.slug} · {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-md ${post.published ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
                  {post.published ? "Published" : "Draft"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
