"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { ChartWidget } from "@/components/dashboard/chart-widget";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Users,
  GraduationCap,
  School,
  Award,
  ArrowUpRight,
  PlusCircle,
  Download,
  Activity,
  CheckCircle2,
  FileText,
  UserPlus,
  LogIn,
} from "lucide-react";
import { mockUsers, mockKelas, mockTugas, mockPrestasi } from "@/lib/mock-data";
import Link from "next/link";

export default function AdminDashboardPage() {
  const totalGuru = mockUsers.filter((u) => u.role === "GURU").length;
  const totalSiswa = mockUsers.filter((u) => u.role === "SISWA").length;

  // Chart data
  const prestasiByBulan = [
    { name: "Jan", total: 4 },
    { name: "Feb", total: 7 },
    { name: "Mar", total: 12 },
    { name: "Apr", total: 9 },
    { name: "Mei", total: 15 },
    { name: "Jun", total: 18 },
  ];

  const pengumpulanData = [
    { name: "Tepat Waktu", value: 68 },
    { name: "Terlambat", value: 18 },
    { name: "Belum Mengumpulkan", value: 14 },
  ];

  // PRD 7.2.1: Aktivitas Terkini (Log aktivitas pengguna terbaru)
  const aktivitasTerkini = [
    {
      id: "act-1",
      user: "Ustadzah Fatimah, S.Pd",
      role: "GURU",
      action: "Membuat tugas baru: Tugas Matematika & Karakter Islami (Kelas 7A)",
      time: "10 menit yang lalu",
      icon: <FileText className="size-4 text-[#00AEEF]" />,
    },
    {
      id: "act-2",
      user: "Ahmad Fauzi",
      role: "SISWA",
      action: "Mengunggah berkas jawaban tugas Aljabar (tugas_mandiri.pdf)",
      time: "25 menit yang lalu",
      icon: <CheckCircle2 className="size-4 text-[#008C45]" />,
    },
    {
      id: "act-3",
      user: "Ustadz Hilman, S.Pd.I",
      role: "GURU",
      action: "Mendaftarkan prestasi siswa: Juara 1 Tahfidz Qur'an Tingkat Provinsi",
      time: "1 jam yang lalu",
      icon: <Award className="size-4 text-[#FDB913]" />,
    },
    {
      id: "act-4",
      user: "Admin Al-Azhar",
      role: "ADMIN",
      action: "Menambahkan 5 akun peserta didik baru melalui modul CSV",
      time: "2 jam yang lalu",
      icon: <UserPlus className="size-4 text-primary" />,
    },
    {
      id: "act-5",
      user: "Siti Aisyah",
      role: "SISWA",
      action: "Login ke portal siswa Al-Azhar Cairo",
      time: "3 jam yang lalu",
      icon: <LogIn className="size-4 text-muted-foreground" />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Dashboard Admin
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/laporan"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <Download className="size-4 mr-1.5" /> Unduh Laporan
          </Link>
          <Link
            href="/admin/users"
            className={buttonVariants({
              size: "sm",
              className: "bg-[#008C45] hover:bg-[#007439] text-white",
            })}
          >
            <PlusCircle className="size-4 mr-1.5" /> Tambah Pengguna
          </Link>
        </div>
      </div>

      {/* Stat Cards (PRD 7.2.1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Siswa"
          value={totalSiswa}
          icon={<GraduationCap className="size-5" />}
          variant="primary"
          trend={{ value: 8, isPositive: true }}
          description="Siswa SD & SMP aktif"
        />
        <StatCard
          title="Total Tenaga Pendidik"
          value={totalGuru}
          icon={<Users className="size-5" />}
          variant="secondary"
          description="Guru mata pelajaran & wali kelas"
        />
        <StatCard
          title="Total Rombel Kelas"
          value={mockKelas.length}
          icon={<School className="size-5" />}
          variant="accent"
          description="Kelas 1-6 SD & 7-9 SMP"
        />
        <StatCard
          title="Prestasi Terverifikasi"
          value={mockPrestasi.length}
          icon={<Award className="size-5" />}
          variant="warning"
          trend={{ value: 15, isPositive: true }}
          description="Capaian akademik & non-akademik"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <ChartWidget
          type="bar"
          title="Grafik Capaian Prestasi Siswa"
          description="Perkembangan jumlah prestasi tercatat per bulan di tahun ajaran 2026"
          data={prestasiByBulan}
          dataKey="total"
          xAxisKey="name"
        />
        <ChartWidget
          type="pie"
          title="Statistik Pengumpulan Tugas"
          description="Rasio ketepatan pengumpulan tugas seluruh jenjang"
          data={pengumpulanData}
          dataKey="value"
          nameKey="name"
        />
      </div>

      {/* Bottom Grid: Recent Tasks & Prestasi */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Tugas */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <span>📝</span> Tugas Aktif Terbaru
              </CardTitle>
              <CardDescription className="text-xs">5 tugas terakhir yang dibuat pendidik</CardDescription>
            </div>
            <Link
              href="/guru/tugas"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "text-xs text-[#008C45]",
              })}
            >
              Lihat Semua <ArrowUpRight className="size-3 ml-0.5" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockTugas.slice(0, 5).map((tugas) => (
              <div key={tugas.id} className="flex items-center justify-between p-2.5 rounded-lg border border-border/60 hover:bg-muted/40 transition-colors">
                <div className="space-y-1">
                  <p className="text-sm font-semibold leading-none">{tugas.judul}</p>
                  <p className="text-xs text-muted-foreground">Deadline: {new Date(tugas.deadline).toLocaleDateString("id-ID")}</p>
                </div>
                <Badge variant={tugas.status === "PUBLISHED" ? "default" : "secondary"} className="text-[10px]">
                  {tugas.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Prestasi */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <span>🏆</span> Prestasi Terbaru Siswa
              </CardTitle>
              <CardDescription className="text-xs">Menunggu verifikasi dan arsip resmi sekolah</CardDescription>
            </div>
            <Link
              href="/admin/prestasi"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "text-xs text-[#008C45]",
              })}
            >
              Kelola <ArrowUpRight className="size-3 ml-0.5" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockPrestasi.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-2.5 rounded-lg border border-border/60 hover:bg-muted/40 transition-colors">
                <div className="space-y-1">
                  <p className="text-sm font-semibold leading-none">{item.judul}</p>
                  <p className="text-xs text-muted-foreground">{item.kategori} • {item.tingkat}</p>
                </div>
                <Badge variant={item.isVerified ? "default" : "outline"} className="text-[10px]">
                  {item.isVerified ? "Terverifikasi" : "Menunggu"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* PRD 7.2.1: Log Aktivitas Terkini Pengguna */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Activity className="size-4 text-[#008C45]" />
              <span>Aktivitas Terkini Sistem</span>
            </CardTitle>
            <CardDescription className="text-xs">
              Log aktivitas pengguna terbaru (Admin, Guru, dan Siswa)
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-xs font-normal">
            Real-time feed
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border/60">
            {aktivitasTerkini.map((act) => (
              <div key={act.id} className="py-3 flex items-start gap-3 first:pt-0 last:pb-0">
                <div className="p-2 rounded-lg bg-muted/60 shrink-0 mt-0.5">
                  {act.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-foreground">{act.user}</span>
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      {act.role}
                    </Badge>
                    <span className="text-xs text-muted-foreground ml-auto">{act.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{act.action}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
