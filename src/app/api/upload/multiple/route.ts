// src/app/api/upload/multiple/route.ts per PRD 8.9
import { NextResponse } from "next/server";
import { UPLOAD_CONFIG } from "@/lib/upload";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: "Tidak ada berkas yang dikirim" },
        { status: 400 }
      );
    }

    if (files.length > UPLOAD_CONFIG.maxFilesGuru) {
      return NextResponse.json(
        {
          success: false,
          error: `Maksimal pengunggahan adalah ${UPLOAD_CONFIG.maxFilesGuru} berkas sekaligus`,
        },
        { status: 400 }
      );
    }

    const uploaded = files.map((file) => {
      const isPdf = file.type.includes("pdf");
      return {
        nama: file.name,
        url: `/uploads/${file.name}`,
        type: isPdf ? "pdf" : "image",
        size: file.size,
      };
    });

    return NextResponse.json(
      {
        success: true,
        message: `Berhasil mengunggah ${uploaded.length} berkas`,
        data: uploaded,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memproses unggahan berkas jamak" },
      { status: 500 }
    );
  }
}
