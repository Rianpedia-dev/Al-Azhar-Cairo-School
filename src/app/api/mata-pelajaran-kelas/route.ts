// src/app/api/mata-pelajaran-kelas/route.ts per PRD 8.4
import { NextResponse } from "next/server";
import { mockMapelKelas } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ success: true, data: mockMapelKelas });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mataPelajaranId, kelasId, guruId, jadwal } = body;

    if (!mataPelajaranId || !kelasId || !guruId) {
      return NextResponse.json(
        { success: false, error: "mataPelajaranId, kelasId, dan guruId wajib disertakan" },
        { status: 400 }
      );
    }

    const newAssignment = {
      id: `mpk_${Date.now()}`,
      mataPelajaranId,
      kelasId,
      guruId,
      jadwal: jadwal || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        message: "Penugasan mata pelajaran ke kelas dan pendidik berhasil disimpan",
        data: newAssignment,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan penugasan mata pelajaran kelas" },
      { status: 500 }
    );
  }
}
