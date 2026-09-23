// src/app/api/tugas/route.ts per PRD 8.5
import { NextResponse } from "next/server";
import { mockTugas } from "@/lib/mock-data";
import { validateTugasInput } from "@/lib/validators/tugas";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const jenisTugas = searchParams.get("jenisTugas");
  const guruId = searchParams.get("guruId");
  const search = searchParams.get("search");

  let filtered = [...mockTugas];

  if (status && status !== "ALL") {
    filtered = filtered.filter((t) => t.status === status);
  }

  if (jenisTugas && jenisTugas !== "ALL") {
    filtered = filtered.filter((t) => t.jenisTugas === jenisTugas);
  }

  if (guruId) {
    filtered = filtered.filter((t) => t.guruId === guruId);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.judul.toLowerCase().includes(q) ||
        (t.deskripsi && t.deskripsi.toLowerCase().includes(q))
    );
  }

  return NextResponse.json({ success: true, data: filtered });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateTugasInput(body);

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    const newTugas = {
      id: `tgs_${Date.now()}`,
      judul: body.judul,
      deskripsi: body.deskripsi || null,
      jenisTugas: body.jenisTugas,
      deadline: body.deadline,
      lampiran: body.lampiran || null,
      status: body.status || "DRAFT",
      guruId: body.guruId || "u2",
      mataPelajaranKelasId: body.mataPelajaranKelasId || "mpk1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, data: newTugas }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal membuat tugas baru" },
      { status: 400 }
    );
  }
}
