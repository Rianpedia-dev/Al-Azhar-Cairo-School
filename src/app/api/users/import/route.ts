// src/app/api/users/import/route.ts per PRD 8.2
import { NextResponse } from "next/server";
import { User } from "@/types";

export async function POST(request: Request) {
  try {
    const { users } = await request.json();

    if (!Array.isArray(users) || users.length === 0) {
      return NextResponse.json(
        { success: false, error: "Daftar pengguna (array) diperlukan untuk impor massal" },
        { status: 400 }
      );
    }

    const imported: User[] = users.map((u, i) => ({
      id: `usr_imp_${Date.now()}_${i}`,
      name: u.name,
      email: u.email,
      role: u.role || "SISWA",
      nomorInduk: u.nomorInduk || null,
      phone: u.phone || null,
      alamat: u.alamat || null,
      jenjangId: u.jenjangId || null,
      kelasId: u.kelasId || null,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    return NextResponse.json({
      success: true,
      message: `Berhasil mengimpor ${imported.length} pengguna baru ke sistem`,
      count: imported.length,
      data: imported,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memproses berkas impor pengguna" },
      { status: 500 }
    );
  }
}
