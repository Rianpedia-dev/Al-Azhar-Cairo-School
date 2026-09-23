// src/app/api/kelas/[id]/siswa/[sid]/route.ts per PRD 8.3
import { NextResponse } from "next/server";
import { mockKelas, mockUsers } from "@/lib/mock-data";

interface RouteParams {
  params: Promise<{ id: string; sid: string }>;
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id, sid } = await params;
  const kelas = mockKelas.find((k) => k.id === id);
  const siswa = mockUsers.find((u) => u.id === sid);

  if (!kelas) {
    return NextResponse.json(
      { success: false, error: "Kelas tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: `Siswa ${siswa?.name || sid} berhasil dikeluarkan dari kelas ${kelas.nama}`,
  });
}
