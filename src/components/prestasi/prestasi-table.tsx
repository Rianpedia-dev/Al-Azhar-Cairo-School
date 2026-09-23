"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PrestasiBadge } from "./prestasi-badge";
import type { Prestasi } from "@/types";
import { Check, X, Eye } from "lucide-react";

interface PrestasiTableProps {
  data: Prestasi[];
  showVerifyAction?: boolean;
  onVerify?: (id: string) => void;
  onView?: (prestasi: Prestasi) => void;
}

export function PrestasiTable({ data, showVerifyAction, onVerify, onView }: PrestasiTableProps) {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary/50">
            <TableHead className="font-semibold">Judul</TableHead>
            <TableHead className="font-semibold">Siswa</TableHead>
            <TableHead className="font-semibold">Kategori</TableHead>
            <TableHead className="font-semibold">Tingkat</TableHead>
            <TableHead className="font-semibold">Peringkat</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                <div className="text-4xl mb-2">🏆</div>
                <p>Belum ada data prestasi</p>
              </TableCell>
            </TableRow>
          ) : (
            data.map((prestasi) => (
              <TableRow key={prestasi.id} className="hover:bg-secondary/30 transition-colors">
                <TableCell>
                  <div>
                    <p className="font-medium text-sm">{prestasi.judul}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(prestasi.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  {prestasi.siswa?.name || "-"}
                </TableCell>
                <TableCell>
                  <PrestasiBadge type="kategori" value={prestasi.kategori} />
                </TableCell>
                <TableCell>
                  <PrestasiBadge type="tingkat" value={prestasi.tingkat} />
                </TableCell>
                <TableCell className="text-sm font-medium">
                  {prestasi.peringkat || "-"}
                </TableCell>
                <TableCell>
                  {prestasi.isVerified ? (
                    <Badge className="bg-[#008C45]/10 text-[#008C45] border-[#008C45]/30 text-[10px]" variant="outline">
                      <Check className="h-3 w-3 mr-1" />
                      Terverifikasi
                    </Badge>
                  ) : (
                    <Badge className="bg-[#FDB913]/10 text-[#FDB913] border-[#FDB913]/30 text-[10px]" variant="outline">
                      Menunggu Verifikasi
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onView?.(prestasi)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {showVerifyAction && !prestasi.isVerified && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[#008C45] hover:text-[#008C45]"
                        onClick={() => onVerify?.(prestasi.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
