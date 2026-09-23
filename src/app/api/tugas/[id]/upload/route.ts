// src/app/api/tugas/[id]/upload/route.ts per PRD 8.5
import { NextResponse } from "next/server";
import { mockTugas } from "@/lib/mock-data";

interface RouteParams {
  params: Promise<{ id: string }>;
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
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Berkas lampiran soal tidak ditemukan" },
        { status: 400 }
      );
    }

    const uploadedAttachment = {
      nama: file.name,
      url: `/uploads/${file.name}`,
      type: file.type.includes("pdf") ? "pdf" : "image",
      size: file.size,
    };

    return NextResponse.json({
      success: true,
      message: `Berkas ${file.name} berhasil diunggah sebagai lampiran tugas`,
      data: uploadedAttachment,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal mengunggah lampiran soal tugas" },
      { status: 500 }
    );
  }
}
