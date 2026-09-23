// src/app/api/auth/session/route.ts per PRD 8.1
import { NextResponse } from "next/server";
import { mockUsers } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") || mockUsers[0].id;
  const user = mockUsers.find((u) => u.id === userId) || mockUsers[0];

  return NextResponse.json({
    success: true,
    user,
    session: {
      id: `sess_active_${user.id}`,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  });
}
