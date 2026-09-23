"use client";

import { useState } from "react";
import { mockKelas, mockUsers } from "@/lib/mock-data";
import { Kelas } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, School, Users, GraduationCap } from "lucide-react";
import { toast } from "sonner";

export default function AdminKelasPage() {
  const [kelasList, setKelasList] = useState<Kelas[]>(mockKelas);
  const [filterJenjang, setFilterJenjang] = useState<string>("ALL");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form states
  const [namaKelas, setNamaKelas] = useState("");
  const [tingkat, setTingkat] = useState(1);
  const [tahunAjaran, setTahunAjaran] = useState("2026/2027");

  const filteredKelas = kelasList.filter((k) => {
    if (filterJenjang === "SD") return k.tingkat <= 6;
    if (filterJenjang === "SMP") return k.tingkat >= 7;
    return true;
  });

  const handleCreateKelas = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaKelas) {
      toast.error("Nama kelas wajib diisi");
      return;
    }

    const newK: Kelas = {
      id: `kls-${Date.now()}`,
      nama: namaKelas,
      tingkat: Number(tingkat),
      tahunAjaran,
      jenjangId: tingkat <= 6 ? "j1" : "j2",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setKelasList([...kelasList, newK]);
    toast.success(`Kelas ${namaKelas} berhasil ditambahkan`);
    setNamaKelas("");
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span>🏫</span> Manajemen Rombel & Kelas
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Daftar rombongan belajar jenjang SD dan SMP Al-Azhar Cairo
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger render={<Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" />}>
            <Plus className="size-4 mr-1.5" /> Tambah Kelas
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Buka Rombel / Kelas Baru</DialogTitle>
              <DialogDescription>
                Tentukan nama rombel, tingkat kelas, dan tahun akademik
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateKelas} className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label htmlFor="namaKelas">Nama Kelas</Label>
                <Input
                  id="namaKelas"
                  placeholder="Contoh: Kelas 1C (Ibnu Sina)"
                  value={namaKelas}
                  onChange={(e) => setNamaKelas(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="tingkat">Tingkat (1 - 9)</Label>
                  <Input
                    id="tingkat"
                    type="number"
                    min={1}
                    max={9}
                    value={tingkat}
                    onChange={(e) => setTingkat(Number(e.target.value))}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="tahun">Tahun Ajaran</Label>
                  <Input
                    id="tahun"
                    value={tahunAjaran}
                    onChange={(e) => setTahunAjaran(e.target.value)}
                    required
                  />
                </div>
              </div>
              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Simpan Kelas
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter jenjang */}
      <div className="flex gap-2">
        {["ALL", "SD", "SMP"].map((j) => (
          <Button
            key={j}
            size="sm"
            variant={filterJenjang === j ? "default" : "outline"}
            className={filterJenjang === j ? "bg-emerald-600 text-white" : ""}
            onClick={() => setFilterJenjang(j)}
          >
            {j === "ALL" ? "Semua Jenjang" : `Jenjang ${j}`}
          </Button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredKelas.map((k) => (
          <Card key={k.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant={k.tingkat <= 6 ? "default" : "secondary"}>
                  {k.tingkat <= 6 ? "SD" : "SMP"} • Kelas {k.tingkat}
                </Badge>
                <span className="text-xs text-muted-foreground">{k.tahunAjaran}</span>
              </div>
              <CardTitle className="text-lg font-bold mt-2">{k.nama}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/50 pt-3">
                <span className="flex items-center gap-1">
                  <Users className="size-3.5 text-emerald-600" /> 28 Siswa
                </span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="size-3.5 text-teal-600" /> Wali Kelas Ditunjuk
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
