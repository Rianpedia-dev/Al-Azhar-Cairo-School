// src/lib/validators/prestasi.ts per PRD 4.2 & 7.3

export interface PrestasiInput {
  judul: string;
  deskripsi?: string;
  kategori: string;
  tingkat: string;
  peringkat?: string;
  tanggal: string;
  siswaId: string;
}

export function validatePrestasiInput(input: Partial<PrestasiInput>): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!input.judul || input.judul.trim().length < 3) {
    errors.judul = "Nama prestasi/kejuaraan wajib diisi minimal 3 karakter";
  }

  if (!input.kategori) {
    errors.kategori = "Kategori prestasi wajib dipilih";
  }

  if (!input.tingkat) {
    errors.tingkat = "Tingkat perlombaan/kejuaraan wajib dipilih";
  }

  if (!input.tanggal) {
    errors.tanggal = "Tanggal pencapaian prestasi wajib diisi";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
