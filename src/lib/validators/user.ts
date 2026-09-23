// src/lib/validators/user.ts per PRD 4.2 & 7.1

export interface UserInput {
  name: string;
  email: string;
  role: "ADMIN" | "GURU" | "SISWA";
  nomorInduk?: string;
  jenjangId?: string;
  kelasId?: string;
  phone?: string;
  alamat?: string;
}

export function validateUserInput(input: Partial<UserInput>): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!input.name || input.name.trim().length < 3) {
    errors.name = "Nama lengkap wajib diisi minimal 3 karakter";
  }

  if (!input.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.email = "Format email tidak valid";
  }

  if (!input.role || !["ADMIN", "GURU", "SISWA"].includes(input.role)) {
    errors.role = "Role pengguna tidak valid";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
