"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("tixsync-cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("tixsync-cookie-consent", "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="mx-auto max-w-4xl rounded-xl border border-white/10 bg-surface-900/95 backdrop-blur-xl p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white mb-2">Cookie Policy</h3>
            <p className="text-xs text-surface-400 leading-relaxed">
              We use essential cookies for authentication and session management, and analytics cookies to understand how visitors interact with our site. By continuing to use this site, you agree to our use of cookies. See our{" "}
              <a href="/privacy" className="text-brand-400 hover:text-brand-300 underline">Privacy Policy</a>{" "}
              for details.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={accept} className="px-4 py-2 bg-brand-500 text-white text-xs font-medium rounded-lg hover:bg-brand-600 transition-colors">
              Accept
            </button>
            <button onClick={() => setVisible(false)} className="p-1 text-surface-500 hover:text-white transition-colors" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
