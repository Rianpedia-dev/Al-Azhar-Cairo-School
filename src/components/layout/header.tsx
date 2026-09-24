"use client";

import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { getUserInitials, getAvatarColor, mockUsers } from "@/lib/mock-data";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Moon,
  Sun,
  LogOut,
  User,
  Shield,
  GraduationCap,
  ArrowLeftRight,
  Settings,
  KeyRound,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export function AppHeader() {
  const { theme, setTheme } = useTheme();
  const { user, login, logout, getRedirectPath } = useAuth();
  const router = useRouter();

  // Dialog states
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Profile form state
  const [profileName, setProfileName] = useState(user?.name || "Admin Al-Azhar");
  const [profileEmail, setProfileEmail] = useState(user?.email || "admin@alazharcairo.sch.id");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // School settings state
  const [tahunAjaran, setTahunAjaran] = useState("2026/2027");
  const [semester, setSemester] = useState("Ganjil (Semester 1)");
  const [maxFileSize, setMaxFileSize] = useState("10");

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleSwitchRole = async (role: "ADMIN" | "GURU" | "SISWA") => {
    const targetUser = mockUsers.find((u) => u.role === role);
    if (!targetUser) return;
    await login(targetUser.email, "password123");
    toast.success(`Beralih ke peran ${role} (${targetUser.name})`);
    router.push(getRedirectPath(role));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profil pengguna berhasil diperbarui!");
    setIsProfileOpen(false);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      toast.error("Konfirmasi kata sandi baru tidak cocok");
      return;
    }
    toast.success("Kata sandi akun Anda berhasil diganti!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsProfileOpen(false);
  };

  const handleSaveSettings = () => {
    toast.success("Konfigurasi tahun ajaran dan sistem berhasil disimpan!");
    setIsSettingsOpen(false);
  };

  const initials = user ? getUserInitials(user.name) : "AA";
  const avatarBg = user ? getAvatarColor(user.name) : "#7c9082";

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
        {/* Sidebar trigger (desktop & mobile) */}
        <SidebarTrigger
          className="-ml-1 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          title="Buka/Tutup Sidebar (Ctrl+B)"
        />
        <Separator orientation="vertical" className="h-4 hidden sm:block" />

        {/* Logo for mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xs">
            AC
          </div>
        </div>
        {/* App Title & Tahun Ajaran */}
        <div className="flex flex-col justify-center min-w-0">
          <span className="font-semibold text-xs sm:text-sm text-foreground/90 leading-tight truncate">
            Al-Azhar Cairo App
          </span>
          <span className="text-[10px] sm:text-xs text-muted-foreground font-medium truncate hidden sm:inline">
            Tahun Ajaran {tahunAjaran}
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Notification bell */}
          <Button
            variant="ghost"
            size="icon"
            className="relative btn-touch"
            onClick={() =>
              toast.info(
                "3 Notifikasi baru: Tugas Matematika menunggu koreksi, 1 prestasi diajukan, pengumuman rapat guru"
              )
            }
          >
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#E1251B] text-[10px] text-white font-bold">
              3
            </span>
            <span className="sr-only">Notifikasi</span>
          </Button>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="btn-touch text-muted-foreground"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle tema</span>
          </Button>

          {/* User menu & Role switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-2 hover:bg-secondary transition-colors"
                />
              }
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback
                  suppressHydrationWarning
                  style={{ backgroundColor: avatarBg }}
                  className="text-white text-xs font-bold"
                >
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start text-left">
                <span
                  suppressHydrationWarning
                  className="text-sm font-semibold leading-tight text-foreground"
                >
                  {user?.name || "Admin Al-Azhar"}
                </span>
                <Badge
                  suppressHydrationWarning
                  variant="secondary"
                  className="text-[10px] px-1.5 py-0 mt-0.5 font-bold"
                >
                  {user?.role || "ADMIN"}
                </Badge>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground">
                      {user?.name || "Admin Al-Azhar"}
                    </span>
                    <span className="text-xs text-muted-foreground font-normal">
                      {user?.email || "admin@alazharcairo.sch.id"}
                    </span>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              {/* PRD 7.1.2 AUTH-06: Profil Saya */}
              <DropdownMenuItem
                onClick={() => {
                  setProfileName(user?.name || "");
                  setProfileEmail(user?.email || "");
                  setIsProfileOpen(true);
                }}
                className="cursor-pointer"
              >
                <User className="mr-2 h-4 w-4 text-primary" />
                <span>Profil Saya</span>
              </DropdownMenuItem>

              {/* PRD 9.3: Pengaturan Admin */}
              {user?.role === "ADMIN" && (
                <DropdownMenuItem
                  onClick={() => setIsSettingsOpen(true)}
                  className="cursor-pointer"
                >
                  <Settings className="mr-2 h-4 w-4 text-[#008C45]" />
                  <span>Pengaturan Sekolah</span>
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />

              {/* Quick Role Switcher */}
              <div className="px-2 py-1 text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <ArrowLeftRight className="size-3 text-[#00AEEF]" /> Ganti Peran Demo
              </div>
              <DropdownMenuItem
                onClick={() => handleSwitchRole("ADMIN")}
                className="cursor-pointer text-xs"
              >
                <Shield className="mr-2 h-4 w-4 text-primary" />
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
                <User className="mr-2 h-4 w-4 text-[#FDB913]" />
                <span>Masuk sebagai Siswa</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Keluar (Logout)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* PRD 7.1.2 AUTH-04 & AUTH-06: Dialog Profil Saya */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="size-5 text-primary" />
              Profil Pengguna Al-Azhar Cairo
            </DialogTitle>
            <DialogDescription>
              Kelola data diri dan keamanan kata sandi akun Anda
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="info" className="w-full pt-2">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="info">Informasi Akun</TabsTrigger>
              <TabsTrigger value="password">Ganti Kata Sandi</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4 pt-3">
              <form onSubmit={handleSaveProfile} className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30">
                  <Avatar className="size-12">
                    <AvatarFallback
                      style={{ backgroundColor: avatarBg }}
                      className="text-white font-bold"
                    >
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold text-sm">{user?.name}</div>
                    <Badge variant="secondary" className="text-[10px] mt-0.5">
                      {user?.role} • Al-Azhar Cairo
                    </Badge>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="prof-name" className="text-xs">
                    Nama Lengkap
                  </Label>
                  <Input
                    id="prof-name"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="prof-email" className="text-xs">
                    Email Resmi
                  </Label>
                  <Input
                    id="prof-email"
                    type="email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded border bg-muted/20">
                    <span className="text-muted-foreground block text-[10px]">NIS / NIP:</span>
                    <span className="font-mono font-bold">202607001</span>
                  </div>
                  <div className="p-2 rounded border bg-muted/20">
                    <span className="text-muted-foreground block text-[10px]">Jenjang:</span>
                    <span className="font-bold">SD & SMP Cairo</span>
                  </div>
                </div>

                <DialogFooter className="pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Simpan Perubahan
                  </Button>
                </DialogFooter>
              </form>
            </TabsContent>

            <TabsContent value="password" className="space-y-4 pt-3">
              <form onSubmit={handleChangePassword} className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="old-pass" className="text-xs">
                    Kata Sandi Saat Ini
                  </Label>
                  <Input
                    id="old-pass"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new-pass" className="text-xs">
                    Kata Sandi Baru
                  </Label>
                  <Input
                    id="new-pass"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimal 8 karakter"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="conf-pass" className="text-xs">
                    Konfirmasi Kata Sandi Baru
                  </Label>
                  <Input
                    id="conf-pass"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi kata sandi baru"
                    required
                  />
                </div>

                <DialogFooter className="pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-[#008C45] hover:bg-[#007439] text-white gap-1"
                  >
                    <KeyRound className="size-3.5" /> Perbarui Kata Sandi
                  </Button>
                </DialogFooter>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* PRD 9.3: Dialog Pengaturan Sistem Sekolah (Admin) */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="size-5 text-[#008C45]" />
              Pengaturan Sistem & Akademik
            </DialogTitle>
            <DialogDescription>
              Konfigurasi tahun ajaran, semester aktif, dan parameter tugas
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs">Tahun Ajaran Aktif</Label>
              <Input
                value={tahunAjaran}
                onChange={(e) => setTahunAjaran(e.target.value)}
                placeholder="2026/2027"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Semester Berjalan</Label>
              <div className="flex gap-2">
                {["Ganjil (Semester 1)", "Genap (Semester 2)"].map((sem) => (
                  <Button
                    key={sem}
                    type="button"
                    size="sm"
                    variant={semester === sem ? "default" : "outline"}
                    className={
                      semester === sem ? "bg-primary text-primary-foreground text-xs" : "text-xs"
                    }
                    onClick={() => setSemester(sem)}
                  >
                    {sem}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Batas Maksimal Ukuran Unggah File (MB)</Label>
              <Input
                type="number"
                value={maxFileSize}
                onChange={(e) => setMaxFileSize(e.target.value)}
                min="1"
                max="50"
              />
              <p className="text-[11px] text-muted-foreground">
                Sesuai PRD 7.6.4: default 10MB per file pengumpulan tugas
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsSettingsOpen(false)}
            >
              Batal
            </Button>
            <Button
              type="button"
              size="sm"
              className="bg-[#008C45] hover:bg-[#007439] text-white gap-1"
              onClick={handleSaveSettings}
            >
              <CheckCircle className="size-3.5" /> Simpan Pengaturan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
