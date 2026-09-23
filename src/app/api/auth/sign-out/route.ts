// src/app/api/auth/sign-out/route.ts per PRD 8.1
import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    success: true,
    message: "Sesi berhasil diakhiri (signed out)",
  });
}
