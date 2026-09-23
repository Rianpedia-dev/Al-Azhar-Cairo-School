"use client";

import { mockMataPelajaran } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, User, Calendar } from "lucide-react";

export default function SiswaMataPelajaranPage() {
  const mapelSiswa = mockMataPelajaran.filter((m) => m.jenjangId === "j1"); // SD Kelas 1A

  const schedules = [
    { day: "Senin", time: "07.30 - 09.00", subject: "Matematika", teacher: "Ustadz Budi, S.Pd" },
    { day: "Senin", time: "09.30 - 11.00", subject: "Bahasa Indonesia", teacher: "Ustadzah Siti, M.Pd" },
    { day: "Selasa", time: "07.30 - 09.00", subject: "PAI & Budi Pekerti", teacher: "Ustadz Ahmad, Lc" },
    { day: "Rabu", time: "07.30 - 09.00", subject: "Tahfidz & Tahsin", teacher: "Ustadz Zulkifli, Al-Hafidz" },
    { day: "Kamis", time: "07.30 - 09.00", subject: "Ilmu Pengetahuan Alam", teacher: "Ustadz Ridwan, S.Si" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <span>📖</span> Mata Pelajaran & Jadwal Belajar
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Daftar mata pelajaran aktif dan jadwal mingguan kelas Anda
        </p>
      </div>

      {/* Schedule Table / Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Calendar className="size-4 text-emerald-600" /> Jadwal Pelajaran Mingguan
          </CardTitle>
          <CardDescription className="text-xs">Kelas 1A — Semester Ganjil 2026/2027</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {schedules.map((sc, i) => (
              <div key={i} className="p-3 rounded-xl border border-border/70 bg-card hover:bg-muted/30 transition-colors space-y-1.5">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] font-bold text-emerald-600 border-emerald-500/40">
                    {sc.day}
                  </Badge>
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <Clock className="size-3" /> {sc.time}
                  </span>
                </div>
                <p className="font-bold text-sm text-foreground">{sc.subject}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <User className="size-3 text-teal-600" /> {sc.teacher}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subject cards */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-3">Daftar Kurikulum Pelajaran</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mapelSiswa.map((m) => (
            <Card key={m.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-600">{m.kode}</span>
                  <Badge variant="secondary" className="text-[10px]">Kurikulum SD</Badge>
                </div>
                <CardTitle className="text-base font-bold mt-1 flex items-center gap-2">
                  <BookOpen className="size-4 text-emerald-600" /> {m.nama}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground pt-0">
                {m.deskripsi || "Mata pelajaran wajib berstandar Al-Azhar Cairo."}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
