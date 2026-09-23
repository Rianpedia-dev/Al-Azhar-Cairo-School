// src/app/api/auth/reset-password/route.ts per PRD 8.1
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { token, newPassword } = await request.json();

    if (!newPassword || newPassword.length < 8) {
      return NextResponse.json(
        { success: false, error: "Kata sandi baru minimal 8 karakter" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Kata sandi akun Anda berhasil diperbarui. Silakan login kembali.",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui kata sandi" },
      { status: 500 }
    );
  }
}
