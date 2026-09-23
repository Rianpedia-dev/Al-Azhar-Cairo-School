// src/types/user.ts per PRD 4.2 & 5.2

export type UserRole = "ADMIN" | "GURU" | "SISWA";

export type JenjangType = "SD" | "SMP";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string | null;
  nomorInduk?: string | null; // NIS untuk siswa, NIP untuk guru
  phone?: string | null;
  alamat?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  jenjangId?: string | null;
  jenjang?: Jenjang | null;
  kelasId?: string | null;
  kelas?: Kelas | null;
}

export interface Jenjang {
  id: string;
  nama: JenjangType;
  deskripsi?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Kelas {
  id: string;
  nama: string;
  tingkat: number; // 1-6 SD, 7-9 SMP
  tahunAjaran: string;
  createdAt: string;
  updatedAt: string;
  jenjangId: string;
  jenjang?: Jenjang;
  waliKelasId?: string | null;
  waliKelas?: User | null;
  siswa?: User[];
  mataPelajaran?: MataPelajaranKelas[];
}

export interface MataPelajaran {
  id: string;
  nama: string;
  kode: string;
  deskripsi?: string | null;
  createdAt: string;
  updatedAt: string;
  jenjangId: string;
  jenjang?: Jenjang;
}

export interface JadwalItem {
  hari: string;
  jamMulai: string;
  jamSelesai: string;
}

export interface MataPelajaranKelas {
  id: string;
  jadwal?: JadwalItem[] | null;
  createdAt: string;
  updatedAt: string;
  mataPelajaranId: string;
  mataPelajaran?: MataPelajaran;
  kelasId: string;
  kelas?: Kelas;
  guruId: string;
  guru?: User;
}
