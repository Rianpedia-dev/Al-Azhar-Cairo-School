// src/app/api/users/[id]/status/route.ts per PRD 8.2
import { NextResponse } from "next/server";
import { mockUsers } from "@/lib/mock-data";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
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
    const isActive = typeof body.isActive === "boolean" ? body.isActive : !user.isActive;

    const updatedUser = {
      ...user,
      isActive,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: `Status akun pengguna berhasil ${isActive ? "diaktifkan" : "dinonaktifkan"}`,
      data: updatedUser,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui status pengguna" },
      { status: 400 }
    );
  }
}
