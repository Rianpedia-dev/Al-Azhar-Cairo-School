// src/app/api/auth/forget-password/route.ts per PRD 8.1
import { NextResponse } from "next/server";
import { mockUsers } from "@/lib/mock-data";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email wajib diisi" },
        { status: 400 }
      );
    }

    const user = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());

    return NextResponse.json({
      success: true,
      message: user
        ? "Tautan reset kata sandi telah dikirimkan ke email terdaftar Anda"
        : "Jika email terdaftar, instruksi reset kata sandi telah dikirimkan",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memproses permintaan lupa kata sandi" },
      { status: 500 }
    );
  }
}
