"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  RotateCcw,
  Save,
  FileText,
  PenTool,
  Highlighter,
  Eraser,
  Undo2,
  Trash2,
  ZoomIn,
  ZoomOut,
  Stamp,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface KoreksiViewerProps {
  studentName: string;
  fileName: string;
  fileUrl?: string;
  taskTitle?: string;
  onSubmitKoreksi?: (data: { nilai: number; komentar: string; status: "SUDAH_DINILAI" | "REVISI" }) => void;
}

type ToolMode = "red-pen" | "green-pen" | "highlighter" | "eraser";

interface StrokePoint {
  x: number;
  y: number;
}

interface Stroke {
  tool: ToolMode;
  points: StrokePoint[];
  color: string;
  size: number;
}

interface StampItem {
  text: string;
  x: number;
  y: number;
  color: string;
  bg: string;
}

export function KoreksiViewer({
  studentName,
  fileName,
  taskTitle = "Tugas Matematika & Karakter Islami",
  onSubmitKoreksi,
}: KoreksiViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeTool, setActiveTool] = useState<ToolMode>("red-pen");
  const [zoom, setZoom] = useState(1);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [stamps, setStamps] = useState<StampItem[]>([
    { text: "✓ Benar (+30)", x: 580, y: 310, color: "#008C45", bg: "rgba(0, 140, 69, 0.12)" },
    { text: "✓ Teliti (+35)", x: 580, y: 520, color: "#008C45", bg: "rgba(0, 140, 69, 0.12)" },
  ]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);

  // Grading form state
  const [nilai, setNilai] = useState<string>("95");
  const [komentar, setKomentar] = useState(
    "Alhamdulillah pekerjaan sangat rapi, langkah pengerjaan sistematis, dan pemahaman konsep aljabar sangat baik. Pertahankan prestasimu!"
  );

  const nilaiNum = parseInt(nilai) || 0;

  const getPredikat = (n: number) => {
    if (n >= 90) return { predikat: "A (Mumtaz / Sangat Baik)", stars: "⭐⭐⭐⭐⭐", color: "text-emerald-600 bg-emerald-50 border-emerald-300" };
    if (n >= 80) return { predikat: "B (Jayyid Jiddan / Baik)", stars: "⭐⭐⭐⭐", color: "text-blue-600 bg-blue-50 border-blue-300" };
    if (n >= 70) return { predikat: "C (Jayyid / Cukup)", stars: "⭐⭐⭐", color: "text-amber-600 bg-amber-50 border-amber-300" };
    if (n >= 60) return { predikat: "D (Perlu Bimbingan)", stars: "⭐⭐", color: "text-orange-600 bg-orange-50 border-orange-300" };
    return { predikat: "E (Remedi)", stars: "⭐", color: "text-rose-600 bg-rose-50 border-rose-300" };
  };

  const currentGradeInfo = getPredikat(nilaiNum);

  // Draw base student answer sheet
  const drawBaseDocument = useCallback((ctx: CanvasRenderingContext2D) => {
    const width = 760;
    const height = 980;

    // Background paper
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Subtle paper grid / lined background
    ctx.strokeStyle = "#f1f5f9";
    ctx.lineWidth = 1;
    for (let y = 140; y < height - 40; y += 30) {
      ctx.beginPath();
      ctx.moveTo(35, y);
      ctx.lineTo(width - 35, y);
      ctx.stroke();
    }

    // Border of paper
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, width - 40, height - 40);

    // School Header Box
    ctx.fillStyle = "#27348B"; // Al-Azhar Navy
    ctx.fillRect(20, 20, width - 40, 95);

    // Header Text
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px Inter, sans-serif";
    ctx.fillText("AL-AZHAR CAIRO ISLAMIC SCHOOL", 40, 52);

    ctx.font = "12px Inter, sans-serif";
    ctx.fillStyle = "#FDB913"; // Yellow Gold
    ctx.fillText("LEMBAR JAWABAN TUGAS AKADEMIK & TAHFIDZ SISWA", 40, 72);

    ctx.fillStyle = "#ffffff";
    ctx.font = "11px Inter, sans-serif";
    ctx.fillText(`Tahun Ajaran 2026/2027 • Mata Pelajaran: Matematika & Karakter`, 40, 94);

    // Student identity strip
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(25, 120, width - 50, 48);
    ctx.strokeStyle = "#e2e8f0";
    ctx.strokeRect(25, 120, width - 50, 48);

    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 12px Inter, sans-serif";
    ctx.fillText(`Nama Siswa: ${studentName}`, 38, 142);
    ctx.fillText(`Kelas: 7A (Ibnu Khaldun)`, 38, 158);

    ctx.fillText(`NIS: 202607001`, 400, 142);
    ctx.fillText(`Status: Tepat Waktu (Diserahkan 22 Sep 2026)`, 400, 158);

    // Questions and Student Answers
    // Soal 1
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 13px Inter, sans-serif";
    ctx.fillText("Soal 1. Tentukan himpunan penyelesaian dari persamaan: x² - 5x + 6 = 0", 40, 205);

    ctx.font = "13px 'Courier New', monospace";
    ctx.fillStyle = "#1e3a8a"; // Student ink blue
    ctx.fillText("Langkah Penyelesaian Siswa:", 50, 235);
    ctx.fillText("  x² - 5x + 6 = 0", 50, 258);
    ctx.fillText("  (x - 2)(x - 3) = 0", 50, 281);
    ctx.fillText("  x - 2 = 0  =>  x₁ = 2", 50, 304);
    ctx.fillText("  x - 3 = 0  =>  x₂ = 3", 50, 327);
    ctx.fillText("  Jadi, Himpunan Penyelesaian HP = { 2, 3 }", 50, 350);

    // Divider
    ctx.strokeStyle = "#e2e8f0";
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(35, 380);
    ctx.lineTo(width - 35, 380);
    ctx.stroke();
    ctx.setLineDash([]);

    // Soal 2
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 13px Inter, sans-serif";
    ctx.fillText("Soal 2. Sebuah tabung memiliki jari-jari r = 7 cm dan tinggi t = 10 cm.", 40, 415);
    ctx.fillText("        Hitunglah volume tabung tersebut! (Gunakan π = 22/7)", 40, 435);

    ctx.font = "13px 'Courier New', monospace";
    ctx.fillStyle = "#1e3a8a";
    ctx.fillText("Langkah Penyelesaian Siswa:", 50, 465);
    ctx.fillText("  Rumus Volume Tabung: V = π × r² × t", 50, 488);
    ctx.fillText("  V = (22/7) × (7 cm)² × 10 cm", 50, 511);
    ctx.fillText("  V = (22/7) × 49 × 10", 50, 534);
    ctx.fillText("  V = 22 × 7 × 10", 50, 557);
    ctx.fillText("  V = 1.540 cm³", 50, 580);
    ctx.fillText("  Jadi, volume tabung tersebut adalah 1.540 cm³", 50, 603);

    // Divider
    ctx.strokeStyle = "#e2e8f0";
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(35, 630);
    ctx.lineTo(width - 35, 630);
    ctx.stroke();
    ctx.setLineDash([]);

    // Soal 3
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 13px Inter, sans-serif";
    ctx.fillText("Soal 3. Refleksi Karakter: Jelaskan hikmah berbakti kepada kedua orang tua (Birrul Walidain).", 40, 665);

    ctx.font = "13px 'Courier New', monospace";
    ctx.fillStyle = "#1e3a8a";
    ctx.fillText("Jawaban Siswa:", 50, 695);
    ctx.fillText("  1. Ridha Allah bergantung pada ridha kedua orang tua.", 50, 720);
    ctx.fillText("  2. Membuka pintu keberkahan umur, ilmu, dan rezeki di masa depan.", 50, 745);
    ctx.fillText("  3. Menjadi teladan yang baik bagi adik dan teman sebaya di sekolah.", 50, 770);

    // Footer Watermark
    ctx.font = "italic 11px Inter, sans-serif";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText("Al-Azhar Cairo Digital Grading System • Dokumen Terverifikasi", 40, 930);
  }, [studentName]);

  // Redraw canvas with base document + all strokes and stamps
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBaseDocument(ctx);

    // Draw all strokes
    const allStrokes = currentStroke ? [...strokes, currentStroke] : strokes;
    for (const stroke of allStrokes) {
      if (stroke.points.length < 2) continue;
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
      ctx.restore();
    }

    // Draw stamps
    for (const s of stamps) {
      ctx.save();
      ctx.font = "bold 13px Inter, sans-serif";
      const textWidth = ctx.measureText(s.text).width;
      ctx.fillStyle = s.bg;
      ctx.strokeStyle = s.color;
      ctx.lineWidth = 1.5;

      // Stamp pill box
      ctx.beginPath();
      ctx.roundRect(s.x - 8, s.y - 18, textWidth + 16, 26, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = s.color;
      ctx.fillText(s.text, s.x, s.y);
      ctx.restore();
    }
  }, [drawBaseDocument, strokes, currentStroke, stamps]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // Drawing event handlers
  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoordinates(e);
    setIsDrawing(true);

    let color = "#E1251B"; // Red pen by default
    let size = 3;

    if (activeTool === "green-pen") {
      color = "#008C45";
      size = 3;
    } else if (activeTool === "highlighter") {
      color = "rgba(253, 185, 19, 0.4)";
      size = 18;
    } else if (activeTool === "eraser") {
      color = "#ffffff";
      size = 24;
    }

    setCurrentStroke({
      tool: activeTool,
      points: [coords],
      color,
      size,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentStroke) return;
    const coords = getCanvasCoordinates(e);
    setCurrentStroke((prev) => (prev ? { ...prev, points: [...prev.points, coords] } : null));
  };

  const handleMouseUp = () => {
    if (currentStroke && currentStroke.points.length > 1) {
      setStrokes((prev) => [...prev, currentStroke]);
    }
    setIsDrawing(false);
    setCurrentStroke(null);
  };

  const handleUndo = () => {
    if (strokes.length > 0) {
      setStrokes((prev) => prev.slice(0, -1));
      toast.info("Coretan terakhir dibatalkan");
    } else if (stamps.length > 0) {
      setStamps((prev) => prev.slice(0, -1));
      toast.info("Stempel terakhir dihapus");
    }
  };

  const handleClearAll = () => {
    setStrokes([]);
    setStamps([]);
    toast.success("Lembar koreksi dibersihkan");
  };

  const handleAddStamp = (text: string, color: string, bg: string) => {
    setStamps((prev) => [
      ...prev,
      {
        text,
        x: 480 + (prev.length % 3) * 20,
        y: 710 + (prev.length % 2) * 40,
        color,
        bg,
      },
    ]);
    toast.success(`Stempel "${text}" ditambahkan ke lembar kerja`);
  };

  const handleDownloadAnnotated = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `koreksi_${studentName.replace(/\s+/g, "_")}.png`;
    link.href = dataUrl;
    link.click();
    toast.success("Lembar hasil koreksi berhasil diunduh");
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-6">
      {/* File & Annotation Canvas Workspace */}
      <div className="space-y-3">
        {/* Annotation Toolbar (PRD 7.6.5) */}
        <Card className="border-border/70 shadow-sm">
          <CardContent className="p-3 flex flex-wrap items-center justify-between gap-2">
            {/* Drawing Tools */}
            <div className="flex items-center gap-1.5">
              <Button
                variant={activeTool === "red-pen" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTool("red-pen")}
                className={cn(
                  "gap-1.5 text-xs font-semibold",
                  activeTool === "red-pen" ? "bg-[#E1251B] hover:bg-[#c21d14] text-white" : "border-rose-300 text-rose-600"
                )}
              >
                <PenTool className="size-3.5" />
                Pen Merah
              </Button>

              <Button
                variant={activeTool === "green-pen" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTool("green-pen")}
                className={cn(
                  "gap-1.5 text-xs font-semibold",
                  activeTool === "green-pen" ? "bg-[#008C45] hover:bg-[#007439] text-white" : "border-emerald-300 text-emerald-600"
                )}
              >
                <PenTool className="size-3.5" />
                Pen Hijau
              </Button>

              <Button
                variant={activeTool === "highlighter" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTool("highlighter")}
                className={cn(
                  "gap-1.5 text-xs font-semibold",
                  activeTool === "highlighter" ? "bg-[#FDB913] hover:bg-[#e0a410] text-slate-900" : "border-amber-300 text-amber-700"
                )}
              >
                <Highlighter className="size-3.5" />
                Stabilo
              </Button>

              <Button
                variant={activeTool === "eraser" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTool("eraser")}
                className="gap-1.5 text-xs font-semibold"
              >
                <Eraser className="size-3.5" />
                Hapus
              </Button>
            </div>

            {/* Quick Stamps */}
            <div className="hidden sm:flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddStamp("💯 100 - Mumtaz!", "#008C45", "rgba(0, 140, 69, 0.15)")}
                className="text-xs border-emerald-300 text-emerald-700 hover:bg-emerald-50"
              >
                <Stamp className="size-3 mr-1" /> Mumtaz!
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddStamp("⭐ Bagus Sekali", "#27348B", "rgba(39, 52, 139, 0.12)")}
                className="text-xs border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                ⭐ Bagus
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddStamp("⚠️ Periksa Kembali", "#E1251B", "rgba(225, 37, 27, 0.12)")}
                className="text-xs border-rose-300 text-rose-700 hover:bg-rose-50"
              >
                ⚠️ Koreksi
              </Button>
            </div>

            {/* Actions: Undo, Clear, Zoom */}
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="size-8" onClick={handleUndo} title="Undo">
                <Undo2 className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" className="size-8 text-rose-600 hover:bg-rose-50" onClick={handleClearAll} title="Bersihkan">
                <Trash2 className="size-4" />
              </Button>
              <Separator orientation="vertical" className="h-5 mx-1" />
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={() => setZoom((z) => Math.max(0.7, z - 0.1))}
                title="Perkecil"
              >
                <ZoomOut className="size-4" />
              </Button>
              <span className="text-[11px] font-mono w-9 text-center text-muted-foreground">
                {Math.round(zoom * 100)}%
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={() => setZoom((z) => Math.min(1.4, z + 0.1))}
                title="Perbesar"
              >
                <ZoomIn className="size-4" />
              </Button>
              <Button variant="outline" size="icon" className="size-8 ml-1" onClick={handleDownloadAnnotated} title="Download Hasil Koreksi">
                <Download className="size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Canvas Sheet Area */}
        <Card className="overflow-hidden border-border/80 shadow-md">
          <CardHeader className="py-2.5 px-4 bg-muted/30 border-b flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="size-4 text-[#27348B]" />
              <CardTitle className="text-sm font-semibold">{fileName}</CardTitle>
              <span className="text-xs text-muted-foreground">• {taskTitle}</span>
            </div>
            <Badge className="bg-[#00AEEF] text-white text-[11px]">
              Siswa: {studentName}
            </Badge>
          </CardHeader>
          <CardContent className="p-0 bg-slate-100 dark:bg-black/80 overflow-auto max-h-[720px] flex justify-center p-4">
            <div
              style={{ transform: `scale(${zoom})`, transformOrigin: "top center", transition: "transform 0.15s ease-out" }}
              className="shadow-2xl rounded-lg bg-white overflow-hidden cursor-crosshair select-none"
            >
              <canvas
                ref={canvasRef}
                width={760}
                height={980}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="block"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grading & Feedback Panel (PRD 7.6.5.3) */}
      <Card className="h-fit sticky top-20 border-border/80 shadow-md">
        <CardHeader className="pb-3 border-b bg-muted/20">
          <CardTitle className="text-base font-bold flex items-center justify-between">
            <span>📊 Panel Penilaian Guru</span>
            <Badge variant="outline" className="text-xs">SD & SMP</Badge>
          </CardTitle>
          <CardDescription className="text-xs">
            Evaluasi berkas tugas dan berikan masukan mendidik
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 pt-4">
          {/* Nilai Input & Star Rating */}
          <div className="space-y-2">
            <Label htmlFor="nilai" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Nilai Akhir (0–100)
            </Label>
            <div className="relative">
              <Input
                id="nilai"
                type="number"
                min="0"
                max="100"
                value={nilai}
                onChange={(e) => setNilai(e.target.value)}
                placeholder="0-100"
                className="text-3xl font-extrabold text-center h-16 text-[#27348B] dark:text-[#00AEEF] border-2 focus-visible:ring-[#27348B]"
              />
            </div>

            {/* Stars & Predicate Badge (PRD 9.1.6) */}
            <div className={cn("p-2.5 rounded-lg border text-center space-y-1 transition-all", currentGradeInfo.color)}>
              <div className="text-lg tracking-widest">{currentGradeInfo.stars}</div>
              <p className="text-xs font-bold">{currentGradeInfo.predikat}</p>
            </div>
          </div>

          <Separator />

          {/* Quick Feedback Chips */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground">
              Masukan Cepat (Klik untuk menyisipkan)
            </Label>
            <div className="flex flex-col gap-1.5">
              {[
                "Barakallahu fiik, pemahaman konsep sangat kuat! 👏",
                "Langkah pengerjaan rapi dan runtut. Pertahankan! ✨",
                "Perhatikan ketelitian perhitungan di soal nomor 2. 📝",
                "Tulisan sudah cukup jelas, rapikan sedikit di bagian akhir. ✍️",
              ].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setKomentar((prev) => (prev ? `${prev} ${chip}` : chip))}
                  className="text-left text-[11px] p-1.5 rounded bg-muted hover:bg-muted/80 text-foreground/80 transition-colors border border-border/50"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Komentar Textarea */}
          <div className="space-y-1.5">
            <Label htmlFor="komentar" className="text-xs font-semibold text-muted-foreground">
              Catatan & Evaluasi untuk Siswa
            </Label>
            <Textarea
              id="komentar"
              value={komentar}
              onChange={(e) => setKomentar(e.target.value)}
              placeholder="Berikan feedback membangun untuk siswa..."
              rows={4}
              className="text-xs leading-relaxed"
            />
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <Button
              className="w-full btn-touch gap-2 bg-[#008C45] hover:bg-[#007439] text-white font-bold shadow-md"
              onClick={() => {
                onSubmitKoreksi?.({ nilai: nilaiNum, komentar, status: "SUDAH_DINILAI" });
                toast.success(`Tugas ${studentName} berhasil dinilai: ${nilaiNum} (${currentGradeInfo.predikat})`);
              }}
              disabled={!nilai}
            >
              <Check className="size-4" />
              Selesai & Simpan Nilai
            </Button>

            <Button
              variant="outline"
              className="w-full btn-touch gap-2 border-[#FDB913] text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 font-semibold"
              onClick={() => {
                onSubmitKoreksi?.({ nilai: nilaiNum, komentar, status: "REVISI" });
                toast.warning(`Tugas ${studentName} ditandai butuh revisi perbaikan.`);
              }}
            >
              <RotateCcw className="size-4" />
              Minta Siswa Revisi
            </Button>

            <Button
              variant="ghost"
              className="w-full btn-touch gap-2 text-xs text-muted-foreground"
              onClick={() => toast.info("Draft koreksi dan catatan sementara telah disimpan.")}
            >
              <Save className="size-4" />
              Simpan Sebagai Draft
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
