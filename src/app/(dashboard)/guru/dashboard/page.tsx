"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { ChartWidget } from "@/components/dashboard/chart-widget";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  BookOpen,
  ClipboardCheck,
  CheckCircle,
  MessageSquare,
  Plus,
  ArrowRight,
  Clock,
  Calendar,
  Users,
  AlertCircle,
} from "lucide-react";
import { mockPengumpulan, mockTugas } from "@/lib/mock-data";
import Link from "next/link";

export default function GuruDashboardPage() {
  const pendingKoreksi = mockPengumpulan.filter((p) => p.statusKoreksi === "DIKUMPULKAN").length;

  const kelasSubmisiData = [
    { name: "Kelas 1A SD", total: 24 },
    { name: "Kelas 1B SD", total: 22 },
    { name: "Kelas 7A SMP", total: 28 },
    { name: "Kelas 7B SMP", total: 26 },
  ];

  const pengumpulanRatioData = [
    { name: "Sudah Dinilai", value: 65 },
    { name: "Menunggu Koreksi", value: 20 },
    { name: "Perlu Revisi", value: 15 },
  ];

  // PRD 7.2.2: Kelas yang Diampu
  const kelasDiampu = [
    { id: "k1", nama: "Kelas 1A (Al-Fatihah)", jenjang: "SD", siswa: 28, mapel: "Pendidikan Agama Islam" },
    { id: "k2", nama: "Kelas 1B (An-Nas)", jenjang: "SD", siswa: 26, mapel: "Pendidikan Agama Islam" },
    { id: "k3", nama: "Kelas 7A (Ibnu Khaldun)", jenjang: "SMP", siswa: 32, mapel: "Matematika & Karakter" },
  ];

  // PRD 7.2.2: Kalender Deadline Tugas Terdekat
  const timelineDeadline = [
    {
      id: "dl1",
      judul: "Tugas Aljabar & Karakter Islami",
      kelas: "Kelas 7A SMP",
      deadline: "24 Sep 2026, 23:59",
      urgensi: "Besok",
      status: "Aktif",
    },
    {
      id: "dl2",
      judul: "Hafalan Surat Pendek PAI",
      kelas: "Kelas 1A SD",
      deadline: "26 Sep 2026, 17:00",
      urgensi: "3 Hari Lagi",
      status: "Aktif",
    },
    {
      id: "dl3",
      judul: "Latihan Penjumlahan Cepat",
      kelas: "Kelas 1B SD",
      deadline: "28 Sep 2026, 23:59",
      urgensi: "5 Hari Lagi",
      status: "Aktif",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Dashboard Pendidik
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/guru/tugas/buat"
            className={buttonVariants({
              className: "bg-[#008C45] hover:bg-[#007439] text-white shadow-sm",
            })}
          >
            <Plus className="size-4 mr-1.5" /> Buat Tugas Baru
          </Link>
        </div>
      </div>

      {/* Stat Cards (PRD 7.2.2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Kelas Diampu"
          value={kelasDiampu.length}
          icon={<BookOpen className="size-5" />}
          variant="primary"
          description="1A SD, 1B SD, 7A SMP"
        />
        <StatCard
          title="Menunggu Koreksi"
          value={pendingKoreksi}
          icon={<ClipboardCheck className="size-5" />}
          variant="warning"
          trend={{ value: 4, isPositive: false }}
          description="Jawaban siswa perlu dinilai"
        />
        <StatCard
          title="Rata-rata Nilai"
          value="88.5"
          icon={<CheckCircle className="size-5" />}
          variant="secondary"
          trend={{ value: 3.2, isPositive: true }}
          description="Predikat Sangat Baik (A)"
        />
        <StatCard
          title="Pesan Siswa"
          value={2}
          icon={<MessageSquare className="size-5" />}
          variant="accent"
          description="Pertanyaan materi di ruang chat"
        />
      </div>

      {/* PRD 7.2.2: Kelas yang Diampu Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <span>🏫</span> Kelas yang Diampu
            </CardTitle>
            <CardDescription className="text-xs">
              Rombongan belajar dan mata pelajaran aktif semester ini
            </CardDescription>
          </div>
          <Link
            href="/guru/kelas-saya"
            className={buttonVariants({ variant: "ghost", size: "sm", className: "text-xs text-[#008C45]" })}
          >
            Lihat Jadwal Mengajar <ArrowRight className="size-3 ml-0.5" />
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {kelasDiampu.map((k) => (
              <div
                key={k.id}
                className="p-4 rounded-xl border border-border/70 hover:border-[#008C45]/50 bg-card hover:bg-muted/30 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs font-semibold">
                    {k.jenjang}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="size-3.5 text-[#00AEEF]" /> {k.siswa} Siswa
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-foreground">{k.nama}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{k.mapel}</p>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <Link
                    href="/guru/tugas/buat"
                    className={buttonVariants({
                      variant: "outline",
                      size: "sm",
                      className: "text-[11px] h-7 w-full border-border/80",
                    })}
                  >
                    Beri Tugas
                  </Link>
                  <Link
                    href="/guru/kelas-saya"
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                      className: "text-[11px] h-7 w-full text-[#27348B] dark:text-[#00AEEF]",
                    })}
                  >
                    Roster Siswa
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <ChartWidget
          type="bar"
          title="Pengumpulan Tugas per Kelas"
          description="Jumlah tugas yang sudah dikumpulkan siswa minggu ini"
          data={kelasSubmisiData}
          dataKey="total"
          xAxisKey="name"
        />
        <ChartWidget
          type="pie"
          title="Rasio Status Penilaian"
          description="Distribusi tugas yang sudah dinilai, menunggu koreksi, dan revisi"
          data={pengumpulanRatioData}
          dataKey="value"
          nameKey="name"
        />
      </div>

      {/* Bottom Grid: Tugas Menunggu Koreksi & Kalender Timeline Deadline */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Tugas Menunggu Koreksi */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <span>📝</span> Tugas Menunggu Koreksi
              </CardTitle>
              <CardDescription className="text-xs">Segera periksa berkas siswa dan berikan penilaian</CardDescription>
            </div>
            <Link
              href="/guru/tugas"
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
            {mockPengumpulan.slice(0, 3).map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-lg border border-border/60 hover:bg-muted/30 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold leading-tight">{p.siswa?.name || "Ahmad Fauzi"}</p>
                    <Badge variant="outline" className="text-[10px] text-amber-600 border-amber-300">
                      Menunggu
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="size-3" /> Dikirim {new Date(p.createdAt).toLocaleDateString("id-ID")} • Lembar PDF
                  </p>
                </div>
                <Link
                  href={`/guru/tugas/${p.tugasId}/koreksi`}
                  className={buttonVariants({
                    size: "sm",
                    className: "bg-[#008C45] hover:bg-[#007439] text-white text-xs",
                  })}
                >
                  Koreksi
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* PRD 7.2.2: Kalender Timeline Deadline */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <span>⏰</span> Timeline Deadline Tugas Mendatang
              </CardTitle>
              <CardDescription className="text-xs">Pantau batas waktu pengumpulan tugas para siswa</CardDescription>
            </div>
            <Badge variant="outline" className="text-xs border-[#FDB913] text-amber-600">
              <Calendar className="size-3 mr-1" /> Pekan Ini
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {timelineDeadline.map((t) => (
              <div
                key={t.id}
                className="p-3 rounded-xl border border-border/70 hover:bg-muted/40 transition-colors flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{t.judul}</span>
                    <Badge
                      className={
                        t.urgensi === "Besok"
                          ? "bg-[#E1251B] text-white text-[10px]"
                          : "bg-[#FDB913] text-slate-900 text-[10px]"
                      }
                    >
                      {t.urgensi}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <span>🏫 {t.kelas}</span>
                    <span>•</span>
                    <Clock className="size-3 text-muted-foreground" /> {t.deadline}
                  </p>
                </div>
                <Link
                  href="/guru/tugas"
                  className={buttonVariants({ variant: "ghost", size: "sm", className: "text-xs" })}
                >
                  Detail
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
