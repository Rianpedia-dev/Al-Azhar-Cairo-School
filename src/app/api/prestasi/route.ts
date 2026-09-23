// src/app/api/prestasi/route.ts per PRD 8.7
import { NextResponse } from "next/server";
import { mockPrestasi, mockUsers } from "@/lib/mock-data";
import { validatePrestasiInput } from "@/lib/validators/prestasi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const kategori = searchParams.get("kategori");
  const tingkat = searchParams.get("tingkat");
  const isVerified = searchParams.get("isVerified");
  const siswaId = searchParams.get("siswaId");
  const search = searchParams.get("search");

  let filtered = mockPrestasi.map((p) => {
    const siswa = mockUsers.find((u) => u.id === p.siswaId);
    const diinputOleh = mockUsers.find((u) => u.id === p.diinputOlehId);
    return {
      ...p,
      siswa,
      diinputOleh,
    };
  });

  if (kategori && kategori !== "ALL") {
    filtered = filtered.filter((p) => p.kategori === kategori);
  }

  if (tingkat && tingkat !== "ALL") {
    filtered = filtered.filter((p) => p.tingkat === tingkat);
  }

  if (isVerified !== null && isVerified !== undefined && isVerified !== "") {
    const boolVal = isVerified === "true";
    filtered = filtered.filter((p) => p.isVerified === boolVal);
  }

  if (siswaId) {
    filtered = filtered.filter((p) => p.siswaId === siswaId);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.judul.toLowerCase().includes(q) ||
        (p.deskripsi && p.deskripsi.toLowerCase().includes(q)) ||
        (p.siswa?.name && p.siswa.name.toLowerCase().includes(q))
    );
  }

  return NextResponse.json({ success: true, data: filtered });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validatePrestasiInput(body);

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    const newPrestasi = {
      id: `pr_${Date.now()}`,
      judul: body.judul,
      deskripsi: body.deskripsi || null,
      kategori: body.kategori,
      tingkat: body.tingkat,
      peringkat: body.peringkat || null,
      tanggal: body.tanggal || new Date().toISOString(),
      bukti: body.bukti || null,
      isVerified: false,
      siswaId: body.siswaId || "u5",
      diinputOlehId: body.diinputOlehId || "u2",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        message: "Data prestasi berhasil disimpan dan diajukan untuk verifikasi",
        data: newPrestasi,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal mencatat prestasi siswa" },
      { status: 400 }
    );
  }
}
