"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowLeft, Mail } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md space-y-4">
      <Card className="shadow-2xl border-border/60 backdrop-blur-md bg-card/95 overflow-hidden">
        {/* Top Decorative Al-Azhar Cairo Brand Bar */}
        <div className="h-2.5 bg-gradient-to-r from-[#27348B] via-[#008C45] to-[#00AEEF]" />

        <CardHeader className="text-center pt-8 pb-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 mb-3 border border-amber-500/20">
            <ShieldAlert className="size-7" />
          </div>
          <CardTitle className="text-xl font-bold tracking-tight">
            Registrasi Akun Al-Azhar Cairo
          </CardTitle>
          <CardDescription className="text-xs pt-1">
            Kebijakan Keamanan Sistem Akademik Terpadu
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 text-center px-6">
          <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60 text-xs text-muted-foreground leading-relaxed">
            Sesuai regulasi sistem (PRD 7.1.1), pendaftaran akun baru pendidik dan peserta didik dilakukan secara terpusat oleh <strong>Administrator Sekolah</strong>. Pendaftaran mandiri dinonaktifkan demi menjaga keamanan dan privasi data akademik SD & SMP Al-Azhar Cairo.
          </div>

          <div className="text-xs text-muted-foreground">
            Belum memiliki akun resmi atau lupa detail akun Anda? Silakan hubungi bagian Tata Usaha / IT Administrator Al-Azhar Cairo.
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 pt-2 pb-6 px-6">
          <Link href="/login" className="w-full">
            <Button className="w-full bg-[#27348B] hover:bg-[#1e276b] text-white">
              <ArrowLeft className="size-4 mr-2" /> Kembali ke Halaman Masuk
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground"
            onClick={() => window.open("mailto:admin@alazharcairo.sch.id")}
          >
            <Mail className="size-3.5 mr-1.5" /> Hubungi Admin Sekolah
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
