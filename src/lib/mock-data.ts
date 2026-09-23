import type {
  User,
  Jenjang,
  Kelas,
  MataPelajaran,
  MataPelajaranKelas,
  Tugas,
  PengumpulanTugas,
  Prestasi,
  ChatRoom,
  Message,
} from "@/types";

// ============================================
// JENJANG
// ============================================
export const mockJenjang: Jenjang[] = [
  { id: "j1", nama: "SD", deskripsi: "Sekolah Dasar", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: "j2", nama: "SMP", deskripsi: "Sekolah Menengah Pertama", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
];

// ============================================
// USERS
// ============================================
export const mockUsers: User[] = [
  {
    id: "u1", name: "Admin Al-Azhar", email: "admin@alazhar-cairo.sch.id", role: "ADMIN",
    avatar: null, nomorInduk: "ADM001", phone: "08123456789", alamat: "Jakarta",
    isActive: true, createdAt: "2026-01-01", updatedAt: "2026-01-01",
    jenjangId: null, kelasId: null,
  },
  {
    id: "u2", name: "Budi Santoso", email: "budi@alazhar-cairo.sch.id", role: "GURU",
    avatar: null, nomorInduk: "NIP001", phone: "08234567890", alamat: "Jakarta Selatan",
    isActive: true, createdAt: "2026-01-01", updatedAt: "2026-01-01",
    jenjangId: "j1", kelasId: null,
  },
  {
    id: "u3", name: "Siti Aminah", email: "siti@alazhar-cairo.sch.id", role: "GURU",
    avatar: null, nomorInduk: "NIP002", phone: "08345678901", alamat: "Jakarta Timur",
    isActive: true, createdAt: "2026-01-01", updatedAt: "2026-01-01",
    jenjangId: "j1", kelasId: null,
  },
  {
    id: "u4", name: "Ahmad Fauzi", email: "ahmad@alazhar-cairo.sch.id", role: "GURU",
    avatar: null, nomorInduk: "NIP003", phone: "08456789012", alamat: "Depok",
    isActive: true, createdAt: "2026-01-01", updatedAt: "2026-01-01",
    jenjangId: "j2", kelasId: null,
  },
  {
    id: "u5", name: "Aisyah Putri", email: "aisyah@alazhar-cairo.sch.id", role: "SISWA",
    avatar: null, nomorInduk: "NIS001", phone: null, alamat: "Jakarta Pusat",
    isActive: true, createdAt: "2026-01-01", updatedAt: "2026-01-01",
    jenjangId: "j1", kelasId: "k1",
  },
  {
    id: "u6", name: "Muhammad Rizky", email: "rizky@alazhar-cairo.sch.id", role: "SISWA",
    avatar: null, nomorInduk: "NIS002", phone: null, alamat: "Jakarta Barat",
    isActive: true, createdAt: "2026-01-01", updatedAt: "2026-01-01",
    jenjangId: "j1", kelasId: "k1",
  },
  {
    id: "u7", name: "Fatimah Zahra", email: "fatimah@alazhar-cairo.sch.id", role: "SISWA",
    avatar: null, nomorInduk: "NIS003", phone: null, alamat: "Tangerang",
    isActive: true, createdAt: "2026-01-01", updatedAt: "2026-01-01",
    jenjangId: "j1", kelasId: "k2",
  },
  {
    id: "u8", name: "Zaid Ibrahim", email: "zaid@alazhar-cairo.sch.id", role: "SISWA",
    avatar: null, nomorInduk: "NIS004", phone: null, alamat: "Bekasi",
    isActive: true, createdAt: "2026-01-01", updatedAt: "2026-01-01",
    jenjangId: "j2", kelasId: "k3",
  },
  {
    id: "u9", name: "Khadijah Sari", email: "khadijah@alazhar-cairo.sch.id", role: "SISWA",
    avatar: null, nomorInduk: "NIS005", phone: null, alamat: "Bogor",
    isActive: true, createdAt: "2026-01-01", updatedAt: "2026-01-01",
    jenjangId: "j2", kelasId: "k3",
  },
  {
    id: "u10", name: "Umar Hakim", email: "umar@alazhar-cairo.sch.id", role: "SISWA",
    avatar: null, nomorInduk: "NIS006", phone: null, alamat: "Jakarta Utara",
    isActive: true, createdAt: "2026-01-01", updatedAt: "2026-01-01",
    jenjangId: "j1", kelasId: "k2",
  },
];

// ============================================
// KELAS
// ============================================
export const mockKelas: Kelas[] = [
  { id: "k1", nama: "1A", tingkat: 1, tahunAjaran: "2026/2027", createdAt: "2026-01-01", updatedAt: "2026-01-01", jenjangId: "j1", waliKelasId: "u2" },
  { id: "k2", nama: "2A", tingkat: 2, tahunAjaran: "2026/2027", createdAt: "2026-01-01", updatedAt: "2026-01-01", jenjangId: "j1", waliKelasId: "u3" },
  { id: "k3", nama: "7A", tingkat: 7, tahunAjaran: "2026/2027", createdAt: "2026-01-01", updatedAt: "2026-01-01", jenjangId: "j2", waliKelasId: "u4" },
  { id: "k4", nama: "7B", tingkat: 7, tahunAjaran: "2026/2027", createdAt: "2026-01-01", updatedAt: "2026-01-01", jenjangId: "j2", waliKelasId: null },
  { id: "k5", nama: "3A", tingkat: 3, tahunAjaran: "2026/2027", createdAt: "2026-01-01", updatedAt: "2026-01-01", jenjangId: "j1", waliKelasId: null },
  { id: "k6", nama: "8A", tingkat: 8, tahunAjaran: "2026/2027", createdAt: "2026-01-01", updatedAt: "2026-01-01", jenjangId: "j2", waliKelasId: null },
];

// ============================================
// MATA PELAJARAN
// ============================================
export const mockMataPelajaran: MataPelajaran[] = [
  { id: "mp1", nama: "Matematika", kode: "MTK", deskripsi: "Ilmu tentang bilangan", createdAt: "2026-01-01", updatedAt: "2026-01-01", jenjangId: "j1" },
  { id: "mp2", nama: "Bahasa Indonesia", kode: "BIN", deskripsi: "Bahasa nasional", createdAt: "2026-01-01", updatedAt: "2026-01-01", jenjangId: "j1" },
  { id: "mp3", nama: "Pendidikan Agama Islam", kode: "PAI", deskripsi: "Pendidikan keagamaan", createdAt: "2026-01-01", updatedAt: "2026-01-01", jenjangId: "j1" },
  { id: "mp4", nama: "IPA", kode: "IPA", deskripsi: "Ilmu Pengetahuan Alam", createdAt: "2026-01-01", updatedAt: "2026-01-01", jenjangId: "j1" },
  { id: "mp5", nama: "IPS", kode: "IPS", deskripsi: "Ilmu Pengetahuan Sosial", createdAt: "2026-01-01", updatedAt: "2026-01-01", jenjangId: "j1" },
  { id: "mp6", nama: "Bahasa Inggris", kode: "BING", deskripsi: "English language", createdAt: "2026-01-01", updatedAt: "2026-01-01", jenjangId: "j1" },
  { id: "mp7", nama: "Tahfidz Quran", kode: "TQ", deskripsi: "Hafalan Al-Quran", createdAt: "2026-01-01", updatedAt: "2026-01-01", jenjangId: "j1" },
  { id: "mp8", nama: "Matematika", kode: "MTK-SMP", deskripsi: "Matematika tingkat SMP", createdAt: "2026-01-01", updatedAt: "2026-01-01", jenjangId: "j2" },
  { id: "mp9", nama: "Bahasa Indonesia", kode: "BIN-SMP", deskripsi: "Bahasa Indonesia SMP", createdAt: "2026-01-01", updatedAt: "2026-01-01", jenjangId: "j2" },
  { id: "mp10", nama: "Informatika", kode: "INF", deskripsi: "Ilmu komputer dasar", createdAt: "2026-01-01", updatedAt: "2026-01-01", jenjangId: "j2" },
];

// ============================================
// MATA PELAJARAN KELAS
// ============================================
export const mockMapelKelas: MataPelajaranKelas[] = [
  { id: "mpk1", jadwal: [{ hari: "Senin", jamMulai: "08:00", jamSelesai: "09:30" }], createdAt: "2026-01-01", updatedAt: "2026-01-01", mataPelajaranId: "mp1", kelasId: "k1", guruId: "u2" },
  { id: "mpk2", jadwal: [{ hari: "Selasa", jamMulai: "08:00", jamSelesai: "09:30" }], createdAt: "2026-01-01", updatedAt: "2026-01-01", mataPelajaranId: "mp2", kelasId: "k1", guruId: "u3" },
  { id: "mpk3", jadwal: [{ hari: "Rabu", jamMulai: "10:00", jamSelesai: "11:30" }], createdAt: "2026-01-01", updatedAt: "2026-01-01", mataPelajaranId: "mp3", kelasId: "k1", guruId: "u2" },
  { id: "mpk4", jadwal: [{ hari: "Kamis", jamMulai: "08:00", jamSelesai: "09:30" }], createdAt: "2026-01-01", updatedAt: "2026-01-01", mataPelajaranId: "mp8", kelasId: "k3", guruId: "u4" },
  { id: "mpk5", jadwal: [{ hari: "Jumat", jamMulai: "08:00", jamSelesai: "09:30" }], createdAt: "2026-01-01", updatedAt: "2026-01-01", mataPelajaranId: "mp10", kelasId: "k3", guruId: "u4" },
];

// ============================================
// TUGAS
// ============================================
export const mockTugas: Tugas[] = [
  {
    id: "t1", judul: "Latihan Penjumlahan", deskripsi: "Kerjakan soal penjumlahan halaman 25-26",
    jenisTugas: "UPLOAD_FILE", deadline: "2026-09-30T23:59:00", lampiran: [{ nama: "soal-mtk.pdf", url: "/uploads/soal-mtk.pdf", type: "pdf" }],
    status: "PUBLISHED", createdAt: "2026-09-20", updatedAt: "2026-09-20", guruId: "u2", mataPelajaranKelasId: "mpk1",
  },
  {
    id: "t2", judul: "Menulis Cerita Pendek", deskripsi: "Tulislah cerita pendek dengan tema lingkungan sekolah",
    jenisTugas: "ESSAY", deadline: "2026-10-05T23:59:00", lampiran: null,
    status: "PUBLISHED", createdAt: "2026-09-21", updatedAt: "2026-09-21", guruId: "u3", mataPelajaranKelasId: "mpk2",
  },
  {
    id: "t3", judul: "Hafalan Surat Al-Fatihah", deskripsi: "Hafalkan surat Al-Fatihah dan rekam video",
    jenisTugas: "UPLOAD_FILE", deadline: "2026-10-01T23:59:00", lampiran: null,
    status: "PUBLISHED", createdAt: "2026-09-19", updatedAt: "2026-09-19", guruId: "u2", mataPelajaranKelasId: "mpk3",
  },
  {
    id: "t4", judul: "Proyek Matematika: Bangun Ruang", deskripsi: "Buat model bangun ruang dari kertas karton",
    jenisTugas: "PROYEK", deadline: "2026-10-15T23:59:00", lampiran: [{ nama: "panduan-proyek.pdf", url: "/uploads/panduan.pdf", type: "pdf" }],
    status: "DRAFT", createdAt: "2026-09-22", updatedAt: "2026-09-22", guruId: "u4", mataPelajaranKelasId: "mpk4",
  },
  {
    id: "t5", judul: "Quiz Dasar Komputer", deskripsi: "Jawab soal pilihan ganda tentang komponen komputer",
    jenisTugas: "PILIHAN_GANDA", deadline: "2026-09-28T23:59:00", lampiran: null,
    status: "CLOSED", createdAt: "2026-09-15", updatedAt: "2026-09-25", guruId: "u4", mataPelajaranKelasId: "mpk5",
  },
];

// ============================================
// PENGUMPULAN TUGAS
// ============================================
export const mockPengumpulan: PengumpulanTugas[] = [
  {
    id: "pt1", files: [{ nama: "jawaban-aisyah.pdf", url: "/uploads/jawaban1.pdf", type: "pdf", size: 1024 }],
    catatan: "Sudah dikerjakan semua", nilai: 85, komentar: "Bagus! Hampir sempurna.",
    koreksiFile: null, statusKoreksi: "SUDAH_DINILAI", tanggalKumpul: "2026-09-25", tanggalKoreksi: "2026-09-26",
    createdAt: "2026-09-25", updatedAt: "2026-09-26", tugasId: "t1", siswaId: "u5",
  },
  {
    id: "pt2", files: [{ nama: "jawaban-rizky.pdf", url: "/uploads/jawaban2.pdf", type: "pdf", size: 2048 }],
    catatan: null, nilai: null, komentar: null,
    koreksiFile: null, statusKoreksi: "DIKUMPULKAN", tanggalKumpul: "2026-09-26", tanggalKoreksi: null,
    createdAt: "2026-09-26", updatedAt: "2026-09-26", tugasId: "t1", siswaId: "u6",
  },
  {
    id: "pt3", files: [{ nama: "cerita-aisyah.pdf", url: "/uploads/cerita1.pdf", type: "pdf", size: 512 }],
    catatan: "Cerita tentang taman sekolah", nilai: 92, komentar: "Kreatif dan rapi!",
    koreksiFile: null, statusKoreksi: "SUDAH_DINILAI", tanggalKumpul: "2026-09-28", tanggalKoreksi: "2026-09-29",
    createdAt: "2026-09-28", updatedAt: "2026-09-29", tugasId: "t2", siswaId: "u5",
  },
  {
    id: "pt4", files: [],
    catatan: null, nilai: null, komentar: null,
    koreksiFile: null, statusKoreksi: "BELUM_DIKUMPULKAN", tanggalKumpul: null, tanggalKoreksi: null,
    createdAt: "2026-09-21", updatedAt: "2026-09-21", tugasId: "t2", siswaId: "u6",
  },
  {
    id: "pt5", files: [{ nama: "jawaban-zaid.pdf", url: "/uploads/jawaban-zaid.pdf", type: "pdf", size: 1536 }],
    catatan: "Mohon dikoreksi", nilai: null, komentar: "Perlu perbaikan di soal nomor 3",
    koreksiFile: null, statusKoreksi: "REVISI", tanggalKumpul: "2026-09-27", tanggalKoreksi: "2026-09-28",
    createdAt: "2026-09-27", updatedAt: "2026-09-28", tugasId: "t5", siswaId: "u8",
  },
];

// ============================================
// PRESTASI
// ============================================
export const mockPrestasi: Prestasi[] = [
  {
    id: "pr1", judul: "Juara 1 Olimpiade Matematika", deskripsi: "Olimpiade Matematika tingkat kota",
    kategori: "AKADEMIK", tingkat: "KOTA", peringkat: "Juara 1",
    tanggal: "2026-08-15", bukti: [{ nama: "sertifikat-mtk.pdf", url: "/uploads/sertifikat1.pdf", type: "pdf" }],
    isVerified: true, createdAt: "2026-08-16", updatedAt: "2026-08-17",
    siswaId: "u5", diinputOlehId: "u2",
  },
  {
    id: "pr2", judul: "Juara 2 Lomba Baca Puisi", deskripsi: "Lomba baca puisi antar sekolah",
    kategori: "SENI", tingkat: "KECAMATAN", peringkat: "Juara 2",
    tanggal: "2026-07-20", bukti: null,
    isVerified: true, createdAt: "2026-07-21", updatedAt: "2026-07-22",
    siswaId: "u6", diinputOlehId: "u3",
  },
  {
    id: "pr3", judul: "Hafidz 5 Juz", deskripsi: "Menghafal 5 juz Al-Quran",
    kategori: "KEAGAMAAN", tingkat: "SEKOLAH", peringkat: "Penghargaan Khusus",
    tanggal: "2026-09-01", bukti: [{ nama: "sertifikat-tahfidz.pdf", url: "/uploads/sertifikat-tahfidz.pdf", type: "pdf" }],
    isVerified: false, createdAt: "2026-09-02", updatedAt: "2026-09-02",
    siswaId: "u5", diinputOlehId: "u2",
  },
  {
    id: "pr4", judul: "Juara 3 Futsal", deskripsi: "Turnamen futsal antar sekolah tingkat provinsi",
    kategori: "OLAHRAGA", tingkat: "PROVINSI", peringkat: "Juara 3",
    tanggal: "2026-06-10", bukti: null,
    isVerified: true, createdAt: "2026-06-11", updatedAt: "2026-06-12",
    siswaId: "u8", diinputOlehId: "u4",
  },
  {
    id: "pr5", judul: "Peserta Olimpiade Sains Nasional", deskripsi: "Berpartisipasi dalam OSN tingkat nasional",
    kategori: "AKADEMIK", tingkat: "NASIONAL", peringkat: "Peserta",
    tanggal: "2026-05-20", bukti: null,
    isVerified: false, createdAt: "2026-05-21", updatedAt: "2026-05-21",
    siswaId: "u9", diinputOlehId: "u4",
  },
];

// ============================================
// CHAT
// ============================================
export const mockChatRooms: ChatRoom[] = [
  {
    id: "cr1", type: "PRIVATE", nama: null, createdAt: "2026-09-01", updatedAt: "2026-09-23",
    unreadCount: 2,
    lastMessage: {
      id: "m3", content: "Baik bu, terima kasih 🙏", type: "TEXT", isRead: false,
      createdAt: "2026-09-23T07:30:00", updatedAt: "2026-09-23T07:30:00", chatRoomId: "cr1", senderId: "u5",
      sender: { id: "u5", name: "Aisyah Putri", email: "", role: "SISWA", isActive: true, createdAt: "", updatedAt: "" },
    },
  },
  {
    id: "cr2", type: "GROUP", nama: "Kelas 1A - Matematika", createdAt: "2026-09-01", updatedAt: "2026-09-22",
    unreadCount: 0,
    lastMessage: {
      id: "m5", content: "Jangan lupa kerjakan PR halaman 25 ya anak-anak", type: "TEXT", isRead: true,
      createdAt: "2026-09-22T14:00:00", updatedAt: "2026-09-22T14:00:00", chatRoomId: "cr2", senderId: "u2",
      sender: { id: "u2", name: "Budi Santoso", email: "", role: "GURU", isActive: true, createdAt: "", updatedAt: "" },
    },
  },
  {
    id: "cr3", type: "PRIVATE", nama: null, createdAt: "2026-09-15", updatedAt: "2026-09-21",
    unreadCount: 1,
    lastMessage: {
      id: "m8", content: "Pak, saya ingin bertanya tentang tugas proyek", type: "TEXT", isRead: false,
      createdAt: "2026-09-21T10:15:00", updatedAt: "2026-09-21T10:15:00", chatRoomId: "cr3", senderId: "u8",
      sender: { id: "u8", name: "Zaid Ibrahim", email: "", role: "SISWA", isActive: true, createdAt: "", updatedAt: "" },
    },
  },
];

export const mockMessages: Message[] = [
  {
    id: "m1", content: "Assalamualaikum Aisyah, bagaimana tugas matematikanya?", type: "TEXT",
    attachments: null, isRead: true, readAt: "2026-09-23T07:00:00",
    createdAt: "2026-09-23T06:45:00", updatedAt: "2026-09-23T06:45:00",
    chatRoomId: "cr1", senderId: "u2",
  },
  {
    id: "m2", content: "Waalaikumsalam bu, sudah selesai dikerjakan 😊", type: "TEXT",
    attachments: null, isRead: true, readAt: "2026-09-23T07:10:00",
    createdAt: "2026-09-23T07:05:00", updatedAt: "2026-09-23T07:05:00",
    chatRoomId: "cr1", senderId: "u5",
  },
  {
    id: "m3", content: "Baik bu, terima kasih 🙏", type: "TEXT",
    attachments: null, isRead: false, readAt: null,
    createdAt: "2026-09-23T07:30:00", updatedAt: "2026-09-23T07:30:00",
    chatRoomId: "cr1", senderId: "u5",
  },
  {
    id: "m4", content: "Anak-anak, besok kita akan belajar perkalian", type: "TEXT",
    attachments: null, isRead: true, readAt: null,
    createdAt: "2026-09-22T13:00:00", updatedAt: "2026-09-22T13:00:00",
    chatRoomId: "cr2", senderId: "u2",
  },
  {
    id: "m5", content: "Jangan lupa kerjakan PR halaman 25 ya anak-anak", type: "TEXT",
    attachments: null, isRead: true, readAt: null,
    createdAt: "2026-09-22T14:00:00", updatedAt: "2026-09-22T14:00:00",
    chatRoomId: "cr2", senderId: "u2",
  },
];

// ============================================
// CURRENT USER (for auth mock)
// ============================================
export const mockCurrentUser = mockUsers[0]; // Default: Admin

export function getMockUserByRole(role: "ADMIN" | "GURU" | "SISWA"): User {
  return mockUsers.find((u) => u.role === role) || mockUsers[0];
}

export function getUserInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getAvatarColor(name: string): string {
  const colors = ["#00AEEF", "#E1251B", "#FDB913", "#008C45", "#662D91", "#27348B"];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}
