// ============================================
// ENUMS
// ============================================

export type UserRole = "ADMIN" | "GURU" | "SISWA";

export type JenjangType = "SD" | "SMP";

export type TugasStatus = "DRAFT" | "PUBLISHED" | "CLOSED";

export type JenisTugas = "ESSAY" | "PILIHAN_GANDA" | "UPLOAD_FILE" | "PROYEK";

export type StatusKoreksi =
  | "BELUM_DIKUMPULKAN"
  | "DIKUMPULKAN"
  | "SEDANG_DIKOREKSI"
  | "SUDAH_DINILAI"
  | "REVISI";

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

export type ChatRoomType = "PRIVATE" | "GROUP";

export type MessageType = "TEXT" | "IMAGE" | "FILE" | "SYSTEM";

// ============================================
// MODELS
// ============================================

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string | null;
  nomorInduk?: string | null;
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
  tingkat: number;
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
  tugas?: Tugas[];
}

export interface JadwalItem {
  hari: string;
  jamMulai: string;
  jamSelesai: string;
}

export interface Tugas {
  id: string;
  judul: string;
  deskripsi?: string | null;
  jenisTugas: JenisTugas;
  deadline: string;
  lampiran?: FileAttachment[] | null;
  status: TugasStatus;
  createdAt: string;
  updatedAt: string;
  guruId: string;
  guru?: User;
  mataPelajaranKelasId: string;
  mataPelajaranKelas?: MataPelajaranKelas;
  pengumpulan?: PengumpulanTugas[];
}

export interface FileAttachment {
  nama: string;
  url: string;
  type: string;
  size?: number;
}

export interface PengumpulanTugas {
  id: string;
  files: FileAttachment[];
  catatan?: string | null;
  nilai?: number | null;
  komentar?: string | null;
  koreksiFile?: FileAttachment[] | null;
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

export interface Prestasi {
  id: string;
  judul: string;
  deskripsi?: string | null;
  kategori: KategoriPrestasi;
  tingkat: TingkatPrestasi;
  peringkat?: string | null;
  tanggal: string;
  bukti?: FileAttachment[] | null;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  siswaId: string;
  siswa?: User;
  diinputOlehId: string;
  diinputOleh?: User;
}

export interface ChatRoom {
  id: string;
  type: ChatRoomType;
  nama?: string | null;
  createdAt: string;
  updatedAt: string;
  members?: ChatRoomMember[];
  messages?: Message[];
  lastMessage?: Message | null;
  unreadCount?: number;
}

export interface ChatRoomMember {
  id: string;
  joinedAt: string;
  chatRoomId: string;
  chatRoom?: ChatRoom;
  userId: string;
  user?: User;
}

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  attachments?: FileAttachment[] | null;
  isRead: boolean;
  readAt?: string | null;
  createdAt: string;
  updatedAt: string;
  chatRoomId: string;
  chatRoom?: ChatRoom;
  senderId: string;
  sender?: User;
}

// ============================================
// UI/FORM TYPES
// ============================================

export interface StatCardData {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: "cyan" | "red" | "yellow" | "green" | "purple" | "blue";
}

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  emoji: string;
  children?: NavItem[];
}

export interface BreadcrumbItem {
  title: string;
  href: string;
}
