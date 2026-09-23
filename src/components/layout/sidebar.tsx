"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { ChevronDown, GraduationCap } from "lucide-react";
import { useState } from "react";

interface NavItem {
  title: string;
  href: string;
  emoji: string;
  children?: { title: string; href: string }[];
}

const adminNavItems: NavItem[] = [
  { title: "Dashboard", href: "/admin/dashboard", emoji: "🏠" },
  {
    title: "Manajemen User",
    href: "/admin/users",
    emoji: "👥",
    children: [
      { title: "Semua User", href: "/admin/users" },
      { title: "Pendidik & Guru", href: "/admin/users?role=GURU" },
      { title: "Peserta Didik", href: "/admin/users?role=SISWA" },
    ],
  },
  { title: "Manajemen Kelas", href: "/admin/kelas", emoji: "🏫" },
  { title: "Mata Pelajaran", href: "/admin/mata-pelajaran", emoji: "📚" },
  { title: "Prestasi Siswa", href: "/admin/prestasi", emoji: "🏆" },
  { title: "Monitoring Tugas", href: "/guru/tugas", emoji: "📝" },
  { title: "Monitoring Chat", href: "/guru/chat", emoji: "💬" },
  { title: "Laporan & Rekap", href: "/admin/laporan", emoji: "📊" },
];

const guruNavItems: NavItem[] = [
  { title: "Dashboard", href: "/guru/dashboard", emoji: "🏠" },
  { title: "Kelas Saya", href: "/guru/kelas-saya", emoji: "🏫" },
  { title: "Mata Pelajaran", href: "/admin/mata-pelajaran", emoji: "📚" },
  {
    title: "Tugas",
    href: "/guru/tugas",
    emoji: "📝",
    children: [
      { title: "Daftar Tugas", href: "/guru/tugas" },
      { title: "Buat Tugas Baru", href: "/guru/tugas/buat" },
    ],
  },
  { title: "Prestasi Siswa", href: "/guru/prestasi", emoji: "🏆" },
  { title: "Ruang Chat", href: "/guru/chat", emoji: "💬" },
];

const siswaNavItems: NavItem[] = [
  { title: "Dashboard", href: "/siswa/dashboard", emoji: "🏠" },
  { title: "Mata Pelajaran", href: "/siswa/mata-pelajaran", emoji: "📚" },
  { title: "Tugas Saya", href: "/siswa/tugas", emoji: "📝" },
  { title: "Prestasi Saya", href: "/siswa/prestasi", emoji: "🏆" },
  { title: "Chat Belajar", href: "/siswa/chat", emoji: "💬" },
];

function getNavItems(role: UserRole): NavItem[] {
  switch (role) {
    case "ADMIN":
      return adminNavItems;
    case "GURU":
      return guruNavItems;
    case "SISWA":
      return siswaNavItems;
    default:
      return [];
  }
}

export function AppSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const navItems = getNavItems(role);
  const [expandedItems, setExpandedItems] = useState<string[]>(["Tugas"]);

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="h-16 justify-center px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#27348B] to-[#1e276b] text-white shadow-md shrink-0">
            <GraduationCap className="size-5 text-[#FDB913]" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-bold text-sm tracking-tight text-sidebar-foreground leading-tight">
              Al-Azhar Cairo
            </span>
            <span className="text-[11px] text-muted-foreground font-medium mt-0.5">
              SD & SMP
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground/70 px-4 py-2">
            Menu {role.toLowerCase()}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.children &&
                    item.children.some((c) => pathname === c.href));
                const hasChildren = item.children && item.children.length > 0;
                const isExpanded = expandedItems.includes(item.title);

                return (
                  <SidebarMenuItem key={item.title}>
                    {hasChildren ? (
                      <>
                        <SidebarMenuButton
                          onClick={() => toggleExpand(item.title)}
                          isActive={isActive}
                          tooltip={item.title}
                          className="transition-all duration-200 hover:scale-[1.01]"
                        >
                          <span className="text-lg">{item.emoji}</span>
                          <span className="font-medium text-sm">{item.title}</span>
                          <ChevronDown
                            className={cn(
                              "ml-auto h-4 w-4 transition-transform duration-200",
                              isExpanded && "rotate-180"
                            )}
                          />
                        </SidebarMenuButton>
                        {isExpanded && item.children && (
                          <SidebarMenuSub>
                            {item.children.map((child) => (
                              <SidebarMenuSubItem key={`${child.title}-${child.href}`}>
                                <SidebarMenuSubButton
                                  render={<Link href={child.href} />}
                                  isActive={pathname === child.href}
                                >
                                  <span className="text-xs font-medium">{child.title}</span>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        )}
                      </>
                    ) : (
                      <SidebarMenuButton
                        render={<Link href={item.href} />}
                        isActive={isActive}
                        tooltip={item.title}
                        className={cn(
                          "transition-all duration-200 hover:scale-[1.01]",
                          isActive && "font-semibold"
                        )}
                      >
                        <span className="text-lg">{item.emoji}</span>
                        <span className="font-medium text-sm">{item.title}</span>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
