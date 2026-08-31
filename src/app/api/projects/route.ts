import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const slug = searchParams.get("slug");

    if (slug) {
      const project = await prisma.project.findUnique({ where: { slug } });
      if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json({ project });
    }

    const where: Record<string, unknown> = { published: true };
    if (featured === "true") where.featured = true;

    const projects = await prisma.project.findMany({
      where,
      orderBy: { order: "asc" },
      take: 50,
    });
    return NextResponse.json({ projects });
  } catch {
    return NextResponse.json({ projects: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    let slug = slugify(body.title);
    const existing = await prisma.project.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const project = await prisma.project.create({
      data: {
        title: body.title, slug, description: body.description,
        category: body.category, techStack: body.techStack || [],
        imageUrl: body.imageUrl || null, liveUrl: body.liveUrl || null,
        githubUrl: body.githubUrl || null, content: body.content || null,
        featured: body.featured ?? false, published: body.published ?? true,
        order: body.order ?? 0,
      },
    });
    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error) {
    console.error("Project create error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id, ...data } = await request.json();
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    if (data.title && !data.slug) {
      data.slug = slugify(data.title);
    }

    const project = await prisma.project.update({ where: { id }, data });
    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("Project update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const id = new URL(request.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Project delete error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
