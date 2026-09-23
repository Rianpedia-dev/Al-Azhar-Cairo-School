// src/app/api/kelas/route.ts per PRD 8.3
import { NextResponse } from "next/server";
import { mockKelas } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const jenjangId = searchParams.get("jenjangId");
  const tahunAjaran = searchParams.get("tahunAjaran");

  let filtered = [...mockKelas];

  if (jenjangId) {
    filtered = filtered.filter((k) => k.jenjangId === jenjangId);
  }

  if (tahunAjaran) {
    filtered = filtered.filter((k) => k.tahunAjaran === tahunAjaran);
  }

  return NextResponse.json({ success: true, data: filtered });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.nama || !body.tingkat || !body.tahunAjaran) {
      return NextResponse.json(
        { success: false, error: "Nama kelas, tingkat, dan tahun ajaran wajib diisi" },
        { status: 400 }
      );
    }

    const newKelas = {
      id: `kls_${Date.now()}`,
      nama: body.nama,
      tingkat: Number(body.tingkat),
      tahunAjaran: body.tahunAjaran,
      jenjangId: body.jenjangId || (Number(body.tingkat) <= 6 ? "j1" : "j2"),
      waliKelasId: body.waliKelasId || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, data: newKelas }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Format request tidak valid" },
      { status: 400 }
    );
  }
}
