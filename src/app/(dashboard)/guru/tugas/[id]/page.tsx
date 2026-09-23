"use client";

import { use } from "react";
import { mockTugas, mockPengumpulan } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Clock, Calendar, CheckCircle2, User, FileText } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DetailTugasGuruPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const tugas = mockTugas.find((t) => t.id === resolvedParams.id) || mockTugas[0];
  const pengumpulan = mockPengumpulan.filter((p) => p.tugasId === tugas.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/guru/tugas"
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          <ArrowLeft className="size-4 mr-1" /> Kembali ke Daftar Tugas
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-teal-600 text-white">{tugas.jenisTugas}</Badge>
                <Badge variant={tugas.status === "PUBLISHED" ? "default" : "secondary"}>
                  {tugas.status}
                </Badge>
              </div>
              <CardTitle className="text-2xl font-bold">{tugas.judul}</CardTitle>
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Calendar className="size-4 text-amber-500" />
              Tenggat: {new Date(tugas.deadline).toLocaleDateString("id-ID")}
            </div>
          </div>
          <CardDescription className="text-sm pt-2">
            {tugas.deskripsi || "Tidak ada petunjuk khusus untuk tugas ini."}
          </CardDescription>
        </CardHeader>
      </Card>

      <div>
        <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <span>📥</span> Daftar Jawaban Terkumpul ({pengumpulan.length} Siswa)
        </h2>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Siswa</TableHead>
                  <TableHead>Tanggal Kumpul</TableHead>
                  <TableHead>Status Koreksi</TableHead>
                  <TableHead>Nilai</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pengumpulan.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground text-sm">
                      Belum ada siswa yang mengumpulkan tugas ini
                    </TableCell>
                  </TableRow>
                ) : (
                  pengumpulan.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <User className="size-4 text-muted-foreground" /> Siswa #{p.siswaId.slice(-4)}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {p.tanggalKumpul ? new Date(p.tanggalKumpul).toLocaleDateString("id-ID") : "-"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={p.statusKoreksi === "SUDAH_DINILAI" ? "default" : "outline"}>
                          {p.statusKoreksi}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-bold">
                        {p.nilai != null ? p.nilai : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link
                          href={`/guru/tugas/${tugas.id}/koreksi`}
                          className={buttonVariants({
                            size: "sm",
                            className: "bg-teal-600 hover:bg-teal-700 text-white text-xs",
                          })}
                        >
                          Koreksi & Nilai
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
