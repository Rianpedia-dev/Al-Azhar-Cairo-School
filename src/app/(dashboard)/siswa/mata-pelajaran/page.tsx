"use client";

import { mockMataPelajaran } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Mata Pelajaran & Jadwal Belajar
        </h1>
      </div>

      {/* Schedule Table */}
      <Card className="border-border/70 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Calendar className="size-4 text-primary" /> Jadwal Pelajaran Mingguan
          </CardTitle>
          <CardDescription className="text-xs">Kelas 1A — Semester Ganjil 2026/2027</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="w-[120px] font-bold text-xs uppercase">Hari</TableHead>
                  <TableHead className="w-[160px] font-bold text-xs uppercase">Waktu</TableHead>
                  <TableHead className="font-bold text-xs uppercase">Mata Pelajaran</TableHead>
                  <TableHead className="font-bold text-xs uppercase">Pendidik / Pengampu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.map((sc, i) => (
                  <TableRow key={i} className="hover:bg-muted/30">
                    <TableCell className="font-semibold text-xs">
                      <Badge variant="outline" className="text-xs font-semibold border-primary/40 text-primary">
                        {sc.day}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                      <span className="flex items-center gap-1.5">
                        <Clock className="size-3.5 text-muted-foreground shrink-0" />
                        {sc.time}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold text-xs text-foreground">
                      {sc.subject}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <User className="size-3.5 text-primary shrink-0" />
                        {sc.teacher}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Curriculum Subject Table */}
      <Card className="border-border/70 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <BookOpen className="size-4 text-primary" /> Daftar Kurikulum Pelajaran
          </CardTitle>
          <CardDescription className="text-xs">
            Daftar mata pelajaran wajib dan kurikulum pembelajaran Kelas 1A SD Al-Azhar Cairo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="w-[100px] font-bold text-xs uppercase">Kode</TableHead>
                  <TableHead className="w-[240px] font-bold text-xs uppercase">Mata Pelajaran</TableHead>
                  <TableHead className="w-[140px] font-bold text-xs uppercase">Tingkat</TableHead>
                  <TableHead className="font-bold text-xs uppercase">Deskripsi & Keterangan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mapelSiswa.map((m) => (
                  <TableRow key={m.id} className="hover:bg-muted/30">
                    <TableCell className="font-semibold text-xs">
                      <Badge variant="outline" className="font-mono text-xs font-bold border-primary/30 text-primary">
                        {m.kode}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-xs text-foreground">
                      <div className="flex items-center gap-2">
                        <BookOpen className="size-3.5 text-primary shrink-0" />
                        <span>{m.nama}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">
                      <Badge variant="secondary" className="text-[11px] font-medium">
                        Kurikulum SD
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {m.deskripsi || "Mata pelajaran wajib berstandar Al-Azhar Cairo."}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
