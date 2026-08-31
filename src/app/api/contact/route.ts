import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";
import { sendEmail, buildAdminNotificationHtml } from "@/lib/email";

function detectIntent(message: string): string {
  const lower = message.toLowerCase();
  if (["price","pricing","cost","quote","budget","how much","rates","charges","fee","affordable","expensive","estimate"].some((k) => lower.includes(k))) return "pricing";
  if (["service","services","offer","provide","what do you do","capabilities","solutions","specialize","expertise"].some((k) => lower.includes(k))) return "services";
  if (["job","opportunity","hiring","vacancy","project","work with","looking for","need help","need a","want to build","want to create"].some((k) => lower.includes(k))) return "job";
  if (["partner","partnership","collaborate","collaboration","joint venture","together","alliance","referral"].some((k) => lower.includes(k))) return "partnership";
  return "general";
}

function buildSmartAutoReplyHtml(name: string, message: string): string {
  const intent = detectIntent(message);
  const responses: Record<string, { title: string; body: string }> = {
    pricing: { title: "Your Custom Quote", body: `We'd love to provide you with a tailored quote. Every project is unique, so our team will review your requirements and prepare a detailed proposal within <span class="hl">24 hours</span>. Feel free to share any additional details about scope, timeline, or features.` },
    services: { title: "Our Services", body: `TIXSYNC SOLUTIONS offers web development, cybersecurity, cloud infrastructure, digital transformation, and consulting services. Each is tailored to your needs. We'll reach out within <span class="hl">24 hours</span> to discuss the best fit for your goals.` },
    job: { title: "Let's Work Together!", body: `We're excited about the possibility of working with you! Our team specializes in enterprise-grade digital solutions. You'll get a dedicated project manager, transparent timelines, and post-launch support. We'll connect within <span class="hl">24 hours</span> to discuss the details.` },
    partnership: { title: "Partnership Opportunities", body: `We love exploring collaboration opportunities! Whether it's joint service delivery, referral partnerships, or co-development, we're open to creating mutual value. We'll reach out within <span class="hl">24 hours</span> to discuss the possibilities.` },
    general: { title: "Thank You!", body: `We've received your inquiry and our team will review it within <span class="hl">24 hours</span>. A dedicated account manager will reach out to discuss your project requirements.` },
  };
  const { title, body } = responses[intent];
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    body{font-family:'Segoe UI',Arial,sans-serif;background:#0d1117;color:#e6e6e6;margin:0;padding:0}
    .c{max-width:600px;margin:0 auto;padding:40px 20px}
    .h{text-align:center;margin-bottom:32px}
    .logo{display:inline-flex;align-items:center;gap:10px}
    .lb{background:rgba(26,92,245,0.1);border:1px solid rgba(26,92,245,0.2);border-radius:10px;width:40px;height:40px;display:flex;align-items:center;justify-content:center}
    .lt{font-family:monospace;font-weight:bold;font-size:18px;color:#59a0ff}
    .br{font-size:16px;font-weight:600;color:#fff}
    .tg{font-size:10px;text-transform:uppercase;letter-spacing:3px;color:#868e96}
    .title{font-size:24px;font-weight:700;color:#fff;margin-bottom:8px}
    .dv{height:1px;background:rgba(255,255,255,0.05);margin:24px 0}
    .msg{font-size:15px;line-height:1.7;color:#adb5bd}
    .hl{color:#59a0ff;font-weight:500}
    .ft{text-align:center;margin-top:32px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.05)}
    .ftx{font-size:12px;color:#495057}
    .cta{display:inline-block;background:#1a5cf5;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:500;font-size:14px;margin:16px 0}
  </style></head><body><div class="c"><div class="h"><div class="logo"><div class="lb"><span class="lt">T</span></div><div><div class="br">TIXSYNC SOLUTIONS</div><div class="tg">Enterprise Digital Solutions</div></div></div></div>
  <div class="title">${title}</div><div class="dv"></div>
  <div class="msg"><p>Hi <span class="hl">${name}</span>,</p><p>${body}</p><p>For urgent matters, contact us directly at <span class="hl">+254 704 440 164</span>.</p></div>
  <div style="text-align:center"><a href="https://tixsyncsolutions.com" class="cta">Visit Our Website</a></div>
  <div class="ft"><p class="ftx">TIXSYNC SOLUTIONS<br>Enterprise Digital Solutions · Cybersecurity · Cloud Infrastructure</p></div></div></body></html>`;
}

// NOTE: This in-memory rate limiter is ineffective on Vercel serverless because each
// serverless function instance has its own isolated memory. Use an external store
// (e.g. Redis, Upstash, or Vercel KV) for production rate limiting.
const submissions = new Map<string, number[]>();
const RATE_LIMIT = 60 * 1000;
const MAX = 5;

function checkRate(ip: string) {
  const now = Date.now();
  const ts = submissions.get(ip) || [];
  const recent = ts.filter(t => now - t < RATE_LIMIT);
  if (recent.length >= MAX) return false;
  recent.push(now);
  submissions.set(ip, recent);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    if (!checkRate(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await request.json();
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "Validation failed", details: result.error.flatten() }, { status: 400 });
    }

    const { name, email, phone, company, subject, message, service, budget } = result.data;

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: name.trim(), email: email.trim().toLowerCase(),
        phone: phone?.trim() || null, company: company?.trim() || null,
        subject: subject?.trim() || null, message: message.trim(),
        service: service?.trim() || null, budget: budget?.trim() || null,
        source: "form",
      },
    });

    // Smart auto-reply to client based on message content
    await sendEmail({
      to: email.trim().toLowerCase(),
      subject: `Thank you for your inquiry — TIXSYNC SOLUTIONS`,
      html: buildSmartAutoReplyHtml(name.trim(), message.trim()),
    });

    // Notify admin
    const adminEmail = process.env.COMPANY_EMAIL || process.env.SMTP_USER;
    if (adminEmail) {
      await sendEmail({
        to: adminEmail,
        subject: `[New Lead] ${subject || name.trim()} — TIXSYNC`,
        html: buildAdminNotificationHtml(name.trim(), email.trim().toLowerCase(), subject ?? null, message.trim(), company ?? null),
      });
    }

    return NextResponse.json({ success: true, id: contactMessage.id }, { status: 201 });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const unreadOnly = searchParams.get("unread") === "true";
    const where = unreadOnly ? { read: false, archived: false } : { archived: false };

    const [messages, total] = await Promise.all([
      prisma.contactMessage.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * limit, take: limit }),
      prisma.contactMessage.count({ where }),
    ]);

    return NextResponse.json({ messages, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch {
    return NextResponse.json({ messages: [], pagination: { page: 1, limit: 20, total: 0, pages: 0 } });
  }
}
