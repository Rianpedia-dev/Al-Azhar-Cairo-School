"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { ChartWidget } from "@/components/dashboard/chart-widget";
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
  const radarNilai = [
    { subject: "Matematika", score: 88 },
    { subject: "B. Indonesia", score: 92 },
    { subject: "B. Inggris", score: 85 },
    { subject: "PAI", score: 95 },
    { subject: "IPA", score: 80 },
    { subject: "Tahfidz", score: 98 },
  ];

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
      {/* Welcome Banner with Islamic Spirit (Al-Azhar Cairo) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#27348B] via-[#008C45] to-[#00AEEF] p-6 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Assalamu&apos;alaikum, Ahmad Fauzi! 👋
          </h1>
          <p className="text-white/90 text-sm leading-relaxed">
            Kelas 7A (Ibnu Khaldun) • Semester Ganjil 2026/2027. Kamu memiliki 2 tugas aktif minggu ini. Teruslah istiqomah dalam menuntut ilmu dan berakhlak karimah!
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
            <p className="text-[11px] text-muted-foreground font-medium">
              — Hadits Riwayat Muslim no. 2699
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Stat Cards (PRD 7.2.3 & 9.1.6) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
      <div className="grid md:grid-cols-2 gap-6">
        {/* PRD 7.2.3: Jadwal Hari Ini */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <span>🗓️</span> Jadwal Pelajaran Hari Ini
              </CardTitle>
              <CardDescription className="text-xs">
                Rabu, 23 September 2026 • Kelas 7A (SMP)
              </CardDescription>
            </div>
            <Link
              href="/siswa/mata-pelajaran"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "text-xs text-[#00AEEF]",
              })}
            >
              Lihat Pekanan <ArrowRight className="size-3 ml-0.5" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {jadwalHariIni.map((j, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl border border-border/70 hover:bg-muted/40 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{j.mapel}</span>
                    <Badge
                      variant={
                        j.status === "Berlangsung"
                          ? "default"
                          : j.status === "Selesai"
                          ? "secondary"
                          : "outline"
                      }
                      className="text-[10px] px-1.5 py-0"
                    >
                      {j.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-2">
                    <span>👨‍🏫 {j.guru}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3 text-muted-foreground" /> {j.ruang}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs font-semibold text-[#27348B] dark:text-[#00AEEF]">
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
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <span>📝</span> Tugas yang Harus Dikerjakan
              </CardTitle>
              <CardDescription className="text-xs">Klik untuk melihat detail dan mengunggah berkas jawaban</CardDescription>
            </div>
            <Link
              href="/siswa/tugas"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "text-xs text-[#008C45]",
              })}
            >
              Semua Tugas <ArrowRight className="size-3 ml-0.5" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingTugas.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between p-3 rounded-xl border border-border/70 hover:border-[#008C45]/40 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base">📚</span>
                    <span className="font-semibold text-sm leading-tight">{t.judul}</span>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="size-3 text-[#FDB913]" />
                    Tenggat: {new Date(t.deadline).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
                <Link
                  href={`/siswa/tugas/${t.id}`}
                  className={buttonVariants({
                    size: "sm",
                    className: "bg-[#008C45] hover:bg-[#007439] text-white text-xs h-8",
                  })}
                >
                  Kerjakan
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Grid: Nilai Terakhir (Bintang ⭐) & Radar Chart Capaian */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* PRD 7.2.3 & 9.1.6: Nilai Terakhir */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <span>⭐</span> Nilai Terakhir & Catatan Guru
              </CardTitle>
              <CardDescription className="text-xs">
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
                className="p-3 rounded-xl border border-border/70 hover:border-amber-400/40 hover:bg-amber-50/10 transition-all space-y-1.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-[#27348B] dark:text-[#00AEEF] block">
                      {n.mapel}
                    </span>
                    <p className="text-sm font-semibold">{n.tugas}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-lg font-extrabold text-foreground">{n.nilai}</div>
                    <div className="text-xs text-amber-500 tracking-wider">{n.stars}</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic bg-muted/40 p-2 rounded-lg">
                  &ldquo;{n.komentar}&rdquo; — <span className="font-semibold not-italic">{n.guru}</span>
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Radar Chart & Lemari Prestasi Mini */}
        <div className="space-y-6">
          <ChartWidget
            type="radar"
            title="Radar Capaian Nilai Pelajaran"
            description="Perbandingan nilai rata-rata tiap mata pelajaran semester ini"
            data={radarNilai}
            dataKey="score"
            xAxisKey="subject"
          />

          {/* Prestasi Showcase Card (PRD 7.2.3: Prestasi Saya) */}
          <Card className="border border-[#FDB913]/40 bg-gradient-to-br from-amber-50/30 to-transparent dark:from-amber-950/20">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="size-5 text-[#FDB913]" />
                <div>
                  <CardTitle className="text-base font-bold">Prestasi Terdaftar Saya</CardTitle>
                  <CardDescription className="text-xs">Piagam & sertifikat yang diakui resmi</CardDescription>
                </div>
              </div>
              <Link
                href="/siswa/prestasi"
                className={buttonVariants({ variant: "ghost", size: "sm", className: "text-xs text-[#27348B] dark:text-[#00AEEF]" })}
              >
                Lemari Prestasi <ArrowRight className="size-3 ml-0.5" />
              </Link>
            </CardHeader>
            <CardContent className="space-y-2">
              {mockPrestasi.slice(0, 2).map((p) => (
                <div key={p.id} className="flex items-center justify-between p-2.5 rounded-lg border border-border/60 bg-background">
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold leading-tight">{p.judul}</p>
                    <p className="text-xs text-muted-foreground">{p.kategori} • {p.tingkat}</p>
                  </div>
                  <Badge className="bg-[#FDB913] text-slate-900 font-bold text-xs">
                    {p.peringkat}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
