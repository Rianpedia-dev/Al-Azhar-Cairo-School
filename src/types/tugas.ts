// src/types/tugas.ts per PRD 4.2 & 5.2
import type { User, MataPelajaranKelas } from "./user";

export type TugasStatus = "DRAFT" | "PUBLISHED" | "CLOSED";

export type JenisTugas = "ESSAY" | "PILIHAN_GANDA" | "UPLOAD_FILE" | "PROYEK";

export type StatusKoreksi =
  | "BELUM_DIKUMPULKAN"
  | "DIKUMPULKAN"
  | "SEDANG_DIKOREKSI"
  | "SUDAH_DINILAI"
  | "REVISI";

export interface LampiranFile {
  nama: string;
  url: string;
  type: string;
  size?: number;
}

export interface Tugas {
  id: string;
  judul: string;
  deskripsi?: string | null;
  jenisTugas: JenisTugas;
  deadline: string;
  lampiran?: LampiranFile[] | null;
  status: TugasStatus;
  createdAt: string;
  updatedAt: string;
  guruId: string;
  guru?: User;
  mataPelajaranKelasId: string;
  mataPelajaranKelas?: MataPelajaranKelas;
  pengumpulan?: PengumpulanTugas[];
}

export interface PengumpulanTugas {
  id: string;
  files: LampiranFile[];
  catatan?: string | null;
  nilai?: number | null;
  komentar?: string | null;
  koreksiFile?: LampiranFile[] | null;
  statusKoreksi: StatusKoreksi;
  tanggalKumpul?: string | null;
  tanggalKoreksi?: string | null;
  createdAt: string;
  updatedAt: string;
  tugasId: string;
  tugas?: Tugas;
  siswaId: string;
  siswa?: User;
}
