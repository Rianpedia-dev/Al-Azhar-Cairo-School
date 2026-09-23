// src/app/api/mata-pelajaran/route.ts per PRD 8.4
import { NextResponse } from "next/server";
import { mockMataPelajaran } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const jenjangId = searchParams.get("jenjangId");
  const search = searchParams.get("search");

  let filtered = [...mockMataPelajaran];

  if (jenjangId) {
    filtered = filtered.filter((m) => m.jenjangId === jenjangId);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (m) => m.nama.toLowerCase().includes(q) || m.kode.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ success: true, data: filtered });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.nama || !body.kode) {
      return NextResponse.json(
        { success: false, error: "Nama dan kode mata pelajaran wajib diisi" },
        { status: 400 }
      );
    }

    const newMapel = {
      id: `mp_${Date.now()}`,
      nama: body.nama,
      kode: body.kode.toUpperCase(),
      deskripsi: body.deskripsi || null,
      jenjangId: body.jenjangId || "j1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, data: newMapel }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Format request tidak valid" },
      { status: 400 }
    );
  }
}
