// src/app/api/tugas/[id]/pengumpulan/[pid]/route.ts per PRD 8.6
import { NextResponse } from "next/server";
import { mockPengumpulan, mockUsers, mockTugas } from "@/lib/mock-data";

interface RouteParams {
  params: Promise<{ id: string; pid: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id, pid } = await params;
  const submission = mockPengumpulan.find((p) => p.id === pid && p.tugasId === id);

  if (!submission) {
    return NextResponse.json(
      { success: false, error: "Data pengumpulan tugas tidak ditemukan" },
      { status: 404 }
    );
  }

  const siswa = mockUsers.find((u) => u.id === submission.siswaId);
  const tugas = mockTugas.find((t) => t.id === id);

  return NextResponse.json({
    success: true,
    data: {
      ...submission,
      siswa,
      tugas,
    },
  });
}
