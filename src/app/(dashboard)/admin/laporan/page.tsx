"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, CheckCircle, BarChart3, Calendar } from "lucide-react";
import { toast } from "sonner";

export default function AdminLaporanPage() {
  const handleExport = (type: string) => {
    toast.success(`Ekspor data ${type} berhasil disiapkan (format PDF/Excel)`);
  };

  const reports = [
    {
      title: "Laporan Prestasi Siswa",
      description: "Rekapitulasi seluruh capaian lomba dan kejuaraan tingkat kota hingga internasional.",
      format: "PDF & Excel",
      type: "Prestasi",
    },
    {
      title: "Statistik Pengumpulan Tugas",
      description: "Tingkat ketepatan waktu pengumpulan berkas tugas per kelas dan jenjang.",
      format: "Excel (.xlsx)",
      type: "Tugas",
    },
    {
      title: "Rekapitulasi Nilai Akademik",
      description: "Daftar rata-rata nilai per mata pelajaran untuk evaluasi semester.",
      format: "Excel (.xlsx)",
      type: "Akademik",
    },
    {
      title: "Laporan Keaktifan Siswa",
      description: "Aktivitas login, interaksi ruang belajar, dan komunikasi sekolah.",
      format: "PDF",
      type: "Keaktifan",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Laporan & Ekspor Data
        </h1>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {reports.map((rep) => (
          <Card key={rep.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <FileText className="size-5 text-emerald-600" />
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-muted text-muted-foreground">
                  {rep.format}
                </span>
              </div>
              <CardTitle className="text-base font-bold mt-2">{rep.title}</CardTitle>
              <CardDescription className="text-xs">{rep.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs gap-1.5"
                onClick={() => handleExport(rep.type)}
              >
                <Download className="size-3.5" /> Unduh Dokumen
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
