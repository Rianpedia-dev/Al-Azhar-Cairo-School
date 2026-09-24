"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
  Calendar,
  ArrowRight,
  Star,
  Quote,
  MapPin,
  Trophy,
} from "lucide-react";
import { mockTugas, mockPrestasi } from "@/lib/mock-data";
import Link from "next/link";

export default function SiswaDashboardPage() {
  const upcomingTugas = mockTugas.slice(0, 3);

  // PRD 7.2.3: Nilai Terakhir (5 nilai terakhir dengan bintang ⭐ PRD 9.1.6)
  const nilaiTerakhir = [
    {
      id: "n1",
      mapel: "Tahfidz Al-Qur'an",
      tugas: "Tasmi' Juz 30 (Surah An-Naba s.d An-Nas)",
      nilai: 98,
      stars: "⭐⭐⭐⭐⭐",
      predikat: "A (Mumtaz)",
      guru: "Ustadz Hilman, S.Pd.I",
      komentar: "Makhraj dan tajwid sangat fasih dan lancar. Mumtaz!",
      tanggal: "22 Sep 2026",
    },
    {
      id: "n2",
      mapel: "Pendidikan Agama Islam",
      tugas: "Resume Rukun Iman & Implementasi Akhlak",
      nilai: 94,
      stars: "⭐⭐⭐⭐⭐",
      predikat: "A (Mumtaz)",
      guru: "Ustadz Abdullah, Lc",
      komentar: "Analisis hikmah berbakti sangat mendalam.",
      tanggal: "20 Sep 2026",
    },
    {
      id: "n3",
      mapel: "Matematika",
      tugas: "Persamaan Linear & Bangun Ruang",
      nilai: 88,
      stars: "⭐⭐⭐⭐",
      predikat: "B (Jayyid Jiddan)",
      guru: "Ibu Nurhayati, M.Pd",
      komentar: "Langkah runtut, perhatikan ketelitian nomor 4.",
      tanggal: "18 Sep 2026",
    },
    {
      id: "n4",
      mapel: "Bahasa Arab",
      tugas: "Qira'ah & Muhadatsah Fil-Fashli",
      nilai: 92,
      stars: "⭐⭐⭐⭐⭐",
      predikat: "A (Mumtaz)",
      guru: "Ustadzah Fatimah, S.Pd",
      komentar: "Pelafalan kosa kata bahasa Arab sudah sangat percaya diri.",
      tanggal: "15 Sep 2026",
    },
    {
      id: "n5",
      mapel: "Ilmu Pengetahuan Alam",
      tugas: "Laporan Praktikum Sistem Gerak Manusia",
      nilai: 85,
      stars: "⭐⭐⭐⭐",
      predikat: "B (Jayyid Jiddan)",
      guru: "Bapak Rahmad, S.Si",
      komentar: "Diagram gambar anatomi rapi dan jelas.",
      tanggal: "12 Sep 2026",
    },
  ];

  // PRD 7.2.3: Jadwal Hari Ini
  const jadwalHariIni = [
    {
      jam: "07.30 - 08.45",
      mapel: "Tahfidz & Muraja'ah",
      guru: "Ustadz Hilman, S.Pd.I",
      ruang: "Masjid / Kelas 7A",
      status: "Selesai",
    },
    {
      jam: "09.00 - 10.30",
      mapel: "Matematika",
      guru: "Ibu Nurhayati, M.Pd",
      ruang: "R. Teori 203",
      status: "Berlangsung",
    },
    {
      jam: "10.45 - 12.00",
      mapel: "Bahasa Inggris",
      guru: "Mr. Farhan, M.Ed",
      ruang: "Language Lab",
      status: "Berikutnya",
    },
    {
      jam: "13.00 - 14.30",
      mapel: "Pendidikan Agama Islam",
      guru: "Ustadz Abdullah, Lc",
      ruang: "Kelas 7A",
      status: "Berikutnya",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary/90 to-accent p-6 sm:p-7 text-primary-foreground shadow-lg">
        <div className="relative z-10 max-w-2xl space-y-1.5">
          <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/15 text-white/95 backdrop-blur-sm">
            Tahun Ajaran 2026/2027 • Semester Ganjil
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Assalamu&apos;alaikum, Ahmad Fauzi!
          </h1>
          <p className="text-xs sm:text-sm text-primary-foreground/90 font-medium">
            Semangat menuntut ilmu di Al-Azhar Cairo. Pantau jadwal kegiatan belajar, tugas aktif, dan capaian prestasimu di sini.
          </p>
        </div>
      </div>

      {/* Hadits of the Day Card */}
      <Card className="border-l-4 border-l-[#FDB913] bg-amber-50/40 dark:bg-amber-950/20">
        <CardContent className="p-4 flex items-start gap-3">
          <Quote className="size-5 text-[#FDB913] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs md:text-sm">
            <p className="font-semibold text-foreground/90 italic">
              &ldquo;Barangsiapa yang menempuh suatu jalan untuk mencari ilmu, maka Allah akan memudahkan baginya jalan menuju surga.&rdquo;
            </p>
            <p className="text-[11px] sm:text-xs text-muted-foreground font-medium">
              — Hadits Riwayat Muslim no. 2699
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Stat Cards (PRD 7.2.3 & 9.1.6) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Tugas Aktif"
          value={upcomingTugas.length}
          icon={<Clock className="size-5" />}
          variant="warning"
          description="Perlu segera dikumpulkan"
        />
        <StatCard
          title="Tugas Selesai"
          value={12}
          icon={<CheckCircle2 className="size-5" />}
          variant="primary"
          trend={{ value: 100, isPositive: true }}
          description="Tuntas dinilai guru"
        />
        <StatCard
          title="Rata-rata Nilai"
          value="89.6"
          icon={<BookOpen className="size-5" />}
          variant="secondary"
          trend={{ value: 4.5, isPositive: true }}
          description="Predikat Sangat Baik (A)"
        />
        <StatCard
          title="Prestasi Terdaftar"
          value={mockPrestasi.length}
          icon={<Award className="size-5" />}
          variant="accent"
          description="Medali & piagam resmi"
        />
      </div>

      {/* Grid: Jadwal Hari Ini & Tugas Mendatang */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* PRD 7.2.3: Jadwal Hari Ini */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
                <span>🗓️</span> Jadwal Pelajaran Hari Ini
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Rabu, 23 September 2026 • Kelas 7A (SMP)
              </CardDescription>
            </div>
            <Link
              href="/siswa/mata-pelajaran"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "text-xs sm:text-sm text-[#00AEEF] hover:text-[#0095cc]",
              })}
            >
              Lihat Pekanan <ArrowRight className="size-3.5 ml-0.5" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {jadwalHariIni.map((j, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-xl border border-border/70 hover:bg-muted/40 transition-colors"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-sm sm:text-base truncate">{j.mapel}</span>
                    <Badge
                      variant={
                        j.status === "Berlangsung"
                          ? "default"
                          : j.status === "Selesai"
                          ? "secondary"
                          : "outline"
                      }
                      className="text-[10px] sm:text-xs px-2 py-0.5 shrink-0"
                    >
                      {j.status}
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <span>👨‍🏫 {j.guru}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3.5 text-muted-foreground shrink-0" /> {j.ruang}
                    </span>
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-block font-mono text-xs sm:text-sm font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-md whitespace-nowrap">
                    {j.jam}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* PRD 7.2.3: Tugas Mendatang List */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
                <span>📝</span> Tugas yang Harus Dikerjakan
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">Klik untuk melihat detail dan mengunggah berkas jawaban</CardDescription>
            </div>
            <Link
              href="/siswa/tugas"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "text-xs sm:text-sm text-[#008C45] hover:text-[#007439]",
              })}
            >
              Semua Tugas <ArrowRight className="size-3.5 ml-0.5" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingTugas.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-xl border border-border/70 hover:border-[#008C45]/40 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20 transition-all"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base shrink-0">📚</span>
                    <span className="font-semibold text-sm sm:text-base leading-tight truncate">{t.judul}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="size-3.5 text-[#FDB913] shrink-0" />
                    <span className="truncate">Tenggat: {new Date(t.deadline).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                  </p>
                </div>
                <Link
                  href={`/siswa/tugas/${t.id}`}
                  className={buttonVariants({
                    size: "sm",
                    className: "bg-[#008C45] hover:bg-[#007439] text-white text-xs sm:text-sm font-semibold h-8.5 px-3.5 shrink-0",
                  })}
                >
                  Kerjakan
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Grid: Nilai Terakhir (Bintang ⭐) & Lemari Prestasi */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* PRD 7.2.3 & 9.1.6: Nilai Terakhir */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
                <span>⭐</span> Nilai Terakhir & Catatan Guru
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Hasil evaluasi tugas beserta feedback dari bapak/ibu pendidik
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-xs gap-1 border-amber-400 text-amber-600">
              <Star className="size-3 fill-amber-400 text-amber-400" /> Skala A-E
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {nilaiTerakhir.map((n) => (
              <div
                key={n.id}
                className="p-3 sm:p-3.5 rounded-xl border border-border/70 hover:border-amber-400/40 hover:bg-amber-50/10 transition-all space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <span className="text-xs sm:text-sm font-bold text-primary block truncate">
                      {n.mapel}
                    </span>
                    <p className="text-sm sm:text-base font-semibold truncate">{n.tugas}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-lg sm:text-xl font-extrabold text-foreground">{n.nilai}</div>
                    <div className="text-xs sm:text-sm text-amber-500 tracking-wider">{n.stars}</div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground italic bg-muted/40 p-2.5 rounded-lg leading-relaxed">
                  &ldquo;{n.komentar}&rdquo; — <span className="font-semibold not-italic text-foreground/80">{n.guru}</span>
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Lemari Prestasi Showcase Card (PRD 7.2.3: Prestasi Saya) */}
        <Card className="border border-[#FDB913]/40 bg-gradient-to-br from-amber-50/30 to-transparent dark:from-amber-950/20 h-fit">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <Trophy className="size-5 text-[#FDB913]" />
              <div>
                <CardTitle className="text-base sm:text-lg font-bold">Prestasi Terdaftar Saya</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Piagam & sertifikat yang diakui resmi sekolah</CardDescription>
              </div>
            </div>
            <Link
              href="/siswa/prestasi"
              className={buttonVariants({ variant: "ghost", size: "sm", className: "text-xs sm:text-sm text-primary" })}
            >
              Lemari Prestasi <ArrowRight className="size-3.5 ml-0.5" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {mockPrestasi.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-lg border border-border/60 bg-background hover:bg-muted/30 transition-colors">
                <div className="space-y-0.5 min-w-0 flex-1">
                  <p className="text-sm sm:text-base font-semibold leading-tight text-foreground truncate">{p.judul}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{p.kategori} • {p.tingkat}</p>
                </div>
                <Badge className="bg-[#FDB913] text-slate-900 font-bold text-xs sm:text-sm px-2.5 py-0.5 shrink-0">
                  {p.peringkat}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
