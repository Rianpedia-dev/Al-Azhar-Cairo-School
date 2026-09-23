"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings, Save, ShieldCheck, Database, School, Bell, HardDrive } from "lucide-react";
import { toast } from "sonner";

export default function AdminPengaturanPage() {
  const [tahunAjaran, setTahunAjaran] = useState("2026/2027");
  const [semester, setSemester] = useState<"GANJIL" | "GENAP">("GANJIL");
  const [maxFileSize, setMaxFileSize] = useState("10");
  const [allowRegistration, setAllowRegistration] = useState(false);
  const [autoVerifyPrestasi, setAutoVerifyPrestasi] = useState(false);
  const [inAppNotification, setInAppNotification] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Konfigurasi sistem & akademik Al-Azhar Cairo berhasil disimpan!");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <span>⚙️</span> Pengaturan Sistem & Akademik
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Kelola parameter akademik, kuota berkas tugas, dan kebijakan portal SD & SMP Al-Azhar Cairo
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Parameter Akademik */}
        <Card className="border-border/80 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <School className="size-4 text-[#27348B] dark:text-[#00AEEF]" />
              <span>Kalender & Periode Akademik</span>
            </CardTitle>
            <CardDescription className="text-xs">
              Tahun ajaran dan semester aktif untuk seluruh data rombel kelas dan penugasan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="tahunAjaran" className="text-xs font-semibold">Tahun Ajaran Berjalan</Label>
                <Input
                  id="tahunAjaran"
                  value={tahunAjaran}
                  onChange={(e) => setTahunAjaran(e.target.value)}
                  placeholder="2026/2027"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Semester Aktif</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant={semester === "GANJIL" ? "default" : "outline"}
                    className={semester === "GANJIL" ? "bg-[#27348B] text-white w-full text-xs" : "w-full text-xs"}
                    onClick={() => setSemester("GANJIL")}
                  >
                    Ganjil (Semester 1)
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={semester === "GENAP" ? "default" : "outline"}
                    className={semester === "GENAP" ? "bg-[#27348B] text-white w-full text-xs" : "w-full text-xs"}
                    onClick={() => setSemester("GENAP")}
                  >
                    Genap (Semester 2)
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Batasan Upload File Tugas */}
        <Card className="border-border/80 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <HardDrive className="size-4 text-[#008C45]" />
              <span>Penyimpanan & Batasan Unggah Berkas</span>
            </CardTitle>
            <CardDescription className="text-xs">
              Konfigurasi kapasitas file tugas siswa & materi ajar guru sesuai PRD 7.6.4
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="maxFileSize" className="text-xs font-semibold">
                  Maksimal Ukuran per File (Megabytes)
                </Label>
                <Badge variant="outline" className="text-xs font-mono">10 MB (Default PRD)</Badge>
              </div>
              <Input
                id="maxFileSize"
                type="number"
                min="1"
                max="50"
                value={maxFileSize}
                onChange={(e) => setMaxFileSize(e.target.value)}
                className="max-w-xs"
              />
              <p className="text-[11px] text-muted-foreground mt-1">
                Format yang diizinkan: PDF, JPEG, JPG, PNG, WEBP (maks. 5 berkas per pengumpulan siswa).
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Kebijakan Keamanan & Verifikasi */}
        <Card className="border-border/80 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <ShieldCheck className="size-4 text-[#E1251B]" />
              <span>Kebijakan Autentikasi & Verifikasi</span>
            </CardTitle>
            <CardDescription className="text-xs">
              Aturan otorisasi akses dan alur kerja moderasi data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-foreground">Pendaftaran Mandiri (Self-Registration)</p>
                <p className="text-[11px] text-muted-foreground">
                  Bila nonaktif, akun baru hanya dapat dibuat terpusat oleh Admin (PRD 7.1.1).
                </p>
              </div>
              <Switch checked={allowRegistration} onCheckedChange={setAllowRegistration} />
            </div>

            <div className="flex items-center justify-between py-2 border-b">
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-foreground">Oto-Verifikasi Prestasi Siswa</p>
                <p className="text-[11px] text-muted-foreground">
                  Bila dinonaktifkan, seluruh prestasi wajib diverifikasi manual oleh Admin sebelum tampil resmi.
                </p>
              </div>
              <Switch checked={autoVerifyPrestasi} onCheckedChange={setAutoVerifyPrestasi} />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-foreground">Notifikasi In-App Pesan & Tugas</p>
                <p className="text-[11px] text-muted-foreground">
                  Kirimkan pemberitahuan langsung saat guru memberikan nilai atau pesan baru masuk.
                </p>
              </div>
              <Switch checked={inAppNotification} onCheckedChange={setInAppNotification} />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="submit"
            className="bg-[#008C45] hover:bg-[#007439] text-white font-bold gap-2 px-6"
          >
            <Save className="size-4" /> Simpan Seluruh Pengaturan
          </Button>
        </div>
      </form>
    </div>
  );
}
