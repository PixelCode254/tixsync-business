"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn("glass-nav transition-all duration-300", isScrolled ? "py-3" : "py-5")}>
      <nav className="section-container flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 border border-brand-500/20 transition-colors group-hover:bg-brand-500/20">
            <span className="font-mono text-sm font-bold text-brand-400">T</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-wide text-white">TIXSYNC</span>
            <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-surface-500">SOLUTIONS</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="px-4 py-2 text-sm font-medium text-surface-400 transition-colors hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+254704440164" className="flex items-center gap-2 text-sm text-surface-400 hover:text-white transition-colors">
            <Phone className="h-4 w-4" />
            +254 704 440 164
          </a>
          <Link href="/contact" className="btn-primary text-sm">Get a Quote</Link>
        </div>

        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="lg:hidden p-2 text-surface-400 hover:text-white" aria-label="Menu">
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/5 bg-surface-950/95 backdrop-blur-xl">
            <div className="section-container py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-surface-300 hover:bg-white/5 hover:text-white">
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                <a href="https://wa.me/254704440164" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg border border-emerald-600/20 bg-emerald-600/5 px-4 py-3 text-sm font-medium text-emerald-400">
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us
                </a>
                <Link href="/contact" onClick={() => setIsMobileOpen(false)} className="btn-primary w-full justify-center">Get a Quote</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
