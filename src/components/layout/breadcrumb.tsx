"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

const labelMap: Record<string, string> = {
  admin: "Admin",
  guru: "Guru",
  siswa: "Siswa",
  dashboard: "Dashboard",
  users: "Manajemen User",
  kelas: "Kelas",
  "kelas-saya": "Kelas Saya",
  "mata-pelajaran": "Mata Pelajaran",
  prestasi: "Prestasi",
  tugas: "Tugas",
  chat: "Chat",
  laporan: "Laporan",
  buat: "Buat Baru",
  koreksi: "Koreksi",
};

export function AppBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length <= 1) return null;

  const items = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = labelMap[segment] || segment;
    const isLast = index === segments.length - 1;

    return { label, href, isLast };
  });

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={item.href}>
            {index > 0 && (
              <BreadcrumbSeparator>
                <ChevronRight className="h-3.5 w-3.5" />
              </BreadcrumbSeparator>
            )}
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage className="font-medium">
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink render={<Link href={item.href} className="hover:text-primary transition-colors" />}>
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
