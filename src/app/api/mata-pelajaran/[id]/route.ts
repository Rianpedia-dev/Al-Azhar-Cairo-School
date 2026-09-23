// src/app/api/mata-pelajaran/[id]/route.ts per PRD 8.4
import { NextResponse } from "next/server";
import { mockMataPelajaran } from "@/lib/mock-data";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const mapel = mockMataPelajaran.find((m) => m.id === id);

  if (!mapel) {
    return NextResponse.json(
      { success: false, error: "Mata pelajaran tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: mapel });
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const mapel = mockMataPelajaran.find((m) => m.id === id);

  if (!mapel) {
    return NextResponse.json(
      { success: false, error: "Mata pelajaran tidak ditemukan" },
      { status: 404 }
    );
  }

  try {
    const body = await request.json();
    const updated = {
      ...mapel,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Mata pelajaran berhasil diperbarui",
      data: updated,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui mata pelajaran" },
      { status: 400 }
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const mapel = mockMataPelajaran.find((m) => m.id === id);

  if (!mapel) {
    return NextResponse.json(
      { success: false, error: "Mata pelajaran tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: `Mata pelajaran ${mapel.nama} (${mapel.kode}) berhasil dihapus`,
  });
}
