import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for TIXSYNC SOLUTIONS — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20 section-container max-w-4xl">
      <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-brand-500">Legal</span>
      <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
        <span className="text-gradient">Privacy Policy</span>
      </h1>
      <p className="text-sm text-surface-500 mb-12">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

      <div className="space-y-12 text-surface-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">1. Data Collection</h2>
          <p className="mb-4">
            We collect information you provide directly, including your name, email address, phone number, company name, and any details you include in contact forms or project inquiries.
          </p>
          <p>
            We also automatically collect certain technical information such as IP address, browser type, device information, and pages visited to improve our services and website experience.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">2. How We Use Your Data</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>To respond to your inquiries and provide requested services</li>
            <li>To send project proposals, invoices, and contractual documents</li>
            <li>To improve our website, products, and services</li>
            <li>To send marketing communications (with your consent, where required)</li>
            <li>To comply with legal obligations and protect our rights</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">3. Cookies</h2>
          <p className="mb-4">
            Our website uses essential cookies to ensure proper functionality and analytics cookies to understand how visitors interact with our site. You can control cookie preferences through your browser settings.
          </p>
          <p>
            Session cookies are used for authentication and security. Analytics cookies help us measure website traffic and performance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">4. Third-Party Services</h2>
          <p className="mb-4">We may use the following third-party services that process data on our behalf:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Hosting providers (e.g., Vercel, AWS) for website and application infrastructure</li>
            <li>Email service providers for transactional and marketing communications</li>
            <li>Analytics providers to understand website usage patterns</li>
            <li>Payment processors for handling project invoices</li>
          </ul>
          <p className="mt-4">
            These third parties are contractually obligated to protect your data and use it only for the purposes we specify.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">5. Data Security</h2>
          <p>
            We implement industry-standard security measures including encryption in transit (TLS), access controls, and regular security audits. However, no method of transmission over the Internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">6. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal data. To exercise these rights, please contact us at the email below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">7. Contact Us</h2>
          <p>
            For questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:info@tixsyncsolutions.com" className="text-brand-400 hover:text-brand-300 transition-colors">info@tixsyncsolutions.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
