"use client";

import { useState } from "react";
import { mockTugas } from "@/lib/mock-data";
import { TugasCard } from "@/components/tugas/tugas-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function GuruTugasPage() {
  const [tugasList, setTugasList] = useState(mockTugas);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  const filtered = tugasList.filter((t) => {
    const matchSearch = t.judul.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "ALL" || t.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleDelete = (id: string) => {
    setTugasList(tugasList.filter((t) => t.id !== id));
    toast.success("Tugas berhasil dihapus");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Daftar Tugas Siswa
          </h1>
        </div>
        <Link
          href="/guru/tugas/buat"
          className={buttonVariants({
            className: "bg-teal-600 hover:bg-teal-700 text-white",
          })}
        >
          <Plus className="size-4 mr-1.5" /> Buat Tugas Baru
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Cari judul tugas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full sm:w-auto">
          {["ALL", "PUBLISHED", "DRAFT", "ARCHIVED"].map((s) => (
            <Button
              key={s}
              size="sm"
              variant={filterStatus === s ? "default" : "outline"}
              className={filterStatus === s ? "bg-teal-600 text-white text-xs h-8" : "text-xs h-8"}
              onClick={() => setFilterStatus(s)}
            >
              {s === "ALL" ? "Semua" : s}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t) => (
          <TugasCard
            key={t.id}
            tugas={t}
            href={`/guru/tugas/${t.id}`}
          />
        ))}
      </div>
    </div>
  );
}
