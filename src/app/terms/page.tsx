import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for TIXSYNC SOLUTIONS — the rules governing use of our services.",
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20 section-container max-w-4xl">
      <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-brand-500">Legal</span>
      <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
        <span className="text-gradient">Terms of Service</span>
      </h1>
      <p className="text-sm text-surface-500 mb-12">Last updated: August 31, 2026</p>

      <div className="space-y-12 text-surface-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">1. Service Description</h2>
          <p className="mb-4">
            TIXSYNC SOLUTIONS provides enterprise-grade digital solutions including web development, cybersecurity consulting, cloud infrastructure management, and digital transformation services.
          </p>
          <p>
            Services are delivered per the terms outlined in individual project proposals, statements of work, or service agreements executed between TIXSYNC SOLUTIONS and the client.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">2. Payment Terms</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Invoices are due within 30 days of issuance unless otherwise specified in the project agreement</li>
            <li>Late payments may incur a 1.5% monthly finance charge</li>
            <li>Work may be suspended for accounts past due beyond 15 days</li>
            <li>All prices are quoted in Kenya Shillings (KES) or US Dollars (USD) as specified in the proposal</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">3. Intellectual Property</h2>
          <p className="mb-4">
            Upon full payment, clients receive ownership of all custom deliverables specifically created for the project as outlined in the project agreement.
          </p>
          <p>
            TIXSYNC SOLUTIONS retains ownership of pre-existing tools, frameworks, libraries, and methodologies used in project delivery. We may use anonymized, non-identifying aspects of completed work for portfolio and marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">4. Liability Limitations</h2>
          <p className="mb-4">
            To the maximum extent permitted by applicable law, TIXSYNC SOLUTIONS shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of our services.
          </p>
          <p>
            Our total aggregate liability for any claim arising from or related to our services shall not exceed the total amount paid by the client for the specific service giving rise to the claim during the twelve (12) months preceding the claim.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">5. Confidentiality</h2>
          <p>
            Both parties agree to maintain the confidentiality of proprietary information shared during the course of engagement. This obligation survives termination of the service agreement for a period of three (3) years.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">6. Termination</h2>
          <p>
            Either party may terminate a service agreement with 30 days written notice. TIXSYNC SOLUTIONS reserves the right to terminate services immediately in the event of payment default or breach of these terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">7. Contact</h2>
          <p>
            For questions about these Terms of Service, contact us at{" "}
            <a href="mailto:info@tixsyncsolutions.com" className="text-brand-400 hover:text-brand-300 transition-colors">info@tixsyncsolutions.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
