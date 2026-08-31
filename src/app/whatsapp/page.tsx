import { Metadata } from "next";
import { MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Chat on WhatsApp — TIXSYNC SOLUTIONS",
  description: "Connect with TIXSYNC SOLUTIONS on WhatsApp for quick inquiries and support.",
};

export default function WhatsAppPage() {
  return (
    <div className="pt-32 pb-20 section-container">
      <div className="mx-auto max-w-lg text-center">
        <div className="mb-8 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-500/10 border border-brand-500/20">
            <MessageCircle className="h-10 w-10 text-brand-400" />
          </div>
        </div>

        <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-brand-500">
          Get in Touch
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-6">
          <span className="text-gradient">Chat with Us</span>
        </h1>
        <p className="text-surface-400 leading-relaxed mb-10">
          Have a question or ready to start a project? Send us a message on WhatsApp and we&apos;ll get back to you within minutes during business hours.
        </p>

        <a
          href="https://wa.me/254704440164?text=Hello%20TIXSYNC!%20I'd%20like%20to%20know%20more%20about%20your%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-xl bg-[#25D366] px-8 py-4 text-base font-semibold text-white transition-all hover:bg-[#20bd5a] hover:shadow-lg hover:shadow-[#25D366]/20"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          Open WhatsApp Chat
        </a>

        <div className="mt-12 rounded-xl border border-white/5 bg-white/[0.02] p-6">
          <h3 className="text-sm font-semibold text-white mb-3">Other ways to reach us</h3>
          <div className="space-y-2 text-sm text-surface-500">
            <a href="mailto:info@tixsyncsolutions.com" className="block hover:text-brand-400 transition-colors">
              info@tixsyncsolutions.com
            </a>
            <a href="tel:+254704440164" className="block hover:text-brand-400 transition-colors">
              +254 704 440 164
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
