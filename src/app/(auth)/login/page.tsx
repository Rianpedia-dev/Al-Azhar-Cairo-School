"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { mockUsers } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { GraduationCap, LogIn, Shield, User, Sparkles, BookOpen, KeyRound } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@alazharcairo.sch.id");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, getRedirectPath } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Harap isi email dan password");
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success && result.user) {
      toast.success(`Selamat datang, ${result.user.name}! 👋`);
      router.push(getRedirectPath(result.user.role));
    } else {
      toast.error(result.error || "Gagal masuk ke sistem");
    }
  };

  const handleQuickLogin = async (role: "ADMIN" | "GURU" | "SISWA") => {
    const user = mockUsers.find((u) => u.role === role);
    if (!user) return;
    setEmail(user.email);
    setPassword("password123");
    setLoading(true);
    const result = await login(user.email, "password123");
    setLoading(false);
    if (result.success && result.user) {
      toast.success(`Berhasil masuk sebagai ${result.user.name} (${role})`);
      router.push(getRedirectPath(role));
    }
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <Card className="shadow-2xl border-border/60 backdrop-blur-md bg-card/95 overflow-hidden">
        {/* Top Decorative Al-Azhar Cairo Brand Bar */}
        <div className="h-2.5 bg-gradient-to-r from-[#27348B] via-[#008C45] to-[#00AEEF]" />
        
        <CardHeader className="text-center space-y-2 pb-4 pt-6">
          <div className="mx-auto size-16 rounded-2xl bg-gradient-to-br from-[#27348B] to-[#1e276b] flex items-center justify-center text-white shadow-xl shadow-[#27348B]/25">
            <GraduationCap className="size-9 text-[#FDB913]" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
              Al-Azhar Cairo
            </CardTitle>
            <CardDescription className="text-xs uppercase tracking-widest text-[#008C45] dark:text-[#00b85a] font-bold mt-1">
              Islamic School Management System
            </CardDescription>
          </div>
          <p className="text-xs text-muted-foreground max-w-xs mx-auto">
            Sistem Informasi Akademik Terpadu Jenjang SD & SMP Berstandar Internasional
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-3.5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold">Email Akun</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@alazharcairo.sch.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 text-sm"
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-semibold">Kata Sandi</Label>
                <span className="text-xs text-[#00AEEF] hover:underline cursor-pointer" onClick={() => toast.info("Untuk demo, gunakan password apa saja atau klik tombol Demo Quick Login")}>
                  Bantuan sandi?
                </span>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 text-sm"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#27348B] hover:bg-[#1e276b] text-white font-semibold h-11 shadow-md shadow-[#27348B]/20 gap-2 text-sm mt-2"
              disabled={loading}
            >
              {loading ? "Memverifikasi..." : (
                <>
                  <LogIn className="size-4" /> Masuk ke Sistem
                </>
              )}
            </Button>
          </form>

          {/* Quick Demo Selector */}
          <div className="pt-2">
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/80" />
              </div>
              <div className="relative flex justify-center text-[11px] uppercase">
                <span className="bg-card px-2.5 text-muted-foreground flex items-center gap-1 font-semibold">
                  <Sparkles className="size-3 text-[#FDB913]" /> Akses Cepat Mode Demo
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuickLogin("ADMIN")}
                className="h-auto py-2.5 flex flex-col gap-1 border-[#27348B]/30 hover:border-[#27348B] hover:bg-[#27348B]/5 transition-all"
              >
                <Shield className="size-4 text-[#27348B]" />
                <span className="text-xs font-bold text-foreground">Admin</span>
                <span className="text-[10px] text-muted-foreground">Kelola Data</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuickLogin("GURU")}
                className="h-auto py-2.5 flex flex-col gap-1 border-[#008C45]/30 hover:border-[#008C45] hover:bg-[#008C45]/5 transition-all"
              >
                <GraduationCap className="size-4 text-[#008C45]" />
                <span className="text-xs font-bold text-foreground">Guru</span>
                <span className="text-[10px] text-muted-foreground">Tugas & Nilai</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuickLogin("SISWA")}
                className="h-auto py-2.5 flex flex-col gap-1 border-[#FDB913]/40 hover:border-[#FDB913] hover:bg-[#FDB913]/5 transition-all"
              >
                <User className="size-4 text-[#FDB913]" />
                <span className="text-xs font-bold text-foreground">Siswa</span>
                <span className="text-[10px] text-muted-foreground">Tugas & Jadwal</span>
              </Button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-center justify-center border-t border-border/60 py-3.5 bg-muted/20 text-center gap-1">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span>SD Al-Azhar Cairo</span>
            <span>•</span>
            <span>SMP Al-Azhar Cairo</span>
          </div>
          <p className="text-[10px] text-muted-foreground">
            © 2026 Al-Azhar Cairo School • Versi 1.0.0
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
