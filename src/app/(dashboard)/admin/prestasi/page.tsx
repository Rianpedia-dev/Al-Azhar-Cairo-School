"use client";

import { useState } from "react";
import { mockPrestasi } from "@/lib/mock-data";
import { Prestasi } from "@/types";
import { PrestasiTable } from "@/components/prestasi/prestasi-table";
import { Button } from "@/components/ui/button";
import { Award, CheckCircle2, Filter } from "lucide-react";
import { toast } from "sonner";

export default function AdminPrestasiPage() {
  const [prestasiList, setPrestasiList] = useState<Prestasi[]>(mockPrestasi);

  const handleVerify = (id: string) => {
    setPrestasiList(
      prestasiList.map((p) =>
        p.id === id ? { ...p, isVerified: !p.isVerified } : p
      )
    );
    toast.success("Status verifikasi prestasi berhasil diperbarui");
  };

  const handleEdit = (p: Prestasi) => {
    toast.info(`Edit data prestasi: ${p.judul}`);
  };

  const handleDelete = (id: string) => {
    setPrestasiList(prestasiList.filter((p) => p.id !== id));
    toast.success("Prestasi berhasil dihapus");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span>🏆</span> Verifikasi Prestasi Siswa
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Daftar pengajuan piagam dan kejuaraan siswa SD & SMP untuk diverifikasi admin
          </p>
        </div>
      </div>

      <PrestasiTable
        data={prestasiList}
        showVerifyAction={true}
        onVerify={handleVerify}
        onView={handleEdit}
      />
    </div>
  );
}
