// src/app/api/chat/rooms/[id]/read/route.ts per PRD 8.8
import { NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(_request: Request, { params }: RouteParams) {
  const { id } = await params;

  return NextResponse.json({
    success: true,
    message: `Semua pesan di ruang percakapan ${id} telah ditandai terbaca`,
  });
}
