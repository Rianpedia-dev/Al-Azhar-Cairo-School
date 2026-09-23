// src/app/api/tugas/[id]/pengumpulan/[pid]/resubmit/route.ts per PRD 8.6
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
    const { files, catatan } = await request.json();

    if (!Array.isArray(files) || files.length === 0) {
      return NextResponse.json(
        { success: false, error: "Minimal 1 berkas revisi wajib diunggah" },
        { status: 400 }
      );
    }

    const updated = {
      ...submission,
      files,
      catatan: catatan || submission.catatan,
      statusKoreksi: "DIKUMPULKAN" as const,
      tanggalKumpul: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Tugas revisi berhasil dikumpulkan kembali",
      data: updated,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal mengunggah ulang tugas revisi" },
      { status: 400 }
    );
  }
}
