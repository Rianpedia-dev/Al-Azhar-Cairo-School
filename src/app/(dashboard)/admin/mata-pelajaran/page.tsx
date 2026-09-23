"use client";

import { useState } from "react";
import { mockMataPelajaran } from "@/lib/mock-data";
import { MataPelajaran } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Plus, BookOpen, Search } from "lucide-react";
import { toast } from "sonner";

export default function AdminMataPelajaranPage() {
  const [mapelList, setMapelList] = useState<MataPelajaran[]>(mockMataPelajaran);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form states
  const [nama, setNama] = useState("");
  const [kode, setKode] = useState("");
  const [jenjangId, setJenjangId] = useState("j1");

  const filteredMapel = mapelList.filter((m) =>
    m.nama.toLowerCase().includes(search.toLowerCase()) ||
    m.kode.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateMapel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !kode) {
      toast.error("Nama dan kode mapel wajib diisi");
      return;
    }

    const newM: MataPelajaran = {
      id: `mp-${Date.now()}`,
      nama,
      kode: kode.toUpperCase(),
      jenjangId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setMapelList([...mapelList, newM]);
    toast.success(`Mata pelajaran ${nama} berhasil ditambahkan`);
    setNama("");
    setKode("");
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span>📚</span> Kurikulum & Mata Pelajaran
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Daftar mata pelajaran resmi Al-Azhar Cairo (Dinas & Muatan Khusus Al-Azhar)
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger render={<Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" />}>
            <Plus className="size-4 mr-1.5" /> Tambah Mata Pelajaran
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Mata Pelajaran Baru</DialogTitle>
              <DialogDescription>
                Masukkan nama kurikulum dan kode unik mata pelajaran
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateMapel} className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label htmlFor="nama">Nama Mata Pelajaran</Label>
                <Input
                  id="nama"
                  placeholder="Contoh: Tahfidz & Tahsin Al-Qur'an"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="kode">Kode Mapel</Label>
                <Input
                  id="kode"
                  placeholder="Contoh: THF-01"
                  value={kode}
                  onChange={(e) => setKode(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label>Jenjang</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant={jenjangId === "j1" ? "default" : "outline"}
                    className={jenjangId === "j1" ? "bg-emerald-600 text-white" : ""}
                    onClick={() => setJenjangId("j1")}
                  >
                    Sekolah Dasar (SD)
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={jenjangId === "j2" ? "default" : "outline"}
                    className={jenjangId === "j2" ? "bg-emerald-600 text-white" : ""}
                    onClick={() => setJenjangId("j2")}
                  >
                    SMP Al-Azhar Cairo
                  </Button>
                </div>
              </div>
              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Simpan Mapel
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Cari mapel atau kode..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode</TableHead>
                <TableHead>Mata Pelajaran</TableHead>
                <TableHead>Jenjang</TableHead>
                <TableHead className="text-right">Kategori</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMapel.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    {m.kode}
                  </TableCell>
                  <TableCell className="font-medium flex items-center gap-2">
                    <BookOpen className="size-4 text-muted-foreground" /> {m.nama}
                  </TableCell>
                  <TableCell>
                    <Badge variant={m.jenjangId === "j1" ? "default" : "secondary"}>
                      {m.jenjangId === "j1" ? "SD" : "SMP"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">
                    Kurikulum Terpadu
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
