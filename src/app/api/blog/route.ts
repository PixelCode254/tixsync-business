import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ posts: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    let slug = slugify(body.title);
    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const post = await prisma.blogPost.create({
      data: {
        title: body.title,
        slug,
        content: body.content || "",
        excerpt: body.excerpt || null,
        coverImage: body.coverImage || null,
        tags: body.tags || [],
        published: body.published ?? false,
        author: body.author || "TIXSYNC Team",
      },
    });
    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error) {
    console.error("Blog create error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
