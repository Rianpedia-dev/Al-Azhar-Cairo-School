// src/app/api/tugas/[id]/pengumpulan/route.ts per PRD 8.6
import { NextResponse } from "next/server";
import { mockPengumpulan, mockTugas, mockUsers } from "@/lib/mock-data";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const submissions = mockPengumpulan
    .filter((p) => p.tugasId === id)
    .map((p) => {
      const siswa = mockUsers.find((u) => u.id === p.siswaId);
      return {
        ...p,
        siswa,
      };
    });

  return NextResponse.json({
    success: true,
    total: submissions.length,
    data: submissions,
  });
}

export async function POST(request: Request, { params }: RouteParams) {
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
    const { siswaId, files, catatan } = body;

    if (!siswaId || !Array.isArray(files) || files.length === 0) {
      return NextResponse.json(
        { success: false, error: "siswaId dan minimal 1 file jawaban wajib disertakan" },
        { status: 400 }
      );
    }

    const newSubmission = {
      id: `pt_${Date.now()}`,
      tugasId: id,
      siswaId,
      files,
      catatan: catatan || null,
      nilai: null,
      komentar: null,
      koreksiFile: null,
      statusKoreksi: "DIKUMPULKAN" as const,
      tanggalKumpul: new Date().toISOString(),
      tanggalKoreksi: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        message: "Tugas berhasil dikumpulkan dan tercatat di sistem",
        data: newSubmission,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memproses pengumpulan tugas" },
      { status: 500 }
    );
  }
}
