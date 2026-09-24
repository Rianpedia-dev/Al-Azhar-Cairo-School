"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getUserInitials, getAvatarColor } from "@/lib/mock-data";
import { User, KeyRound, Save, Mail, MapPin, School, Trophy, Star } from "lucide-react";
import { toast } from "sonner";

export default function SiswaProfilPage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "Aisyah Putri");
  const [email, setEmail] = useState(user?.email || "aisyah@alazhar-cairo.sch.id");
  const [nis, setNis] = useState(user?.nomorInduk || "NIS001");
  const [alamat, setAlamat] = useState(user?.alamat || "Jakarta Pusat");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const initials = user ? getUserInitials(user.name) : "AP";
  const avatarBg = user ? getAvatarColor(user.name) : "#FDB913";

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profil siswa berhasil diperbarui!");
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      toast.error("Kata sandi baru minimal 8 karakter");
      return;
    }
    toast.success("Kata sandi berhasil diganti!");
    setOldPassword("");
    setNewPassword("");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <span>👤</span> Profil Peserta Didik
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Identitas siswa dan akun belajar resmi Al-Azhar Cairo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
        {/* Student ID Card (Kid-Friendly Aesthetic PRD 9.1) */}
        <Card className="h-fit border-border/80 text-center shadow-sm overflow-hidden">
          <div className="h-3 bg-gradient-to-r from-[#00AEEF] via-[#FDB913] to-[#008C45]" />
          <CardContent className="pt-6 space-y-4">
            <Avatar className="size-24 mx-auto shadow-md ring-4 ring-[#00AEEF]/20">
              <AvatarFallback style={{ backgroundColor: avatarBg }} className="text-slate-900 text-2xl font-extrabold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-bold text-lg leading-tight">{user?.name || "Aisyah Putri"}</h2>
              <p className="text-xs font-mono text-muted-foreground mt-0.5">NIS: {nis}</p>
              <Badge className="bg-[#00AEEF] text-white mt-2 gap-1 text-[11px]">
                <User className="size-3" /> Peserta Didik Aktif
              </Badge>
            </div>

            <div className="text-left text-xs space-y-2 border-t pt-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <School className="size-3.5 text-primary" />
                <span className="font-semibold text-foreground">Kelas 1A (Tingkat 1 SD)</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="size-3.5 text-[#FDB913]" />
                <span>3 Prestasi Terverifikasi ⭐</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-3.5 text-muted-foreground" />
                <span className="truncate">{user?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-3.5 text-muted-foreground" />
                <span>{alamat}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Forms */}
        <div className="space-y-6">
          <Card className="border-border/80 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">Biodata Siswa</CardTitle>
              <CardDescription className="text-xs">Informasi identitas belajar Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs font-semibold">Nama Lengkap</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="nis" className="text-xs font-semibold">NIS (Nomor Induk Siswa)</Label>
                    <Input id="nis" value={nis} disabled className="bg-muted font-mono" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-semibold">Email Siswa</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="alamat" className="text-xs font-semibold">Alamat</Label>
                    <Input id="alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button type="submit" size="sm" className="bg-[#008C45] hover:bg-[#007439] text-white gap-1.5">
                    <Save className="size-3.5" /> Simpan Data
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="border-border/80 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <KeyRound className="size-4 text-[#FDB913]" /> Kata Sandi Akun Siswa
              </CardTitle>
              <CardDescription className="text-xs">Ubah kata sandi login belajar Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="oldPass" className="text-xs font-semibold">Kata Sandi Lama</Label>
                    <Input id="oldPass" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="newPass" className="text-xs font-semibold">Kata Sandi Baru</Label>
                    <Input id="newPass" type="password" placeholder="Min. 8 karakter" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button type="submit" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5">
                    <KeyRound className="size-3.5" /> Ganti Kata Sandi
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
