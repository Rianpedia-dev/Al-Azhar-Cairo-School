// src/app/api/auth/sign-up/route.ts per PRD 8.1
import { NextResponse } from "next/server";
import { validateUserInput } from "@/lib/validators/user";
import { mockUsers } from "@/lib/mock-data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateUserInput(body);

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    const existingUser = mockUsers.find((u) => u.email.toLowerCase() === body.email.toLowerCase());
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Email sudah terdaftar dalam sistem sekolah" },
        { status: 409 }
      );
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name: body.name,
      email: body.email,
      role: body.role,
      nomorInduk: body.nomorInduk || null,
      phone: body.phone || null,
      alamat: body.alamat || null,
      jenjangId: body.jenjangId || null,
      kelasId: body.kelasId || null,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        message: "Akun pengguna berhasil didaftarkan oleh Administrator",
        data: newUser,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal membuat akun pengguna" },
      { status: 500 }
    );
  }
}
