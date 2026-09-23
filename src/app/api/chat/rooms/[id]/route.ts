// src/app/api/chat/rooms/[id]/route.ts per PRD 8.8
import { NextResponse } from "next/server";
import { mockChatRooms, mockUsers } from "@/lib/mock-data";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const room = mockChatRooms.find((r) => r.id === id);

  if (!room) {
    return NextResponse.json(
      { success: false, error: "Ruang percakapan tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: room,
  });
}
