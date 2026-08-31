import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ services });
  } catch {
    return NextResponse.json({ services: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    let slug = slugify(body.title);
    const existing = await prisma.service.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const service = await prisma.service.create({
      data: {
        title: body.title,
        slug,
        description: body.description || "",
        icon: body.icon || null,
        features: body.features || [],
        price: body.price || null,
        published: body.published ?? true,
        order: body.order ?? 0,
      },
    });
    return NextResponse.json({ success: true, service }, { status: 201 });
  } catch (error) {
    console.error("Service create error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { id, ...rest } = body;
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const data: Record<string, unknown> = {};
    if (rest.title !== undefined) data.title = rest.title;
    if (rest.description !== undefined) data.description = rest.description;
    if (rest.icon !== undefined) data.icon = rest.icon;
    if (rest.features !== undefined) data.features = rest.features;
    if (rest.price !== undefined) data.price = rest.price;
    if (rest.published !== undefined) data.published = rest.published;
    if (rest.order !== undefined) data.order = rest.order;
    if (rest.title && !rest.slug) {
      data.slug = slugify(rest.title);
    } else if (rest.slug !== undefined) {
      data.slug = rest.slug;
    }

    const service = await prisma.service.update({ where: { id }, data });
    return NextResponse.json({ success: true, service });
  } catch (error) {
    console.error("Service update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const id = new URL(request.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Service delete error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
