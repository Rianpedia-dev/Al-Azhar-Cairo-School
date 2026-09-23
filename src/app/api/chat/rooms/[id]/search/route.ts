// src/app/api/chat/rooms/[id]/search/route.ts per PRD 8.8
import { NextResponse } from "next/server";
import { mockMessages, mockUsers } from "@/lib/mock-data";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";

  if (!q) {
    return NextResponse.json({ success: true, data: [] });
  }

  const matches = mockMessages
    .filter((m) => m.chatRoomId === id && m.content.toLowerCase().includes(q.toLowerCase()))
    .map((m) => {
      const sender = mockUsers.find((u) => u.id === m.senderId);
      return {
        ...m,
        sender,
      };
    });

  return NextResponse.json({
    success: true,
    query: q,
    total: matches.length,
    data: matches,
  });
}
