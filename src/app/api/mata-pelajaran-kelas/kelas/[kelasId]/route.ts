// src/app/api/mata-pelajaran-kelas/kelas/[kelasId]/route.ts per PRD 8.4
import { NextResponse } from "next/server";
import { mockMapelKelas, mockMataPelajaran, mockUsers } from "@/lib/mock-data";

interface RouteParams {
  params: Promise<{ kelasId: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { kelasId } = await params;

  const filtered = mockMapelKelas
    .filter((mpk) => mpk.kelasId === kelasId)
    .map((mpk) => {
      const mapel = mockMataPelajaran.find((m) => m.id === mpk.mataPelajaranId);
      const guru = mockUsers.find((u) => u.id === mpk.guruId);
      return {
        ...mpk,
        mataPelajaran: mapel,
        guru,
      };
    });

  return NextResponse.json({ success: true, data: filtered });
}
