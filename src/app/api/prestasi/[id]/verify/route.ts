// src/app/api/prestasi/[id]/verify/route.ts per PRD 8.7
import { NextResponse } from "next/server";
import { mockPrestasi } from "@/lib/mock-data";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const prestasi = mockPrestasi.find((p) => p.id === id);

  if (!prestasi) {
    return NextResponse.json(
      { success: false, error: "Prestasi tidak ditemukan" },
      { status: 404 }
    );
  }

  try {
    let isVerified = !prestasi.isVerified;
    try {
      const body = await request.json();
      if (typeof body.isVerified === "boolean") {
        isVerified = body.isVerified;
      }
    } catch {
      // Toggle if no body sent
    }

    const updated = {
      ...prestasi,
      isVerified,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: `Prestasi siswa berhasil ${isVerified ? "diverifikasi resmi" : "dibatalkan verifikasinya"}`,
      data: updated,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memproses verifikasi prestasi" },
      { status: 500 }
    );
  }
}
