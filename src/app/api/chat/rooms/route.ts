// src/app/api/chat/rooms/route.ts per PRD 8.8
import { NextResponse } from "next/server";
import { mockChatRooms } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  // In production, filtered by user membership
  return NextResponse.json({
    success: true,
    data: mockChatRooms,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, nama, memberIds } = body;

    const newRoom = {
      id: `cr_${Date.now()}`,
      type: type || "PRIVATE",
      nama: nama || null,
      unreadCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      members: Array.isArray(memberIds)
        ? memberIds.map((uid: string) => ({ id: `crm_${Date.now()}_${uid}`, userId: uid }))
        : [],
    };

    return NextResponse.json(
      {
        success: true,
        message: "Ruang percakapan berhasil dibuat",
        data: newRoom,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal membuat ruang percakapan" },
      { status: 400 }
    );
  }
}
