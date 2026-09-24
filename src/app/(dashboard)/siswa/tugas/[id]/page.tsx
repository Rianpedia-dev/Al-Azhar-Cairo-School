"use client";

import { use, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { mockTugas, mockPengumpulan } from "@/lib/mock-data";
import { UploadForm } from "@/components/tugas/upload-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  FileText,
  CheckCircle2,
  Download,
  Eye,
  Paperclip,
  Star,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { toast } from "sonner";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DetailTugasSiswaPage({ params }: PageProps) {
  const { user } = useAuth();
  const currentSiswaId = user?.id || "u5";
  const resolvedParams = use(params);
  const tugas = mockTugas.find((t) => t.id === resolvedParams.id) || mockTugas[0];
  const pengumpulan = mockPengumpulan.find((p) => p.tugasId === tugas.id && p.siswaId === currentSiswaId);
  const [submitted, setSubmitted] = useState(Boolean(pengumpulan));
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleUpload = (_files: File[]) => {
    setSubmitted(true);
    toast.success("Tugas Anda berhasil diunggah! Menunggu evaluasi guru.");
  };

  const handleDownloadSoal = (fileName: string) => {
    toast.success(`Mengunduh berkas soal: ${fileName}`);
  };

  const sampleSoalFiles = [
    { nama: `${tugas.judul.toLowerCase().replace(/\s+/g, "_")}_soal.pdf`, ukuran: "1.4 MB", tipe: "PDF" },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <Link
          href="/siswa/tugas"
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          <ArrowLeft className="size-4 mr-1" /> Kembali ke Daftar Tugas
        </Link>
      </div>

      {/* Task Header */}
      <Card className="border-border/80 shadow-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary text-primary-foreground font-semibold">{tugas.jenisTugas}</Badge>
                <Badge variant={tugas.status === "PUBLISHED" ? "default" : "secondary"}>
                  {tugas.status === "PUBLISHED" ? "Aktif" : tugas.status}
                </Badge>
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">{tugas.judul}</CardTitle>
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-lg border">
              <Calendar className="size-4 text-[#FDB913]" />
              <span>Tenggat: {new Date(tugas.deadline).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
            </div>
          </div>
          <CardDescription className="text-sm pt-2 text-foreground/85 leading-relaxed">
            {tugas.deskripsi || "Silakan unduh dan pelajari berkas soal di bawah ini, kerjakan dengan teliti dan jujur, lalu unggah jawaban Anda sebelum batas tenggat berakhir."}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* PRD 7.6.2 TGS-06: Lampiran Soal Guru (Unduh/Pratinjau) */}
      <Card className="border-border/70">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Paperclip className="size-4 text-[#00AEEF]" />
            <span>Lampiran Berkas Soal dari Pendidik</span>
          </CardTitle>
          <CardDescription className="text-xs">
            Unduh lembar soal atau bahan ajar untuk dikerjakan secara offline
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {sampleSoalFiles.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-xl border border-border/70 bg-muted/20 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-rose-50 text-[#E1251B] dark:bg-rose-950/30">
                  <FileText className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight text-foreground">{file.nama}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{file.tipe} • {file.ukuran}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Preview Dialog */}
                <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                  <DialogTrigger render={<Button variant="outline" size="sm" className="text-xs gap-1.5" />}>
                    <Eye className="size-3.5" /> Pratinjau
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 text-base">
                        <FileText className="size-4 text-primary" /> Pratinjau Lembar Soal: {file.nama}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="border rounded-xl p-6 bg-slate-50 dark:bg-zinc-950 text-sm space-y-4 max-h-[500px] overflow-y-auto">
                      <div className="border-b pb-3 text-center">
                        <h3 className="font-bold text-base text-primary">AL-AZHAR CAIRO ISLAMIC SCHOOL</h3>
                        <p className="text-xs text-muted-foreground">{tugas.judul} • Kelas 7A</p>
                      </div>
                      <div className="space-y-3">
                        <p className="font-semibold text-xs text-foreground">PETUNJUK PENGERJAAN:</p>
                        <ol className="list-decimal pl-5 text-xs text-muted-foreground space-y-1">
                          <li>Awali pekerjaan dengan membaca Basmalah dan doa belajar.</li>
                          <li>Tuliskan langkah-langkah penyelesaian secara runtut dan jelas.</li>
                          <li>Foto atau scan lembar jawaban dalam format PDF/Gambar sebelum diunggah.</li>
                        </ol>
                        <p className="font-semibold text-xs text-foreground pt-2">SOAL UTAMA:</p>
                        <p className="text-xs bg-card p-3 rounded-lg border">
                          1. Tentukan himpunan penyelesaian dari persamaan kuadrat x² - 5x + 6 = 0.<br />
                          2. Hitung volume tabung dengan jari-jari r = 7 cm dan tinggi t = 10 cm.<br />
                          3. Jelaskan nilai-nilai akhlak mulia dalam materi ini.
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs gap-1.5"
                  onClick={() => handleDownloadSoal(file.nama)}
                >
                  <Download className="size-3.5" /> Unduh
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Result if graded or submitted */}
      {submitted && (
        <Card className="border-[#008C45]/40 bg-emerald-50/20 dark:bg-emerald-950/20 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#008C45] font-bold">
                <CheckCircle2 className="size-5" /> Tugas Sudah Dikumpulkan
              </div>
              {pengumpulan?.nilai != null && (
                <div className="flex items-center gap-1.5 bg-[#008C45]/10 text-[#008C45] px-3 py-1 rounded-full text-xs font-bold border border-[#008C45]/30">
                  <Star className="size-3.5 fill-[#008C45]" />
                  Nilai: {pengumpulan.nilai} / 100 (Mumtaz)
                </div>
              )}
            </div>
            <CardDescription className="text-xs">
              {pengumpulan?.nilai != null
                ? "Pekerjaan Anda telah diperiksa dan dinilai oleh bapak/ibu guru."
                : "Berkas Anda telah diterima di sistem dan sedang dalam antrean evaluasi guru."}
            </CardDescription>
          </CardHeader>
          {pengumpulan?.komentar && (
            <CardContent className="text-xs text-muted-foreground pt-0 space-y-1">
              <p className="font-semibold text-foreground flex items-center gap-1">
                <Sparkles className="size-3.5 text-[#FDB913]" /> Catatan Evaluasi Guru:
              </p>
              <p className="italic bg-card p-3 rounded-lg border text-foreground/90">
                &ldquo;{pengumpulan.komentar}&rdquo;
              </p>
            </CardContent>
          )}
        </Card>
      )}

      {/* Upload Form (PRD 7.6.4) */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <span>📤</span> {submitted ? "Unggah Ulang / Perbarui Jawaban" : "Unggah Berkas Jawaban"}
        </h2>
        <UploadForm onUpload={handleUpload} />
      </div>
    </div>
  );
}
