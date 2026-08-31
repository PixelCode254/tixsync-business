import Link from "next/link";
import { Mail, Phone, MapPin, MessageCircle, Linkedin, Twitter } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "Web Development", href: "/services#web" },
    { label: "Cybersecurity", href: "/services#security" },
    { label: "Cloud Infrastructure", href: "/services#cloud" },
    { label: "Digital Transformation", href: "/services#digital" },
    { label: "Consulting", href: "/services#consulting" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/about#careers" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface-950">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 border border-brand-500/20">
                <span className="font-mono text-sm font-bold text-brand-400">T</span>
              </div>
              <div>
                <span className="text-sm font-bold text-white">TIXSYNC</span>
                <span className="block text-[9px] font-medium uppercase tracking-[0.25em] text-surface-500">SOLUTIONS</span>
              </div>
            </div>
            <p className="text-sm text-surface-500 leading-relaxed mb-6">
              Enterprise-grade digital solutions protecting and empowering businesses across Africa.
            </p>
            <div className="space-y-2 text-sm text-surface-500">
              <a href="mailto:info@tixsyncsolutions.com" className="flex items-center gap-2 hover:text-brand-400 transition-colors">
                <Mail className="h-4 w-4" /> info@tixsyncsolutions.com
              </a>
              <a href="tel:+254704440164" className="flex items-center gap-2 hover:text-brand-400 transition-colors">
                <Phone className="h-4 w-4" /> +254 704 440 164
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Nairobi, Kenya
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-surface-500 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Connect</h4>
            <div className="flex gap-2 mb-6">
              {[
                { icon: Linkedin, href: "https://linkedin.com/in/corneliusmaina", label: "LinkedIn" },
                { icon: Twitter, href: "https://twitter.com/corneliusmaina", label: "Twitter" },
                { icon: MessageCircle, href: "https://wa.me/254704440164?text=Hello%20TIXSYNC!%20I'd%20like%20to%20know%20more%20about%20your%20services.", label: "WhatsApp" },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 text-surface-500 hover:border-[#25D366]/30 hover:text-[#25D366] transition-all">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <p className="text-xs text-surface-500 mb-2">Quick inquiry?</p>
              <a href="https://wa.me/254704440164?text=Hello%20TIXSYNC!%20I'd%20like%20to%20know%20more%20about%20your%20services." target="_blank" rel="noopener noreferrer"
                className="text-sm font-medium text-[#25D366] hover:text-[#20bd5a] transition-colors">
                Message us on WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="section-container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-surface-600">
            © {new Date().getFullYear()} TIXSYNC SOLUTIONS. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-surface-600">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
