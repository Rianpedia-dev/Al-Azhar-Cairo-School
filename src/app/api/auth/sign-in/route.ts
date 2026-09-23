// src/app/api/auth/sign-in/route.ts per PRD 8.1
import { NextResponse } from "next/server";
import { mockUsers } from "@/lib/mock-data";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email dan password wajib diisi" },
        { status: 400 }
      );
    }

    const user = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Kredensial tidak valid" },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { success: false, error: "Akun telah dinonaktifkan oleh administrator sekolah" },
        { status: 403 }
      );
    }

    const session = {
      id: `sess_${Date.now()}`,
      userId: user.id,
      token: `tok_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };

    return NextResponse.json({
      success: true,
      user,
      session,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memproses permintaan masuk" },
      { status: 500 }
    );
  }
}
