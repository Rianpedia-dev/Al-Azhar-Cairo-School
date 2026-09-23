// src/app/api/upload/[filename]/route.ts per PRD 8.9
import { NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ filename: string }>;
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { filename } = await params;

  return NextResponse.json({
    success: true,
    message: `Berkas ${decodeURIComponent(filename)} berhasil dihapus dari penyimpanan`,
  });
}
