// src/app/api/prestasi/[id]/route.ts per PRD 8.7
import { NextResponse } from "next/server";
import { mockPrestasi, mockUsers } from "@/lib/mock-data";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const prestasi = mockPrestasi.find((p) => p.id === id);

  if (!prestasi) {
    return NextResponse.json(
      { success: false, error: "Prestasi tidak ditemukan" },
      { status: 404 }
    );
  }

  const siswa = mockUsers.find((u) => u.id === prestasi.siswaId);
  const diinputOleh = mockUsers.find((u) => u.id === prestasi.diinputOlehId);

  return NextResponse.json({
    success: true,
    data: {
      ...prestasi,
      siswa,
      diinputOleh,
    },
  });
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const prestasi = mockPrestasi.find((p) => p.id === id);

  if (!prestasi) {
    return NextResponse.json(
      { success: false, error: "Prestasi tidak ditemukan" },
      { status: 404 }
    );
  }

  try {
    const body = await request.json();
    const updated = {
      ...prestasi,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Data prestasi berhasil diperbarui",
      data: updated,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui data prestasi" },
      { status: 400 }
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const prestasi = mockPrestasi.find((p) => p.id === id);

  if (!prestasi) {
    return NextResponse.json(
      { success: false, error: "Prestasi tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: `Data prestasi "${prestasi.judul}" berhasil dihapus`,
  });
}
