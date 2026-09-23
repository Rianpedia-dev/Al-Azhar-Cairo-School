// prisma/seed.ts per PRD 4.2 & 12 (Phase 1)
import { PrismaClient } from "@prisma/client";
import {
  mockJenjang,
  mockUsers,
  mockKelas,
  mockMataPelajaran,
  mockMapelKelas,
  mockTugas,
  mockPengumpulan,
  mockPrestasi,
} from "../src/lib/mock-data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Memulai Seeder Database Al-Azhar Cairo...");

  // 1. Seed Jenjang (SD & SMP)
  console.log("-> Seeding Jenjang...");
  for (const j of mockJenjang) {
    await prisma.jenjang.upsert({
      where: { nama: j.nama },
      update: { deskripsi: j.deskripsi },
      create: {
        id: j.id,
        nama: j.nama,
        deskripsi: j.deskripsi,
      },
    });
  }

  // 2. Seed Users (Admin & Guru terlebih dahulu)
  console.log("-> Seeding Akun Pengguna (Admin & Guru)...");
  const nonSiswa = mockUsers.filter((u) => u.role !== "SISWA");
  for (const u of nonSiswa) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {
        name: u.name,
        role: u.role,
        nomorInduk: u.nomorInduk,
        phone: u.phone,
        alamat: u.alamat,
        isActive: u.isActive,
      },
      create: {
        id: u.id,
        name: u.name,
        email: u.email,
        password: "$2a$12$K1r.mQ0aM6j1N0/exampleHashedPassword", // Demo hashed password
        role: u.role,
        nomorInduk: u.nomorInduk,
        phone: u.phone,
        alamat: u.alamat,
        isActive: u.isActive,
        jenjangId: u.jenjangId,
      },
    });
  }

  // 3. Seed Kelas
  console.log("-> Seeding Rombel Kelas...");
  for (const k of mockKelas) {
    await prisma.kelas.upsert({
      where: {
        nama_tahunAjaran: {
          nama: k.nama,
          tahunAjaran: k.tahunAjaran,
        },
      },
      update: {
        tingkat: k.tingkat,
        waliKelasId: k.waliKelasId,
      },
      create: {
        id: k.id,
        nama: k.nama,
        tingkat: k.tingkat,
        tahunAjaran: k.tahunAjaran,
        jenjangId: k.jenjangId,
        waliKelasId: k.waliKelasId,
      },
    });
  }

  // 4. Seed Siswa (dengan relasi kelas)
  console.log("-> Seeding Akun Siswa...");
  const siswaList = mockUsers.filter((u) => u.role === "SISWA");
  for (const s of siswaList) {
    await prisma.user.upsert({
      where: { email: s.email },
      update: {
        name: s.name,
        kelasId: s.kelasId,
        nomorInduk: s.nomorInduk,
      },
      create: {
        id: s.id,
        name: s.name,
        email: s.email,
        password: "$2a$12$K1r.mQ0aM6j1N0/exampleHashedPassword",
        role: s.role,
        nomorInduk: s.nomorInduk,
        phone: s.phone,
        alamat: s.alamat,
        isActive: s.isActive,
        jenjangId: s.jenjangId,
        kelasId: s.kelasId,
      },
    });
  }

  // 5. Seed Mata Pelajaran
  console.log("-> Seeding Kurikulum & Mata Pelajaran...");
  for (const mp of mockMataPelajaran) {
    await prisma.mataPelajaran.upsert({
      where: { kode: mp.kode },
      update: {
        nama: mp.nama,
        deskripsi: mp.deskripsi,
      },
      create: {
        id: mp.id,
        nama: mp.nama,
        kode: mp.kode,
        deskripsi: mp.deskripsi,
        jenjangId: mp.jenjangId,
      },
    });
  }

  // 6. Seed Mata Pelajaran Kelas
  console.log("-> Seeding Penugasan Mapel ke Kelas...");
  for (const mpk of mockMapelKelas) {
    await prisma.mataPelajaranKelas.upsert({
      where: {
        mataPelajaranId_kelasId_guruId: {
          mataPelajaranId: mpk.mataPelajaranId,
          kelasId: mpk.kelasId,
          guruId: mpk.guruId,
        },
      },
      update: {
        jadwal: mpk.jadwal ? JSON.parse(JSON.stringify(mpk.jadwal)) : undefined,
      },
      create: {
        id: mpk.id,
        mataPelajaranId: mpk.mataPelajaranId,
        kelasId: mpk.kelasId,
        guruId: mpk.guruId,
        jadwal: mpk.jadwal ? JSON.parse(JSON.stringify(mpk.jadwal)) : undefined,
      },
    });
  }

  // 7. Seed Tugas
  console.log("-> Seeding Tugas Akademik...");
  for (const t of mockTugas) {
    await prisma.tugas.upsert({
      where: { id: t.id },
      update: {
        judul: t.judul,
        status: t.status,
      },
      create: {
        id: t.id,
        judul: t.judul,
        deskripsi: t.deskripsi,
        jenisTugas: t.jenisTugas,
        deadline: new Date(t.deadline),
        lampiran: t.lampiran ? JSON.parse(JSON.stringify(t.lampiran)) : undefined,
        status: t.status,
        guruId: t.guruId,
        mataPelajaranKelasId: t.mataPelajaranKelasId,
      },
    });
  }

  // 8. Seed Pengumpulan Tugas
  console.log("-> Seeding Pengumpulan & Penilaian Tugas...");
  for (const pt of mockPengumpulan) {
    await prisma.pengumpulanTugas.upsert({
      where: {
        tugasId_siswaId: {
          tugasId: pt.tugasId,
          siswaId: pt.siswaId,
        },
      },
      update: {
        nilai: pt.nilai,
        komentar: pt.komentar,
        statusKoreksi: pt.statusKoreksi,
      },
      create: {
        id: pt.id,
        tugasId: pt.tugasId,
        siswaId: pt.siswaId,
        files: JSON.parse(JSON.stringify(pt.files)),
        catatan: pt.catatan,
        nilai: pt.nilai,
        komentar: pt.komentar,
        statusKoreksi: pt.statusKoreksi,
        tanggalKumpul: pt.tanggalKumpul ? new Date(pt.tanggalKumpul) : null,
        tanggalKoreksi: pt.tanggalKoreksi ? new Date(pt.tanggalKoreksi) : null,
      },
    });
  }

  // 9. Seed Prestasi Siswa
  console.log("-> Seeding Prestasi Siswa...");
  for (const p of mockPrestasi) {
    await prisma.prestasi.upsert({
      where: { id: p.id },
      update: {
        judul: p.judul,
        isVerified: p.isVerified,
      },
      create: {
        id: p.id,
        judul: p.judul,
        deskripsi: p.deskripsi,
        kategori: p.kategori,
        tingkat: p.tingkat,
        peringkat: p.peringkat,
        tanggal: new Date(p.tanggal),
        bukti: p.bukti ? JSON.parse(JSON.stringify(p.bukti)) : undefined,
        isVerified: p.isVerified,
        siswaId: p.siswaId,
        diinputOlehId: p.diinputOlehId,
      },
    });
  }

  console.log("✅ Seeding Berhasil! Seluruh data awal Al-Azhar Cairo telah tersimpan di MySQL.");
}

main()
  .catch((e) => {
    console.error("❌ Seeder Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
