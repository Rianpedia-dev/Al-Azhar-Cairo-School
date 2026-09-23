"use client";

import { mockPrestasi } from "@/lib/mock-data";
import { PrestasiBadge } from "@/components/prestasi/prestasi-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Trophy, Star, Sparkles, Calendar, CheckCircle2 } from "lucide-react";

export default function SiswaPrestasiPage() {
  const prestasiSaya = mockPrestasi.filter((p) => p.siswaId === "usr4" || p.siswaId === "usr5");

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-6 text-white shadow-xl">
        <div className="relative z-10 max-w-xl space-y-2">
          <Badge className="bg-white/20 text-white border-0 gap-1 text-xs">
            <Trophy className="size-3 text-amber-200" /> Lemari Penghargaan & Piagam
          </Badge>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Portofolio Prestasi Saya
          </h1>
        </div>
      </div>

      {/* Grid of achievement cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {prestasiSaya.map((p) => (
          <Card key={p.id} className="hover:shadow-xl transition-all duration-300 border-amber-500/20 group overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-amber-400 to-orange-500" />
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex gap-1.5 flex-wrap">
                  <PrestasiBadge type="tingkat" value={p.tingkat} />
                  <PrestasiBadge type="kategori" value={p.kategori} />
                </div>
                {p.isVerified ? (
                  <Badge variant="outline" className="border-emerald-500 text-emerald-600 text-[10px] gap-1">
                    <CheckCircle2 className="size-3" /> Terverifikasi
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-amber-600 text-[10px]">
                    Menunggu
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg font-bold group-hover:text-amber-600 transition-colors">
                {p.judul}
              </CardTitle>
              <CardDescription className="text-xs">
                {p.peringkat ? `Predikat: ${p.peringkat}` : "Peserta Terbaik"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0 text-xs text-muted-foreground">
              {p.deskripsi && (
                <p className="text-foreground/80">{p.deskripsi}</p>
              )}
              <div className="flex items-center justify-between border-t border-border/50 pt-2 text-[11px]">
                <span className="flex items-center gap-1">
                  <Calendar className="size-3 text-muted-foreground" />
                  {new Date(p.tanggal).toLocaleDateString("id-ID")}
                </span>
                <span className="font-semibold text-amber-600 flex items-center gap-0.5">
                  <Star className="size-3 fill-amber-400 text-amber-400" /> Al-Azhar Cairo
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
