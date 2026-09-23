"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Save, Send } from "lucide-react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import type { JenisTugas } from "@/types";

interface TugasFormProps {
  onSubmit?: (data: TugasFormData) => void;
  initialData?: Partial<TugasFormData>;
}

interface TugasFormData {
  judul: string;
  deskripsi: string;
  jenisTugas: JenisTugas;
  deadline: Date;
  mataPelajaranKelasId: string;
}

export function TugasForm({ onSubmit, initialData }: TugasFormProps) {
  const [judul, setJudul] = useState(initialData?.judul || "");
  const [deskripsi, setDeskripsi] = useState(initialData?.deskripsi || "");
  const [jenisTugas, setJenisTugas] = useState<JenisTugas>(initialData?.jenisTugas || "UPLOAD_FILE");
  const [deadline, setDeadline] = useState<Date | undefined>(initialData?.deadline);
  const [mapelKelasId, setMapelKelasId] = useState(initialData?.mataPelajaranKelasId || "");

  const handleSubmit = (status: "DRAFT" | "PUBLISHED") => {
    if (!judul || !deadline || !mapelKelasId) return;
    onSubmit?.({
      judul,
      deskripsi,
      jenisTugas,
      deadline,
      mataPelajaranKelasId: mapelKelasId,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {initialData ? "Edit Tugas" : "📝 Buat Tugas Baru"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="judul">Judul Tugas *</Label>
            <Input
              id="judul"
              placeholder="Masukkan judul tugas..."
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mapel">Mata Pelajaran & Kelas *</Label>
            <Select value={mapelKelasId} onValueChange={(val) => setMapelKelasId(val ?? "")}>
              <SelectTrigger id="mapel">
                <SelectValue placeholder="Pilih mapel & kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mpk1">Matematika - Kelas 1A</SelectItem>
                <SelectItem value="mpk2">Bahasa Indonesia - Kelas 1A</SelectItem>
                <SelectItem value="mpk3">PAI - Kelas 1A</SelectItem>
                <SelectItem value="mpk4">Matematika - Kelas 7A</SelectItem>
                <SelectItem value="mpk5">Informatika - Kelas 7A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="deskripsi">Deskripsi</Label>
          <Textarea
            id="deskripsi"
            placeholder="Jelaskan detail tugas..."
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            rows={4}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Jenis Tugas *</Label>
            <Select value={jenisTugas} onValueChange={(v) => { if (v) setJenisTugas(v as JenisTugas); }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ESSAY">📝 Essay</SelectItem>
                <SelectItem value="PILIHAN_GANDA">📋 Pilihan Ganda</SelectItem>
                <SelectItem value="UPLOAD_FILE">📎 Upload File</SelectItem>
                <SelectItem value="PROYEK">🔧 Proyek</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Deadline *</Label>
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !deadline && "text-muted-foreground"
                    )}
                  />
                }
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {deadline
                  ? format(deadline, "dd MMMM yyyy", { locale: idLocale })
                  : "Pilih tanggal deadline"}
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={deadline}
                  onSelect={setDeadline}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            variant="outline"
            className="btn-touch gap-2"
            onClick={() => handleSubmit("DRAFT")}
          >
            <Save className="h-4 w-4" />
            Simpan Draft
          </Button>
          <Button
            className="btn-touch gap-2 bg-primary hover:bg-primary/90"
            onClick={() => handleSubmit("PUBLISHED")}
          >
            <Send className="h-4 w-4" />
            Publikasikan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
