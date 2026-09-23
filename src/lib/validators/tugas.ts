// src/lib/validators/tugas.ts per PRD 4.2 & 7.6

export interface TugasInput {
  judul: string;
  deskripsi?: string;
  jenisTugas: "ESSAY" | "PILIHAN_GANDA" | "UPLOAD_FILE" | "PROYEK";
  deadline: string;
  mataPelajaranKelasId: string;
}

export function validateTugasInput(input: Partial<TugasInput>): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!input.judul || input.judul.trim().length < 3) {
    errors.judul = "Judul tugas wajib diisi minimal 3 karakter";
  }

  if (!input.deadline) {
    errors.deadline = "Tenggat waktu (deadline) tugas wajib ditentukan";
  } else {
    const deadlineDate = new Date(input.deadline);
    if (isNaN(deadlineDate.getTime())) {
      errors.deadline = "Format tanggal deadline tidak valid";
    }
  }

  if (!input.jenisTugas) {
    errors.jenisTugas = "Jenis tugas wajib dipilih";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
