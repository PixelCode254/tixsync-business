"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Mail, Phone, MapPin, MessageCircle, Loader2 } from "lucide-react";
import type { ContactFormData } from "@/lib/validations";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 8000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const inputClass = "w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-surface-600 outline-none transition-colors focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20";

  return (
    <div className="pt-32 pb-20">
      <div className="section-container">
        <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-brand-500">Contact</span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
          <span className="text-gradient">Let&apos;s Discuss</span>{" "}
          <span className="text-gradient">Your Project</span>
        </h1>
        <p className="max-w-2xl text-lg text-surface-400 leading-relaxed mb-16">
          Tell us about your requirements and our team will respond within 24 hours with a tailored proposal.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: Mail, label: "Email", value: "info@tixsyncsolutions.com", href: "mailto:info@tixsyncsolutions.com" },
              { icon: Phone, label: "Phone", value: "+254 704 440 164", href: "tel:+254704440164" },
              { icon: MapPin, label: "Location", value: "Nairobi, Kenya", href: null },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 border border-brand-500/10">
                  <item.icon className="h-4 w-4 text-brand-400" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-surface-500 mb-1">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-surface-200 hover:text-brand-400 transition-colors">{item.value}</a>
                  ) : (
                    <p className="text-sm text-surface-200">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
            <div className="pt-4 space-y-3">
              <p className="text-xs font-medium uppercase tracking-wider text-surface-500">Quick Connect</p>
              <div className="flex gap-3">
                <a href="https://wa.me/254704440164" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-emerald-600/10 border border-emerald-600/20 px-4 py-2.5 text-sm font-medium text-emerald-400 hover:bg-emerald-600/20 transition-all">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <a href="mailto:info@tixsyncsolutions.com"
                  className="flex items-center gap-2 rounded-lg bg-brand-500/10 border border-brand-500/20 px-4 py-2.5 text-sm font-medium text-brand-400 hover:bg-brand-500/20 transition-all">
                  <Mail className="h-4 w-4" /> Email
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-surface-400">Full Name *</label>
                  <input {...register("name", { required: "Required", minLength: { value: 2, message: "Too short" } })}
                    className={inputClass} placeholder="John Doe" />
                  {errors.name && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.name.message}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-surface-400">Work Email *</label>
                  <input type="email" {...register("email", { required: "Required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid" } })}
                    className={inputClass} placeholder="john@company.com" />
                  {errors.email && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.email.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-surface-400">Company</label>
                  <input {...register("company")} className={inputClass} placeholder="Company name" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-surface-400">Phone</label>
                  <input {...register("phone")} className={inputClass} placeholder="+254..." />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-surface-400">Service Needed</label>
                  <select {...register("service")} className={inputClass}>
                    <option value="" className="bg-surface-900">Select a service</option>
                    <option value="cybersecurity" className="bg-surface-900">Cybersecurity</option>
                    <option value="web-development" className="bg-surface-900">Web Development</option>
                    <option value="cloud" className="bg-surface-900">Cloud Infrastructure</option>
                    <option value="digital" className="bg-surface-900">Digital Transformation</option>
                    <option value="consulting" className="bg-surface-900">Consulting</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-surface-400">Budget Range</label>
                  <select {...register("budget")} className={inputClass}>
                    <option value="" className="bg-surface-900">Select range</option>
                    <option value="100k-500k" className="bg-surface-900">KES 100K - 500K</option>
                    <option value="500k-1m" className="bg-surface-900">KES 500K - 1M</option>
                    <option value="1m-5m" className="bg-surface-900">KES 1M - 5M</option>
                    <option value="5m+" className="bg-surface-900">KES 5M+</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-surface-400">Subject</label>
                <input {...register("subject")} className={inputClass} placeholder="Project inquiry" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-surface-400">Project Details *</label>
                <textarea {...register("message", { required: "Required", minLength: { value: 10, message: "At least 10 characters" } })}
                  rows={5} className={`${inputClass} resize-none`} placeholder="Tell us about your project, timeline, and requirements..." />
                {errors.message && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.message.message}</p>}
              </div>

              <button type="submit" disabled={status === "sending"} className="btn-primary w-full sm:w-auto disabled:opacity-50">
                {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : <><Send className="h-4 w-4" /> Send Inquiry</>}
              </button>

              {status === "success" && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-sm text-emerald-400">
                  <CheckCircle className="h-4 w-4" /> Thank you! Our team will contact you within 24 hours.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" /> Something went wrong. Please try again or call us directly.
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
