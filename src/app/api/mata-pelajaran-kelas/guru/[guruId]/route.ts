// src/app/api/mata-pelajaran-kelas/guru/[guruId]/route.ts per PRD 8.4
import { NextResponse } from "next/server";
import { mockMapelKelas, mockMataPelajaran, mockKelas } from "@/lib/mock-data";

interface RouteParams {
  params: Promise<{ guruId: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { guruId } = await params;

  const filtered = mockMapelKelas
    .filter((mpk) => mpk.guruId === guruId)
    .map((mpk) => {
      const mapel = mockMataPelajaran.find((m) => m.id === mpk.mataPelajaranId);
      const kelas = mockKelas.find((k) => k.id === mpk.kelasId);
      return {
        ...mpk,
        mataPelajaran: mapel,
        kelas,
      };
    });

  return NextResponse.json({ success: true, data: filtered });
}
