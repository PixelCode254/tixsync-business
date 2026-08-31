import { NextRequest, NextResponse } from "next/server";

interface AutoReplyRequest {
  channel: "email" | "whatsapp";
  clientName: string;
  clientMessage: string;
  clientEmail?: string;
  clientPhone?: string;
}

function detectIntent(message: string): string {
  const lower = message.toLowerCase();

  const pricingKeywords = [
    "price", "pricing", "cost", "quote", "budget", "how much", "rates",
    "charges", "fee", "affordable", "expensive", "estimate", "invoice",
  ];
  if (pricingKeywords.some((k) => lower.includes(k))) return "pricing";

  const serviceKeywords = [
    "service", "services", "offer", "provide", "what do you do", "capabilities",
    "solutions", "specialize", "expertise", "areas", "do you do", "can you",
  ];
  if (serviceKeywords.some((k) => lower.includes(k))) return "services";

  const jobKeywords = [
    "job", "opportunity", "hiring", "vacancy", "position", "available",
    "freelance", "contract", "project", "work with", "looking for", "need help",
    "need a", "require", "want to build", "want to create", "looking to",
  ];
  if (jobKeywords.some((k) => lower.includes(k))) return "job";

  const partnershipKeywords = [
    "partner", "partnership", "collaborate", "collaboration", "joint venture",
    "together", "alliance", "strategic", "referral", "agency",
  ];
  if (partnershipKeywords.some((k) => lower.includes(k))) return "partnership";

  return "general";
}

function generateEmailReply(clientName: string, intent: string): { subject: string; body: string } {
  const intents: Record<string, { subject: string; body: string }> = {
    pricing: {
      subject: "Custom Quote for Your Project — TIXSYNC SOLUTIONS",
      body: `Hi ${clientName},\n\nThank you for your interest in our services! We'd love to provide you with a tailored quote that fits your specific requirements.\n\nEvery project is unique, and we believe in transparent pricing. Our team will review your needs and prepare a detailed proposal within 24 hours.\n\nIn the meantime, feel free to share any additional details about your project — scope, timeline, or specific features you have in mind — so we can prepare the most accurate estimate.\n\nLooking forward to working together!`,
    },
    services: {
      subject: "Our Services at TIXSYNC SOLUTIONS",
      body: `Hi ${clientName},\n\nGreat question! TIXSYNC SOLUTIONS offers a comprehensive suite of digital services:\n\n• Web Development — Modern, responsive web applications built with cutting-edge technologies\n• Cybersecurity — Security audits, penetration testing, and ongoing protection\n• Cloud Infrastructure — Scalable cloud architecture and migration services\n• Digital Transformation — End-to-end digitization of business processes\n• Consulting — Strategic technology advisory for businesses of all sizes\n\nEach service is tailored to your specific needs. I'd be happy to discuss which solutions would be the best fit for your goals.\n\nWould you like to schedule a brief call to explore how we can help?`,
    },
    job: {
      subject: "We'd Love to Work With You! — TIXSYNC SOLUTIONS",
      body: `Hi ${clientName},\n\nThank you for reaching out — we're excited about the possibility of working together!\n\nTIXSYNC SOLUTIONS specializes in delivering enterprise-grade digital solutions, and we're always eager to take on new challenges. Whether it's a web development project, a security engagement, or a full digital transformation, we have the expertise to deliver results.\n\nHere's what you can expect when working with us:\n• A dedicated project manager assigned to your account\n• Transparent timelines and milestone-based delivery\n• Post-launch support and maintenance\n\nI'd love to learn more about your project. Could we schedule a quick 15-minute call to discuss the details?\n\nLooking forward to it!`,
    },
    partnership: {
      subject: "Partnership Opportunities — TIXSYNC SOLUTIONS",
      body: `Hi ${clientName},\n\nThank you for considering a partnership with TIXSYNC SOLUTIONS! We're always open to exploring collaboration opportunities that create mutual value.\n\nWe've partnered with agencies, startups, and enterprises across various sectors, and we'd love to hear your vision for how we can work together.\n\nSome areas where partnerships have worked well for us:\n• Joint service delivery for enterprise clients\n• Referral programs with complementary service providers\n• White-label development partnerships\n• Co-development of digital products\n\nLet's schedule a call to discuss the possibilities in more detail.`,
    },
    general: {
      subject: "Thank You for Contacting TIXSYNC SOLUTIONS",
      body: `Hi ${clientName},\n\nThank you for reaching out! We've received your message and our team will get back to you within 24 hours.\n\nIn the meantime, feel free to explore our services at tixsyncsolutions.com or reach us directly at +254 704 440 164 for urgent matters.\n\nWe look forward to connecting with you soon!`,
    },
  };

  return intents[intent] || intents.general;
}

function generateWhatsappReply(clientName: string, intent: string): string {
  const intents: Record<string, string> = {
    pricing: `Hi ${clientName}! 👋 Thanks for reaching out. We'd be happy to give you a custom quote. Every project is different, so let's chat about your specific needs. Could you share a few details about what you're looking for?\n\nFor a quicker response, email us at info@tixsyncsolutions.com`,

    services: `Hi ${clientName}! 👋 Great to hear from you. We offer web development, cybersecurity, cloud infrastructure, and digital transformation services. Want to know more about any specific service? Happy to help!`,

    job: `Hi ${clientName}! 🚀 That sounds exciting — we'd love to work with you! Tell us more about your project and we'll get back with next steps. For detailed discussions, drop us an email at info@tixsyncsolutions.com`,

    partnership: `Hi ${clientName}! 👋 Love the partnership idea. We're always open to collaborations that create value. Let's connect — email us at info@tixsyncsolutions.com or call +254 704 440 164 to discuss further.`,

    general: `Hi ${clientName}! 👋 Thanks for messaging us. We've got your message and will get back to you shortly. For anything urgent, feel free to call us at +254 704 440 164.`,
  };

  return intents[intent] || intents.general;
}

export async function POST(request: NextRequest) {
  try {
    const body: AutoReplyRequest = await request.json();
    const { channel, clientName, clientMessage } = body;

    if (!channel || !clientName || !clientMessage) {
      return NextResponse.json(
        { error: "Missing required fields: channel, clientName, clientMessage" },
        { status: 400 }
      );
    }

    const intent = detectIntent(clientMessage);
    const name = clientName.trim() || "there";

    if (channel === "email") {
      const { subject, body: emailBody } = generateEmailReply(name, intent);
      return NextResponse.json({ reply: emailBody, subject });
    }

    const reply = generateWhatsappReply(name, intent);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Auto-reply error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
