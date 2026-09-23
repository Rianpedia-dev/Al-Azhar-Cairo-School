// src/app/api/tugas/[id]/status/route.ts per PRD 8.5
import { NextResponse } from "next/server";
import { mockTugas } from "@/lib/mock-data";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const tugas = mockTugas.find((t) => t.id === id);

  if (!tugas) {
    return NextResponse.json(
      { success: false, error: "Tugas tidak ditemukan" },
      { status: 404 }
    );
  }

  try {
    const { status } = await request.json();

    if (!["DRAFT", "PUBLISHED", "CLOSED"].includes(status)) {
      return NextResponse.json(
        { success: false, error: "Status harus salah satu dari: DRAFT, PUBLISHED, CLOSED" },
        { status: 400 }
      );
    }

    const updated = {
      ...tugas,
      status,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: `Status tugas berhasil diperbarui menjadi ${status}`,
      data: updated,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui status tugas" },
      { status: 400 }
    );
  }
}
