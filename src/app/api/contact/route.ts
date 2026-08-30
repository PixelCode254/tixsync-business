import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";
import { sendEmail, buildAutoReplyHtml, buildAdminNotificationHtml } from "@/lib/email";

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
      },
    });

    // Auto-reply to client
    await sendEmail({
      to: email.trim().toLowerCase(),
      subject: `Thank you for your inquiry — TIXSYNC SOLUTIONS`,
      html: buildAutoReplyHtml(name.trim()),
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
