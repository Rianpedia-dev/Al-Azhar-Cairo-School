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
import { Shield, KeyRound, Save, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { toast } from "sonner";

export default function AdminProfilPage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "Admin Al-Azhar");
  const [email, setEmail] = useState(user?.email || "admin@alazharcairo.sch.id");
  const [phone, setPhone] = useState(user?.phone || "08123456789");
  const [alamat, setAlamat] = useState(user?.alamat || "Jakarta");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const initials = user ? getUserInitials(user.name) : "AA";
  const avatarBg = user ? getAvatarColor(user.name) : "#27348B";

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Informasi profil administrator berhasil diperbarui!");
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      toast.error("Kata sandi baru minimal 8 karakter");
      return;
    }
    toast.success("Kata sandi akun Anda berhasil diperbarui!");
    setOldPassword("");
    setNewPassword("");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <span>👤</span> Profil Saya — Administrator
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Kelola informasi personal dan kredensial keamanan akun sistem
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
        {/* User Identity Card */}
        <Card className="h-fit border-border/80 text-center shadow-sm">
          <CardContent className="pt-6 space-y-4">
            <Avatar className="size-24 mx-auto shadow-md">
              <AvatarFallback style={{ backgroundColor: avatarBg }} className="text-white text-2xl font-extrabold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-bold text-lg leading-tight">{user?.name || "Admin Al-Azhar"}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{user?.email}</p>
              <Badge className="bg-[#27348B] text-white mt-2 gap-1 text-[11px]">
                <Shield className="size-3" /> Administrator Utama
              </Badge>
            </div>

            <div className="text-left text-xs space-y-2 border-t pt-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="size-3.5 text-[#00AEEF]" />
                <span className="truncate">{user?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-3.5 text-[#008C45]" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-3.5 text-[#E1251B]" />
                <span>{alamat}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Forms */}
        <div className="space-y-6">
          <Card className="border-border/80 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">Informasi Data Diri</CardTitle>
              <CardDescription className="text-xs">Perbarui nama dan kontak administrator</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs font-semibold">Nama Lengkap</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-semibold">Email Resmi</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-xs font-semibold">Nomor Telepon</Label>
                    <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="alamat" className="text-xs font-semibold">Alamat Domisili</Label>
                    <Input id="alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button type="submit" size="sm" className="bg-[#27348B] hover:bg-[#1e276b] text-white gap-1.5">
                    <Save className="size-3.5" /> Simpan Profil
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="border-border/80 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <KeyRound className="size-4 text-[#FDB913]" /> Keamanan & Kata Sandi
              </CardTitle>
              <CardDescription className="text-xs">Ganti kata sandi secara berkala untuk menjaga keamanan</CardDescription>
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
                  <Button type="submit" size="sm" className="bg-[#008C45] hover:bg-[#007439] text-white gap-1.5">
                    <KeyRound className="size-3.5" /> Perbarui Kata Sandi
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
