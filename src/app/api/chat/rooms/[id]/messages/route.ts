// src/app/api/chat/rooms/[id]/messages/route.ts per PRD 8.8
import { NextResponse } from "next/server";
import { mockMessages, mockUsers } from "@/lib/mock-data";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "50", 10);

  const roomMessages = mockMessages
    .filter((m) => m.chatRoomId === id)
    .map((m) => {
      const sender = mockUsers.find((u) => u.id === m.senderId);
      return {
        ...m,
        sender,
      };
    });

  const startIndex = (page - 1) * limit;
  const paginated = roomMessages.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    success: true,
    total: roomMessages.length,
    page,
    limit,
    data: paginated,
  });
}

export async function POST(request: Request, { params }: RouteParams) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { senderId, content, type, attachments } = body;

    if (!senderId || !content) {
      return NextResponse.json(
        { success: false, error: "senderId dan content pesan wajib diisi" },
        { status: 400 }
      );
    }

    const newMessage = {
      id: `msg_${Date.now()}`,
      chatRoomId: id,
      senderId,
      content,
      type: type || "TEXT",
      attachments: attachments || null,
      isRead: false,
      readAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        message: "Pesan berhasil dikirim",
        data: newMessage,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal mengirim pesan" },
      { status: 400 }
    );
  }
}
