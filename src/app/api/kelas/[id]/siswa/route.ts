// src/app/api/kelas/[id]/siswa/route.ts per PRD 8.3
import { NextResponse } from "next/server";
import { mockKelas, mockUsers } from "@/lib/mock-data";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const kelas = mockKelas.find((k) => k.id === id);

  if (!kelas) {
    return NextResponse.json(
      { success: false, error: "Kelas tidak ditemukan" },
      { status: 404 }
    );
  }

  try {
    const { siswaId } = await request.json();

    if (!siswaId) {
      return NextResponse.json(
        { success: false, error: "ID Siswa (siswaId) wajib disertakan" },
        { status: 400 }
      );
    }

    const siswa = mockUsers.find((u) => u.id === siswaId && u.role === "SISWA");

    if (!siswa) {
      return NextResponse.json(
        { success: false, error: "Siswa tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Siswa ${siswa.name} berhasil ditugaskan ke kelas ${kelas.nama}`,
      data: {
        siswaId: siswa.id,
        kelasId: kelas.id,
        namaSiswa: siswa.name,
        namaKelas: kelas.nama,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal menugaskan siswa ke kelas" },
      { status: 400 }
    );
  }
}
