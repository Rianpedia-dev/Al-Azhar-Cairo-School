"use client";

import { useState } from "react";
import { mockPrestasi } from "@/lib/mock-data";
import { PrestasiTable } from "@/components/prestasi/prestasi-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Prestasi, KategoriPrestasi, TingkatPrestasi } from "@/types";

export default function GuruPrestasiPage() {
  const [prestasiList, setPrestasiList] = useState<Prestasi[]>(mockPrestasi);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form states
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState<KategoriPrestasi>("AKADEMIK");
  const [tingkat, setTingkat] = useState<TingkatPrestasi>("KOTA");
  const [peringkat, setPeringkat] = useState("Juara 1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul) {
      toast.error("Judul prestasi wajib diisi");
      return;
    }

    const newP: Prestasi = {
      id: `pres-${Date.now()}`,
      judul,
      kategori,
      tingkat,
      peringkat,
      tanggal: new Date().toISOString(),
      isVerified: false,
      siswaId: "usr4",
      diinputOlehId: "usr2",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setPrestasiList([newP, ...prestasiList]);
    toast.success("Prestasi siswa berhasil dicatat dan diajukan untuk verifikasi!");
    setJudul("");
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span>🏆</span> Pencatatan Prestasi Siswa
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Daftarkan capaian prestasi siswa bimbingan Anda untuk diverifikasi sekolah
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger render={<Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white" />}>
            <Plus className="size-4 mr-1.5" /> Catat Prestasi Baru
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Catat Prestasi Siswa</DialogTitle>
              <DialogDescription>
                Masukkan informasi kejuaraan, sertifikat, atau piagam penghargaan
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label htmlFor="judul">Nama Lomba / Capaian</Label>
                <Input
                  id="judul"
                  placeholder="Contoh: Juara 1 Pidato Bahasa Arab"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Kategori</Label>
                  <Input
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value as KategoriPrestasi)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Tingkat</Label>
                  <Input
                    value={tingkat}
                    onChange={(e) => setTingkat(e.target.value as TingkatPrestasi)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="peringkat">Peringkat / Predikat</Label>
                <Input
                  id="peringkat"
                  placeholder="Contoh: Juara 1 / Medali Emas"
                  value={peringkat}
                  onChange={(e) => setPeringkat(e.target.value)}
                />
              </div>

              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white">
                  Kirim Pengajuan
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <PrestasiTable
        data={prestasiList}
      />
    </div>
  );
}
