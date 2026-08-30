import nodemailer from "nodemailer";
import { Resend } from "resend";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
    });
    console.log("[Email] Sent via Gmail:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (smtpError) {
    console.warn("[Email] Gmail failed, trying Resend:", smtpError);
    try {
      const result = await resend.emails.send({
        from: process.env.RESEND_FROM || "TIXSYNC <onboarding@resend.dev>",
        to,
        subject,
        html,
      });
      return { success: true, messageId: result.data?.id };
    } catch (resendError) {
      console.error("[Email] All methods failed:", resendError);
      return { success: false, error: resendError };
    }
  }
}

export function buildAutoReplyHtml(name: string) {
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
  <div class="title">Thank You, ${name}!</div><div class="dv"></div>
  <div class="msg"><p>Hi <span class="hl">${name}</span>,</p><p>We've received your inquiry and our team will review it within <span class="hl">24 hours</span>. A dedicated account manager will reach out to discuss your project requirements.</p><p>For urgent matters, contact us directly at <span class="hl">+254 704 440 164</span>.</p></div>
  <div style="text-align:center"><a href="https://tixsyncsolutions.com" class="cta">Visit Our Website</a></div>
  <div class="ft"><p class="ftx">TIXSYNC SOLUTIONS<br>Enterprise Digital Solutions · Cybersecurity · Cloud Infrastructure</p></div></div></body></html>`;
}

export function buildAdminNotificationHtml(name: string, email: string, subject: string | null, message: string, company: string | null) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    body{font-family:'Segoe UI',Arial,sans-serif;background:#0d1117;color:#e6e6e6;margin:0;padding:0}
    .c{max-width:600px;margin:0 auto;padding:40px 20px}
    .badge{display:inline-block;background:rgba(26,92,245,0.1);border:1px solid rgba(26,92,245,0.2);border-radius:6px;padding:4px 12px;font-size:12px;color:#59a0ff;font-weight:600;margin-bottom:16px}
    .title{font-size:22px;font-weight:700;color:#fff;margin-bottom:8px}
    .dv{height:1px;background:rgba(255,255,255,0.05);margin:20px 0}
    .fl{font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#868e96;margin-bottom:4px}
    .fv{font-size:14px;color:#e6e6e6;margin-bottom:12px}
    .mb{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);border-radius:8px;padding:16px;font-size:14px;line-height:1.6;color:#ced4da;white-space:pre-wrap}
  </style></head><body><div class="c"><div class="badge">New Lead</div><div class="title">New Contact Inquiry</div><div class="dv"></div>
  <div class="fl">From</div><div class="fv">${name} &lt;${email}&gt;${company ? ` — ${company}` : ""}</div>
  <div class="fl">Subject</div><div class="fv">${subject || "(No subject)"}</div>
  <div class="fl">Message</div><div class="mb">${message}</div>
  </div></body></html>`;
}

export function buildReplyHtml(clientName: string, clientSubject: string | null, clientMessage: string, replyMessage: string) {
  const quoted = clientMessage.split("\n").map(l => `&gt; ${l}`).join("<br>");
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    body{font-family:'Segoe UI',Arial,sans-serif;background:#0d1117;color:#e6e6e6;margin:0;padding:0}
    .c{max-width:600px;margin:0 auto;padding:40px 20px}
    .h{text-align:center;margin-bottom:32px}
    .logo{display:inline-flex;align-items:center;gap:10px}
    .lb{background:rgba(26,92,245,0.1);border:1px solid rgba(26,92,245,0.2);border-radius:10px;width:40px;height:40px;display:flex;align-items:center;justify-content:center}
    .lt{font-family:monospace;font-weight:bold;font-size:18px;color:#59a0ff}
    .br{font-size:16px;font-weight:600;color:#fff}
    .tg{font-size:10px;text-transform:uppercase;letter-spacing:3px;color:#868e96}
    .title{font-size:20px;font-weight:700;color:#fff;margin-bottom:8px}
    .dv{height:1px;background:rgba(255,255,255,0.05);margin:24px 0}
    .rb{font-size:15px;line-height:1.7;color:#adb5bd;margin-bottom:24px}
    .hl{color:#59a0ff;font-weight:500}
    .qs{margin-top:24px;padding:16px;background:rgba(255,255,255,0.02);border-left:3px solid rgba(255,255,255,0.1);border-radius:0 8px 8px 0}
    .ql{font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#868e96;margin-bottom:8px}
    .qt{font-size:13px;line-height:1.6;color:#6c757d}
    .ft{text-align:center;margin-top:32px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.05)}
    .ftx{font-size:12px;color:#495057}
  </style></head><body><div class="c"><div class="h"><div class="logo"><div class="lb"><span class="lt">T</span></div><div><div class="br">TIXSYNC SOLUTIONS</div><div class="tg">Enterprise Digital Solutions</div></div></div></div>
  <div class="title">Reply to Your Inquiry</div><div class="dv"></div>
  <div class="rb"><p>Hi <span class="hl">${clientName}</span>,</p>${replyMessage.split("\n").map(l => `<p>${l}</p>`).join("")}
  <p style="margin-top:16px">If you have further questions, reply to this email or call us at +254 704 440 164.</p></div>
  <div class="qs"><div class="ql">Your original message${clientSubject ? ` — ${clientSubject}` : ""}</div><div class="qt">${quoted}</div></div>
  <div class="ft"><p class="ftx">TIXSYNC SOLUTIONS · info@tixsyncsolutions.com · +254 704 440 164</p></div></div></body></html>`;
}
