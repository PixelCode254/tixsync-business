import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ members });
  } catch {
    return NextResponse.json({ members: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const member = await prisma.teamMember.create({
      data: {
        name: body.name,
        role: body.role,
        bio: body.bio || null,
        imageUrl: body.imageUrl || null,
        email: body.email || null,
        linkedin: body.linkedin || null,
        order: body.order ?? 0,
      },
    });
    return NextResponse.json({ success: true, member }, { status: 201 });
  } catch (error) {
    console.error("Team create error:", error);
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
    if (rest.name !== undefined) data.name = rest.name;
    if (rest.role !== undefined) data.role = rest.role;
    if (rest.bio !== undefined) data.bio = rest.bio;
    if (rest.imageUrl !== undefined) data.imageUrl = rest.imageUrl;
    if (rest.email !== undefined) data.email = rest.email;
    if (rest.linkedin !== undefined) data.linkedin = rest.linkedin;
    if (rest.order !== undefined) data.order = rest.order;

    const member = await prisma.teamMember.update({ where: { id }, data });
    return NextResponse.json({ success: true, member });
  } catch (error) {
    console.error("Team update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const id = new URL(request.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.teamMember.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Team delete error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
