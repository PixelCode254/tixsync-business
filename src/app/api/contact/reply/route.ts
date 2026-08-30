import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { sendEmail, buildReplyHtml } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { messageId, replyMessage } = await request.json();

    if (!messageId || !replyMessage?.trim()) {
      return NextResponse.json({ error: "messageId and replyMessage required" }, { status: 400 });
    }

    const original = await prisma.contactMessage.findUnique({ where: { id: messageId } });
    if (!original) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const result = await sendEmail({
      to: original.email,
      subject: `Re: ${original.subject || "Your inquiry to TIXSYNC SOLUTIONS"}`,
      html: buildReplyHtml(original.name, original.subject, original.message, replyMessage.trim()),
    });

    await prisma.contactMessage.update({ where: { id: messageId }, data: { replied: true, read: true } });

    return NextResponse.json({ success: true, emailSent: result.success });
  } catch (error) {
    console.error("Reply error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
