// src/app/api/tugas/[id]/pengumpulan/[pid]/revisi/route.ts per PRD 8.6
import { NextResponse } from "next/server";
import { mockPengumpulan } from "@/lib/mock-data";

interface RouteParams {
  params: Promise<{ id: string; pid: string }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { id, pid } = await params;
  const submission = mockPengumpulan.find((p) => p.id === pid && p.tugasId === id);

  if (!submission) {
    return NextResponse.json(
      { success: false, error: "Data pengumpulan tugas tidak ditemukan" },
      { status: 404 }
    );
  }

  try {
    const { catatanRevisi } = await request.json();

    const updated = {
      ...submission,
      komentar: catatanRevisi || submission.komentar,
      statusKoreksi: "REVISI" as const,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Tugas berhasil ditandai memerlukan perbaikan/revisi oleh siswa",
      data: updated,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal meminta revisi tugas" },
      { status: 400 }
    );
  }
}
