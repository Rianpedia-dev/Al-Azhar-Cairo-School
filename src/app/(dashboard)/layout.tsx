"use client";

import { usePathname } from "next/navigation";
import type { UserRole } from "@/types";
import { AppSidebar } from "@/components/layout/sidebar";
import { AppHeader } from "@/components/layout/header";
import { AppFooter } from "@/components/layout/footer";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

function getRoleFromPath(pathname: string): UserRole {
  if (pathname.startsWith("/admin")) return "ADMIN";
  if (pathname.startsWith("/guru")) return "GURU";
  if (pathname.startsWith("/siswa")) return "SISWA";
  return "SISWA";
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const role = getRoleFromPath(pathname);

  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <SidebarInset>
        <AppHeader />
        <main className="flex-1 p-4 md:p-6 xl:p-8 page-enter">
          {children}
        </main>
        <AppFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}
