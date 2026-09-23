// src/app/api/prestasi/siswa/[siswaId]/route.ts per PRD 8.7
import { NextResponse } from "next/server";
import { mockPrestasi, mockUsers } from "@/lib/mock-data";

interface RouteParams {
  params: Promise<{ siswaId: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { siswaId } = await params;
  const siswa = mockUsers.find((u) => u.id === siswaId);

  const prestasiList = mockPrestasi.filter((p) => p.siswaId === siswaId);

  return NextResponse.json({
    success: true,
    siswa,
    total: prestasiList.length,
    data: prestasiList,
  });
}
