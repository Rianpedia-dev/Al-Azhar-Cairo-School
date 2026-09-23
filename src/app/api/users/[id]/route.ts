// src/app/api/users/[id]/route.ts per PRD 8.2
import { NextResponse } from "next/server";
import { mockUsers } from "@/lib/mock-data";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const user = mockUsers.find((u) => u.id === id);

  if (!user) {
    return NextResponse.json(
      { success: false, error: "Pengguna tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: user });
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const user = mockUsers.find((u) => u.id === id);

  if (!user) {
    return NextResponse.json(
      { success: false, error: "Pengguna tidak ditemukan" },
      { status: 404 }
    );
  }

  try {
    const body = await request.json();
    const updatedUser = {
      ...user,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Data pengguna berhasil diperbarui",
      data: updatedUser,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui pengguna" },
      { status: 400 }
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const user = mockUsers.find((u) => u.id === id);

  if (!user) {
    return NextResponse.json(
      { success: false, error: "Pengguna tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: `Pengguna ${user.name} berhasil dihapus dari sistem`,
  });
}
