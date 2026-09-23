import { NextResponse } from "next/server";
import { mockTugas } from "@/lib/mock-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const tugas = mockTugas.find((t) => t.id === id);
  if (!tugas) {
    return NextResponse.json({ success: false, error: "Tugas tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: tugas });
}
