import { NextResponse } from "next/server";
import { mockUsers } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    user: mockUsers[0],
    session: {
      id: "demo_session",
      userId: mockUsers[0].id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = mockUsers.find((u) => u.email === body.email) || mockUsers[0];
    return NextResponse.json({
      success: true,
      user,
      session: {
        id: `sess_${Date.now()}`,
        userId: user.id,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Auth request error" }, { status: 400 });
  }
}
