import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function detectIntent(message: string): string {
  const lower = message.toLowerCase();
  if (["price","pricing","cost","quote","budget","how much","rates","charges","fee","affordable","expensive","estimate"].some((k) => lower.includes(k))) return "pricing";
  if (["service","services","offer","provide","what do you do","capabilities","solutions","specialize","expertise"].some((k) => lower.includes(k))) return "services";
  if (["job","opportunity","hiring","vacancy","project","work with","looking for","need help","need a","want to build","want to create"].some((k) => lower.includes(k))) return "job";
  if (["partner","partnership","collaborate","collaboration","joint venture","together","alliance","referral"].some((k) => lower.includes(k))) return "partnership";
  return "general";
}

function generateSmartReply(clientName: string, message: string): string {
  const intent = detectIntent(message);
  const name = clientName || "there";
  const replies: Record<string, string> = {
    pricing: `Hi ${name}! 👋 Thanks for reaching out. We'd be happy to give you a custom quote. Every project is different, so let's chat about your specific needs. Could you share a few details about what you're looking for?\n\nFor a quicker response, email us at info@tixsyncsolutions.com`,
    services: `Hi ${name}! 👋 Great to hear from you. We offer web development, cybersecurity, cloud infrastructure, and digital transformation services. Want to know more about any specific service? Happy to help!`,
    job: `Hi ${name}! 🚀 That sounds exciting — we'd love to work with you! Tell us more about your project and we'll get back with next steps. For detailed discussions, drop us an email at info@tixsyncsolutions.com`,
    partnership: `Hi ${name}! 👋 Love the partnership idea. We're always open to collaborations that create value. Let's connect — email us at info@tixsyncsolutions.com or call +254 704 440 164 to discuss further.`,
    general: `Hi ${name}! 👋 Thanks for messaging us. We've got your message and will get back to you shortly. For anything urgent, feel free to call us at +254 704 440 164.`,
  };
  return replies[intent] || replies.general;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { From, Body, ProfileName } = body;

    const phone = From?.replace("whatsapp:", "") || "";
    const name = ProfileName || "WhatsApp User";
    const message = Body || "";

    if (!phone || !message) {
      return NextResponse.json({ error: "Missing From or Body" }, { status: 400 });
    }

    await prisma.contactMessage.create({
      data: {
        name,
        email: `${phone}@whatsapp.placeholder`,
        message,
        source: "whatsapp",
      },
    });

    const reply = generateSmartReply(name, message);

    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${reply.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</Message>
</Response>`;

    return new NextResponse(twiml, {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  } catch (error) {
    console.error("WhatsApp webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "TIXSYNC WhatsApp webhook is active",
  });
}
