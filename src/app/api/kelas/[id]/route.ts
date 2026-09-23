// src/app/api/kelas/[id]/route.ts per PRD 8.3
import { NextResponse } from "next/server";
import { mockKelas, mockUsers } from "@/lib/mock-data";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const kelas = mockKelas.find((k) => k.id === id);

  if (!kelas) {
    return NextResponse.json(
      { success: false, error: "Kelas tidak ditemukan" },
      { status: 404 }
    );
  }

  const siswaList = mockUsers.filter((u) => u.kelasId === kelas.id && u.role === "SISWA");
  const waliKelas = mockUsers.find((u) => u.id === kelas.waliKelasId);

  return NextResponse.json({
    success: true,
    data: {
      ...kelas,
      waliKelas,
      siswa: siswaList,
      totalSiswa: siswaList.length,
    },
  });
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const kelas = mockKelas.find((k) => k.id === id);

  if (!kelas) {
    return NextResponse.json(
      { success: false, error: "Kelas tidak ditemukan" },
      { status: 404 }
    );
  }

  try {
    const body = await request.json();
    const updated = {
      ...kelas,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Data kelas berhasil diperbarui",
      data: updated,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui kelas" },
      { status: 400 }
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const kelas = mockKelas.find((k) => k.id === id);

  if (!kelas) {
    return NextResponse.json(
      { success: false, error: "Kelas tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: `Kelas ${kelas.nama} berhasil dihapus dari sistem`,
  });
}
