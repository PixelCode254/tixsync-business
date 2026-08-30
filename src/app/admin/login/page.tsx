"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", { email, password, redirect: false });
    if (result?.error) {
      setError("Invalid credentials");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="card-glow p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 border border-brand-500/20">
              <Lock className="h-5 w-5 text-brand-400" />
            </div>
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-surface-500">Sign in to manage TIXSYNC SOLUTIONS</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-surface-400">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-600" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-3 pl-10 pr-4 text-sm text-white placeholder-surface-600 outline-none focus:border-brand-500/50"
                  placeholder="admin@tixsyncsolutions.com" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-surface-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-600" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                  className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-3 pl-10 pr-4 text-sm text-white placeholder-surface-600 outline-none focus:border-brand-500/50"
                  placeholder="••••••••" />
              </div>
            </div>
            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400">
                <AlertCircle className="h-4 w-4" /> {error}
              </div>
            )}
            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
