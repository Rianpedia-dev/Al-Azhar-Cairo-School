"use client";

import { mockKelas } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Users, BookOpen, Clock, Calendar } from "lucide-react";
import Link from "next/link";

export default function GuruKelasSayaPage() {
  const kelasGuru = mockKelas.slice(0, 3); // Kelas yang diampu

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Kelas yang Diampu
        </h1>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {kelasGuru.map((k) => (
          <Card key={k.id} className="hover:shadow-lg transition-all border-teal-500/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge className="bg-teal-600 text-white">
                  {k.tingkat <= 6 ? "SD" : "SMP"} • Tingkat {k.tingkat}
                </Badge>
                <span className="text-xs text-muted-foreground font-mono">{k.tahunAjaran}</span>
              </div>
              <CardTitle className="text-xl font-bold mt-2">{k.nama}</CardTitle>
              <CardDescription className="text-xs">Mata Pelajaran: Matematika & PAI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-xs text-muted-foreground border-t border-border/60 pt-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Users className="size-3.5 text-teal-600" /> Jumlah Siswa</span>
                  <span className="font-semibold text-foreground">28 Siswa</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Clock className="size-3.5 text-teal-600" /> Jadwal Mengajar</span>
                  <span className="font-semibold text-foreground">Senin & Rabu (07.30 - 09.00)</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Link
                  href="/guru/tugas"
                  className={buttonVariants({ variant: "outline", size: "sm", className: "w-full text-xs" })}
                >
                  Lihat Tugas
                </Link>
                <Link
                  href="/guru/chat"
                  className={buttonVariants({
                    size: "sm",
                    className: "w-full bg-teal-600 hover:bg-teal-700 text-white text-xs",
                  })}
                >
                  Chat Kelas
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
