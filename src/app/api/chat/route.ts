import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the TIXSYNC SOLUTIONS AI assistant. You help visitors learn about our services:
- Cybersecurity (Penetration Testing, SOC Operations, Security Audits)
- Web Development (Full-stack, React, Next.js, Node.js)
- Cloud Infrastructure (AWS, Azure, Migration, DevOps)
- Digital Transformation
- Compliance (ISO 27001, GDPR)

Company info:
- Founded by Cornelius Maina Nyaga
- Based in Kenya, serving clients across Africa
- Contact: tixsyncsolutions@gmail.com, +254704440164
- Website: tixsyncsolutions.com

Be helpful, professional, and concise. If someone asks about pricing, direct them to the contact page. If they ask about jobs, mention the careers section on the about page.`;

const KNOWLEDGE_BASE: Record<string, string> = {
  services: "TIXSYNC SOLUTIONS offers Cybersecurity, Web Development, Cloud Infrastructure, Digital Transformation, and Compliance services. We serve clients across Africa from our base in Kenya.",
  cybersecurity: "Our cybersecurity services include Penetration Testing, SOC Operations, and Security Audits. We help organizations identify and mitigate security vulnerabilities.",
  web: "We build full-stack web applications using React, Next.js, and Node.js. Our web development team creates modern, performant, and scalable solutions.",
  cloud: "Our cloud services cover AWS and Azure, including migration, DevOps, and infrastructure management. We help businesses move to and optimize in the cloud.",
  compliance: "We help organizations achieve and maintain compliance with standards like ISO 27001 and GDPR, ensuring data protection and regulatory adherence.",
  pricing: "For pricing information, please reach out to us at tixsyncsolutions@gmail.com or +254704440164. You can also visit the contact page on our website.",
  contact: "You can contact TIXSYNC SOLUTIONS at tixsyncsolutions@gmail.com or call +254704440164. Visit tixsyncsolutions.com for more details.",
  about: "TIXSYNC SOLUTIONS was founded by Cornelius Maina Nyaga. We are based in Kenya and serve clients across Africa with enterprise-grade digital solutions.",
  careers: "Check out the About page on our website for career opportunities at TIXSYNC SOLUTIONS. We're always looking for talented individuals to join our team.",
  digital: "Our Digital Transformation services help businesses modernize their operations, integrate new technologies, and improve efficiency across the organization.",
};

function getFallbackResponse(messages: { role: string; content: string }[]): string {
  const lastMsg = messages[messages.length - 1]?.content.toLowerCase() || "";

  for (const [key, response] of Object.entries(KNOWLEDGE_BASE)) {
    if (lastMsg.includes(key)) return response;
  }

  if (lastMsg.match(/\b(hi|hello|hey|greet|morning|afternoon|evening)\b/)) {
    return "Hello! Welcome to TIXSYNC SOLUTIONS. I can help you learn about our cybersecurity, web development, cloud infrastructure, and digital transformation services. What would you like to know?";
  }
  if (lastMsg.match(/\b(who|what|about|company|team)\b/)) {
    return "TIXSYNC SOLUTIONS was founded by Cornelius Maina Nyaga and is based in Kenya. We specialize in cybersecurity, web development, cloud infrastructure, and digital transformation. How can I assist you further?";
  }
  if (lastMsg.match(/\b(thank|thanks|bye|goodbye)\b/)) {
    return "You're welcome! Feel free to reach out anytime at tixsyncsolutions@gmail.com or +254704440164. Have a great day!";
  }
  if (lastMsg.match(/\b(help|what can|how)\b/)) {
    return "I can help you with information about our services, pricing inquiries, career opportunities, and general questions about TIXSYNC SOLUTIONS. What would you like to know?";
  }

  return "Thanks for your question! For the most detailed answer, I'd recommend reaching out to our team directly at tixsyncsolutions@gmail.com or +254704440164. Is there anything specific about our services I can help with?";
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ reply: "Please send a message to start the conversation." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...messages.map((m: { role: string; content: string }) => ({
                role: m.role,
                content: m.content,
              })),
            ],
            max_tokens: 500,
            temperature: 0.7,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          return NextResponse.json({ reply: data.choices[0].message.content });
        }
      } catch {
        // Fall through to fallback
      }
    }

    const reply = getFallbackResponse(messages);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: "Something went wrong. Please try again." }, { status: 500 });
  }
}
