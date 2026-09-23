"use client";

import { useState } from "react";
import { mockTugas } from "@/lib/mock-data";
import { TugasCard } from "@/components/tugas/tugas-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SiswaTugasPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("ALL");

  const filtered = mockTugas.filter((t) => {
    const matchSearch = t.judul.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "ALL" || t.jenisTugas === filterType;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <span>📚</span> Tugas & Evaluasi Belajar
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Lihat daftar penugasan aktif dari guru, periksa tenggat waktu, dan kirim jawaban
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Cari tugas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 w-full sm:w-auto">
          {["ALL", "ESSAY", "PILIHAN_GANDA", "UPLOAD_FILE", "PROYEK"].map((tp) => (
            <Button
              key={tp}
              size="sm"
              variant={filterType === tp ? "default" : "outline"}
              className={filterType === tp ? "bg-emerald-600 text-white text-xs h-8" : "text-xs h-8"}
              onClick={() => setFilterType(tp)}
            >
              {tp === "ALL" ? "Semua Jenis" : tp}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t) => (
          <TugasCard
            key={t.id}
            tugas={t}
            href={`/siswa/tugas/${t.id}`}
          />
        ))}
      </div>
    </div>
  );
}
