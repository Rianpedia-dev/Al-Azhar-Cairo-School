// src/app/api/tugas/[id]/route.ts per PRD 8.5
import { NextResponse } from "next/server";
import { mockTugas } from "@/lib/mock-data";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const tugas = mockTugas.find((t) => t.id === id);

  if (!tugas) {
    return NextResponse.json(
      { success: false, error: "Tugas tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: tugas });
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const tugas = mockTugas.find((t) => t.id === id);

  if (!tugas) {
    return NextResponse.json(
      { success: false, error: "Tugas tidak ditemukan" },
      { status: 404 }
    );
  }

  try {
    const body = await request.json();
    const updated = {
      ...tugas,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Tugas berhasil diperbarui",
      data: updated,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui tugas" },
      { status: 400 }
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const tugas = mockTugas.find((t) => t.id === id);

  if (!tugas) {
    return NextResponse.json(
      { success: false, error: "Tugas tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: `Tugas "${tugas.judul}" berhasil dihapus`,
  });
}
