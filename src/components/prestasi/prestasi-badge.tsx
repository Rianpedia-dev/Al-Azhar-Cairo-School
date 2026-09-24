"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { KategoriPrestasi, TingkatPrestasi } from "@/types";

const kategoriConfig: Record<KategoriPrestasi, { label: string; emoji: string; color: string }> = {
  AKADEMIK: { label: "Akademik", emoji: "📚", color: "bg-[#00AEEF]/10 text-[#00AEEF] border-[#00AEEF]/30" },
  NON_AKADEMIK: { label: "Non-Akademik", emoji: "🌟", color: "bg-[#662D91]/10 text-[#662D91] border-[#662D91]/30" },
  OLAHRAGA: { label: "Olahraga", emoji: "⚽", color: "bg-[#008C45]/10 text-[#008C45] border-[#008C45]/30" },
  SENI: { label: "Seni", emoji: "🎨", color: "bg-[#FDB913]/10 text-[#FDB913] border-[#FDB913]/30" },
  KEAGAMAAN: { label: "Keagamaan", emoji: "🕌", color: "bg-primary/10 text-primary border-primary/30" },
  LAINNYA: { label: "Lainnya", emoji: "✨", color: "bg-secondary text-secondary-foreground border-secondary" },
};

const tingkatConfig: Record<TingkatPrestasi, { label: string; emoji: string; color: string }> = {
  SEKOLAH: { label: "Sekolah", emoji: "🏫", color: "bg-secondary text-secondary-foreground" },
  KECAMATAN: { label: "Kecamatan", emoji: "🏘️", color: "bg-[#008C45]/10 text-[#008C45]" },
  KOTA: { label: "Kota", emoji: "🏙️", color: "bg-[#00AEEF]/10 text-[#00AEEF]" },
  PROVINSI: { label: "Provinsi", emoji: "🗺️", color: "bg-[#662D91]/10 text-[#662D91]" },
  NASIONAL: { label: "Nasional", emoji: "🇮🇩", color: "bg-[#E1251B]/10 text-[#E1251B]" },
  INTERNASIONAL: { label: "Internasional", emoji: "🌍", color: "bg-[#FDB913]/10 text-[#FDB913]" },
};

export function PrestasiBadge({
  type,
  value,
  size = "sm",
}: {
  type: "kategori" | "tingkat";
  value: KategoriPrestasi | TingkatPrestasi;
  size?: "sm" | "lg";
}) {
  const config = type === "kategori"
    ? kategoriConfig[value as KategoriPrestasi]
    : tingkatConfig[value as TingkatPrestasi];

  if (!config) return null;

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium gap-1 border",
        config.color,
        size === "lg" ? "text-sm px-3 py-1" : "text-[10px] px-2 py-0.5"
      )}
    >
      <span>{config.emoji}</span>
      <span>{config.label}</span>
    </Badge>
  );
}
