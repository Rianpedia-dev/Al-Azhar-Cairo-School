// src/app/api/tugas/[id]/pengumpulan/[pid]/koreksi/route.ts per PRD 8.6
import { NextResponse } from "next/server";
import { mockPengumpulan } from "@/lib/mock-data";

interface RouteParams {
  params: Promise<{ id: string; pid: string }>;
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { id, pid } = await params;
  const submission = mockPengumpulan.find((p) => p.id === pid && p.tugasId === id);

  if (!submission) {
    return NextResponse.json(
      { success: false, error: "Data pengumpulan tugas tidak ditemukan" },
      { status: 404 }
    );
  }

  try {
    const { nilai, komentar, koreksiFile } = await request.json();

    if (nilai === undefined || nilai === null || nilai < 0 || nilai > 100) {
      return NextResponse.json(
        { success: false, error: "Nilai harus berupa angka di rentang 0 hingga 100" },
        { status: 400 }
      );
    }

    const updated = {
      ...submission,
      nilai: Number(nilai),
      komentar: komentar || null,
      koreksiFile: koreksiFile || null,
      statusKoreksi: "SUDAH_DINILAI" as const,
      tanggalKoreksi: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Tugas berhasil dikoreksi dan nilai tersimpan",
      data: updated,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan hasil koreksi tugas" },
      { status: 400 }
    );
  }
}
