// prisma/seed.ts per PRD 4.2 & 12 (Phase 1)
import { mockUsers, mockKelas, mockMataPelajaran, mockTugas, mockPrestasi } from "../src/lib/mock-data";

async function main() {
  console.log("🌱 Starting Al-Azhar Cairo Database Seeder...");
  console.log(`Loaded ${mockUsers.length} users`);
  console.log(`Loaded ${mockKelas.length} kelas`);
  console.log(`Loaded ${mockMataPelajaran.length} mata pelajaran`);
  console.log(`Loaded ${mockTugas.length} tugas`);
  console.log(`Loaded ${mockPrestasi.length} prestasi`);
  console.log("✅ Seed data ready for database deployment.");
}

main().catch((e) => {
  console.error("❌ Seed error:", e);
  process.exit(1);
});
