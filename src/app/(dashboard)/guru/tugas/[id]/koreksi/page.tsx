"use client";

import { use } from "react";
import { KoreksiViewer } from "@/components/tugas/koreksi-viewer";
import { mockPengumpulan, mockTugas } from "@/lib/mock-data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function KoreksiTugasPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const tugas = mockTugas.find((t) => t.id === resolvedParams.id) || mockTugas[0];
  const pengumpulan = mockPengumpulan.find((p) => p.tugasId === tugas.id) || mockPengumpulan[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href={`/guru/tugas/${tugas.id}`}
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          <ArrowLeft className="size-4 mr-1" /> Kembali ke Detail Tugas
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <span>🔍</span> Koreksi & Penilaian Berkas
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Tugas: <span className="font-semibold text-foreground">{tugas.judul}</span>
        </p>
      </div>

      <KoreksiViewer
        studentName={pengumpulan.siswa?.name || "Ahmad Fauzi (Siswa)"}
        fileName="tugas_mandiri.pdf"
        fileUrl="/uploads/sample.pdf"
        taskTitle={tugas.judul}
      />
    </div>
  );
}
