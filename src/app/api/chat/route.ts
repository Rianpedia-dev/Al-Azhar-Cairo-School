import { NextResponse } from "next/server";
import { mockChatRooms, mockMessages } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ success: true, data: { rooms: mockChatRooms, messages: mockMessages } });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json(
      {
        success: true,
        data: {
          id: `msg_${Date.now()}`,
          createdAt: new Date().toISOString(),
          isRead: false,
          ...body,
        },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request payload" }, { status: 400 });
  }
}
