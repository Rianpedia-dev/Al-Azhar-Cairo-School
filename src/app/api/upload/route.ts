import { NextResponse } from "next/server";
import { UPLOAD_CONFIG, generateUploadFileName } from "@/lib/upload";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const userId = (formData.get("userId") as string) || "user_demo";
    const tugasId = (formData.get("tugasId") as string) || "tugas_demo";

    if (!file) {
      return NextResponse.json({ success: false, error: "Tidak ada file yang diunggah" }, { status: 400 });
    }

    if (file.size > UPLOAD_CONFIG.maxFileSize) {
      return NextResponse.json(
        { success: false, error: "Ukuran berkas melebihi batas 10MB (PRD 7.6.4)" },
        { status: 400 }
      );
    }

    const savedFilename = generateUploadFileName(userId, tugasId, file.name);

    return NextResponse.json({
      success: true,
      data: {
        nama: file.name,
        savedFilename,
        url: `/uploads/${savedFilename}`,
        size: file.size,
        type: file.type,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Gagal memproses file upload" }, { status: 500 });
  }
}
