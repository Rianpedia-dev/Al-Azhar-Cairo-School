"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  ChevronDown,
  GraduationCap,
  ChevronsUpDown,
  LogOut,
  User as UserIcon,
  Shield,
  ArrowLeftRight,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { getUserInitials, getAvatarColor, mockUsers } from "@/lib/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

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
  const router = useRouter();
  const navItems = getNavItems(role);
  const { isMobile, setOpenMobile, state, setOpen } = useSidebar();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Tugas"]);
  const { user, login, logout, getRedirectPath } = useAuth();

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const handleLogout = () => {
    if (isMobile) setOpenMobile(false);
    logout();
    router.push("/login");
  };

  const handleSwitchRole = async (targetRole: "ADMIN" | "GURU" | "SISWA") => {
    const targetUser = mockUsers.find((u) => u.role === targetRole);
    if (!targetUser) return;
    if (isMobile) setOpenMobile(false);
    await login(targetUser.email, "password123");
    toast.success(`Beralih ke peran ${targetRole} (${targetUser.name})`);
    router.push(getRedirectPath(targetRole));
  };

  const initials = user ? getUserInitials(user.name) : "AA";
  const avatarBg = user ? getAvatarColor(user.name) : "#27348B";

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const handleParentClick = (item: NavItem) => {
    if (state === "collapsed") {
      setOpen(true);
      if (!expandedItems.includes(item.title)) {
        setExpandedItems((prev) => [...prev, item.title]);
      }
    } else {
      toggleExpand(item.title);
    }
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="h-16 justify-center px-4 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:items-center border-b border-sidebar-border transition-all duration-200">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:justify-center">
          <div className="flex h-9 w-9 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 items-center justify-center rounded-xl group-data-[collapsible=icon]:rounded-lg bg-gradient-to-br from-[#27348B] to-[#1e276b] text-white shadow-md shrink-0 transition-all duration-200">
            <GraduationCap className="size-5 group-data-[collapsible=icon]:size-4 text-[#FDB913]" />
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
          <SidebarGroupLabel className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground/70 px-4 py-2 group-data-[collapsible=icon]:hidden">
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
                          onClick={() => handleParentClick(item)}
                          isActive={isActive}
                          tooltip={item.title}
                          className="transition-all duration-200 hover:scale-[1.01] group-data-[collapsible=icon]:justify-center"
                        >
                          <span className="text-base shrink-0 flex items-center justify-center leading-none">
                            {item.emoji}
                          </span>
                          <span className="font-medium text-sm group-data-[collapsible=icon]:hidden truncate">
                            {item.title}
                          </span>
                          <ChevronDown
                            className={cn(
                              "ml-auto h-4 w-4 transition-transform duration-200 group-data-[collapsible=icon]:hidden shrink-0",
                              isExpanded && "rotate-180"
                            )}
                          />
                        </SidebarMenuButton>
                        {isExpanded && item.children && (
                          <SidebarMenuSub>
                            {item.children.map((child) => (
                              <SidebarMenuSubItem key={`${child.title}-${child.href}`}>
                                <SidebarMenuSubButton
                                  render={<Link href={child.href} onClick={handleNavClick} />}
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
                        render={<Link href={item.href} onClick={handleNavClick} />}
                        isActive={isActive}
                        tooltip={item.title}
                        className={cn(
                          "transition-all duration-200 hover:scale-[1.01] group-data-[collapsible=icon]:justify-center",
                          isActive && "font-semibold"
                        )}
                      >
                        <span className="text-base shrink-0 flex items-center justify-center leading-none">
                          {item.emoji}
                        </span>
                        <span className="font-medium text-sm group-data-[collapsible=icon]:hidden truncate">
                          {item.title}
                        </span>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    tooltip={user?.name || "Profil User"}
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:justify-center hover:bg-sidebar-accent cursor-pointer transition-all duration-200"
                  />
                }
              >
                <Avatar className="h-8 w-8 rounded-lg shrink-0">
                  <AvatarFallback
                    suppressHydrationWarning
                    style={{ backgroundColor: avatarBg }}
                    className="text-white text-xs font-bold rounded-lg"
                  >
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden min-w-0">
                  <span
                    suppressHydrationWarning
                    className="truncate font-semibold text-xs sm:text-sm text-sidebar-foreground"
                  >
                    {user?.name || "Admin Al-Azhar"}
                  </span>
                  <span
                    suppressHydrationWarning
                    className="truncate text-[11px] text-muted-foreground flex items-center gap-1.5 mt-0.5"
                  >
                    <span className="inline-block size-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="font-medium text-muted-foreground capitalize">
                      {user?.role?.toLowerCase() || role.toLowerCase()}
                    </span>
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4 shrink-0 text-muted-foreground group-data-[collapsible=icon]:hidden" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 min-w-56 rounded-xl p-1.5 shadow-xl border border-border"
                side={isMobile ? "bottom" : state === "collapsed" ? "right" : "top"}
                align={state === "collapsed" ? "end" : "start"}
                sideOffset={8}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2.5 px-2.5 py-2 text-left text-sm">
                    <Avatar className="h-9 w-9 rounded-lg shrink-0">
                      <AvatarFallback
                        suppressHydrationWarning
                        style={{ backgroundColor: avatarBg }}
                        className="text-white text-xs font-bold rounded-lg"
                      >
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
                      <span className="truncate font-semibold text-foreground text-sm">
                        {user?.name || "Admin Al-Azhar"}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {user?.email || "admin@alazharcairo.sch.id"}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-[10px] font-bold px-1.5 py-0 uppercase shrink-0">
                      {user?.role || role}
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => {
                      if (isMobile) setOpenMobile(false);
                      const target = role === "ADMIN" ? "/admin/users" : role === "GURU" ? "/guru/kelas-saya" : "/siswa/dashboard";
                      router.push(target);
                    }}
                    className="cursor-pointer"
                  >
                    <UserIcon className="mr-2 h-4 w-4 text-[#27348B] dark:text-[#00AEEF]" />
                    <span>Profil Saya</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <div className="px-2 py-1 text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                  <ArrowLeftRight className="size-3 text-[#00AEEF]" /> Ganti Peran Demo
                </div>
                <DropdownMenuItem
                  onClick={() => handleSwitchRole("ADMIN")}
                  className="cursor-pointer text-xs"
                >
                  <Shield className="mr-2 h-4 w-4 text-[#27348B]" />
                  <span>Masuk sebagai Admin</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleSwitchRole("GURU")}
                  className="cursor-pointer text-xs"
                >
                  <GraduationCap className="mr-2 h-4 w-4 text-[#008C45]" />
                  <span>Masuk sebagai Guru</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleSwitchRole("SISWA")}
                  className="cursor-pointer text-xs"
                >
                  <UserIcon className="mr-2 h-4 w-4 text-[#FDB913]" />
                  <span>Masuk sebagai Siswa</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Keluar (Logout)</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
