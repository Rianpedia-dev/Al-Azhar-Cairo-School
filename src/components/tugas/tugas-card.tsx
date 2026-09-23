"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Calendar, Clock, FileText, Upload } from "lucide-react";
import type { Tugas } from "@/types";

const statusColors: Record<string, string> = {
  DRAFT: "bg-[#FDB913]/10 text-[#FDB913] border-[#FDB913]/30",
  PUBLISHED: "bg-[#008C45]/10 text-[#008C45] border-[#008C45]/30",
  CLOSED: "bg-[#E1251B]/10 text-[#E1251B] border-[#E1251B]/30",
};

const statusLabels: Record<string, string> = {
  DRAFT: "Draft",
  PUBLISHED: "Dipublikasi",
  CLOSED: "Ditutup",
};

const jenisIcons: Record<string, React.ReactNode> = {
  ESSAY: <FileText className="h-4 w-4" />,
  PILIHAN_GANDA: <FileText className="h-4 w-4" />,
  UPLOAD_FILE: <Upload className="h-4 w-4" />,
  PROYEK: <FileText className="h-4 w-4" />,
};

const jenisLabels: Record<string, string> = {
  ESSAY: "Essay",
  PILIHAN_GANDA: "Pilihan Ganda",
  UPLOAD_FILE: "Upload File",
  PROYEK: "Proyek",
};

import Link from "next/link";

interface TugasCardProps {
  tugas: Tugas;
  onClick?: () => void;
  href?: string;
  showMapel?: boolean;
  mapelName?: string;
}

export function TugasCard({ tugas, onClick, href, showMapel, mapelName }: TugasCardProps) {
  const deadline = new Date(tugas.deadline);
  const now = new Date();
  const isOverdue = deadline < now && tugas.status !== "CLOSED";
  const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  const cardElement = (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:scale-[1.01] hover:shadow-md border border-border/50 hover:border-border group h-full",
        (onClick || href) && "cursor-pointer"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="outline"
                className={cn("text-[10px] px-2 py-0.5 font-medium", statusColors[tugas.status])}
              >
                {statusLabels[tugas.status]}
              </Badge>
              <Badge variant="secondary" className="text-[10px] px-2 py-0.5 gap-1">
                {jenisIcons[tugas.jenisTugas]}
                {jenisLabels[tugas.jenisTugas]}
              </Badge>
            </div>

            <h3 className="font-semibold text-sm md:text-base truncate group-hover:text-primary transition-colors">
              {tugas.judul}
            </h3>

            {tugas.deskripsi && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {tugas.deskripsi}
              </p>
            )}

            {showMapel && mapelName && (
              <p className="text-xs text-accent font-medium mt-1">📚 {mapelName}</p>
            )}

            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{deadline.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
              </div>
              {tugas.status === "PUBLISHED" && (
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs font-medium",
                    isOverdue ? "text-[#E1251B]" : daysLeft <= 3 ? "text-[#FDB913]" : "text-[#008C45]"
                  )}
                >
                  <Clock className="h-3 w-3" />
                  {isOverdue ? "Terlambat!" : `${daysLeft} hari lagi`}
                </div>
              )}
            </div>
          </div>

          {tugas.lampiran && tugas.lampiran.length > 0 && (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground shrink-0">
              <FileText className="h-5 w-5" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {cardElement}
      </Link>
    );
  }

  return cardElement;
}
