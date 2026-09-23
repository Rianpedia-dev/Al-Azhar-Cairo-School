// src/types/prestasi.ts per PRD 4.2 & 5.2
import type { User } from "./user";
import type { LampiranFile } from "./tugas";

export type KategoriPrestasi =
  | "AKADEMIK"
  | "NON_AKADEMIK"
  | "OLAHRAGA"
  | "SENI"
  | "KEAGAMAAN"
  | "LAINNYA";

export type TingkatPrestasi =
  | "SEKOLAH"
  | "KECAMATAN"
  | "KOTA"
  | "PROVINSI"
  | "NASIONAL"
  | "INTERNASIONAL";

export interface Prestasi {
  id: string;
  judul: string;
  deskripsi?: string | null;
  kategori: KategoriPrestasi;
  tingkat: TingkatPrestasi;
  peringkat?: string | null;
  tanggal: string;
  bukti?: LampiranFile[] | null;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  siswaId: string;
  siswa?: User;
  diinputOlehId: string;
  diinputOleh?: User;
}
