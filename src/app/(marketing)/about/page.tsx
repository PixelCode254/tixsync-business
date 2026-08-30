import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About TIXSYNC SOLUTIONS",
  description: "Learn about TIXSYNC SOLUTIONS — our mission, values, and the team protecting Africa's digital infrastructure.",
};

async function getTeamMembers() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/team`, { cache: "no-store" });
    const data = await res.json();
    return data.members || [];
  } catch {
    return [];
  }
}

export default async function AboutPage() {
  const team = await getTeamMembers();

  return (
    <div className="pt-32 pb-20 section-container">
      <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-brand-500">About Us</span>
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
        <span className="text-gradient">Building Trust</span>{" "}
        <span className="text-gradient">Through Technology</span>
      </h1>
      <p className="max-w-3xl text-lg text-surface-400 leading-relaxed mb-16">
        TIXSYNC SOLUTIONS is a Nairobi-based enterprise technology firm specializing in cybersecurity,
        web development, and cloud infrastructure. We partner with organizations across Africa to
        secure their digital assets and accelerate their technology initiatives.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {[
          { title: "Our Mission", desc: "To be Africa's most trusted technology partner, delivering enterprise-grade security and digital solutions that protect and empower businesses." },
          { title: "Our Values", desc: "Integrity, excellence, and accountability. We treat every client's infrastructure as if it were our own — with the highest standards of care." },
          { title: "Our Approach", desc: "Methodical, transparent, and results-driven. We don't just build systems — we build long-term partnerships based on measurable outcomes." },
        ].map(item => (
          <div key={item.title} className="card-glow p-8">
            <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
            <p className="text-sm text-surface-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {team.length > 0 && (
        <section className="mb-20">
          <h2 className="font-display text-3xl font-bold tracking-tight mb-8">
            <span className="text-gradient">Our Team</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member: { id: string; name: string; role: string; bio: string; linkedin: string | null }) => (
              <div key={member.id} className="card-glow p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-500/10 border border-brand-500/20 mb-4">
                  <span className="font-mono text-lg font-bold text-brand-400">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-sm text-brand-400 mb-3">{member.role}</p>
                <p className="text-sm text-surface-400 leading-relaxed mb-4">{member.bio}</p>
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-surface-500 hover:text-brand-400 transition-colors">
                    LinkedIn →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <div id="careers">
        <h2 className="font-display text-3xl font-bold tracking-tight mb-6">
          <span className="text-gradient">Join Our Team</span>
        </h2>
        <p className="max-w-2xl text-surface-400 leading-relaxed mb-8">
          We&apos;re always looking for talented professionals who share our passion for security and technology.
          If you thrive in a fast-paced, mission-driven environment, we want to hear from you.
        </p>
        <a href="mailto:careers@tixsyncsolutions.com" className="btn-primary">
          Send your CV → careers@tixsyncsolutions.com
        </a>
      </div>
    </div>
  );
}
