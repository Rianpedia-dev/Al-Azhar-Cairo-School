"use client";

import { useState } from "react";
import { mockUsers } from "@/lib/mock-data";
import { User, UserRole } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Search,
  Upload,
  UserCheck,
  UserX,
  Shield,
  GraduationCap,
  User as UserIcon,
  Download,
  FileSpreadsheet,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nomorInduk, setNomorInduk] = useState("");
  const [role, setRole] = useState<UserRole>("GURU");

  // Sample import data preview (PRD 6.1 & 8.2)
  const sampleImportUsers: Partial<User>[] = [
    { name: "Muhammad Zidan", email: "zidan@alazharcairo.sch.id", role: "SISWA", nomorInduk: "202607005" },
    { name: "Aisyah Putri", email: "aisyah.p@alazharcairo.sch.id", role: "SISWA", nomorInduk: "202607006" },
    { name: "Ustadz Lukman Hakim, Lc", email: "lukman@alazharcairo.sch.id", role: "GURU", nomorInduk: "19880512003" },
  ];

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.nomorInduk && u.nomorInduk.includes(search));
    const matchRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Nama dan email wajib diisi");
      return;
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role,
      nomorInduk: nomorInduk || (role === "SISWA" ? `202607${Math.floor(100 + Math.random() * 900)}` : `198501${Math.floor(100 + Math.random() * 900)}`),
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setUsers([newUser, ...users]);
    toast.success(`User ${name} berhasil ditambahkan`);
    setName("");
    setEmail("");
    setNomorInduk("");
    setIsDialogOpen(false);
  };

  const handleConfirmImport = () => {
    const newBatch: User[] = sampleImportUsers.map((u, i) => ({
      id: `usr-imp-${Date.now()}-${i}`,
      name: u.name!,
      email: u.email!,
      role: u.role as UserRole,
      nomorInduk: u.nomorInduk,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    setUsers([...newBatch, ...users]);
    setIsImportOpen(false);
    toast.success(`Berhasil mengimpor ${newBatch.length} akun pengguna baru dari berkas CSV!`);
  };

  const toggleUserStatus = (id: string) => {
    setUsers(
      users.map((u) =>
        u.id === id ? { ...u, isActive: !u.isActive } : u
      )
    );
    toast.info("Status pengguna berhasil diperbarui");
  };

  const getRoleBadge = (r: UserRole) => {
    switch (r) {
      case "ADMIN":
        return <Badge className="bg-[#27348B] text-white gap-1"><Shield className="size-3" /> Admin</Badge>;
      case "GURU":
        return <Badge className="bg-[#008C45] text-white gap-1"><GraduationCap className="size-3" /> Guru</Badge>;
      case "SISWA":
        return <Badge variant="outline" className="gap-1 border-[#00AEEF] text-[#00AEEF]"><UserIcon className="size-3" /> Siswa</Badge>;
    }
  };

  const downloadCsvTemplate = () => {
    const csvContent = "data:text/csv;charset=utf-8,name,email,role,nomorInduk\nAhmad Fauzi,ahmad@alazharcairo.sch.id,SISWA,202607001\nUstadzah Fatimah,fatimah@alazharcairo.sch.id,GURU,1985032001";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "template_user_alazhar.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Template CSV berhasil diunduh");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Manajemen Pengguna
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {/* PRD 6.1: Import CSV Dialog */}
          <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
            <DialogTrigger render={<Button variant="outline" size="sm" className="border-border/80" />}>
              <Upload className="size-4 mr-1.5" /> Import CSV
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="size-5 text-[#008C45]" />
                  Import Data Pengguna Massal
                </DialogTitle>
                <DialogDescription>
                  Unggah berkas CSV sesuai format template untuk membuat akun secara massal
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-2">
                {/* Download Template button */}
                <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold">Format Kolom CSV:</p>
                    <p className="text-[11px] text-muted-foreground font-mono">name, email, role, nomorInduk</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={downloadCsvTemplate}
                    className="text-xs gap-1"
                  >
                    <Download className="size-3.5" /> Template
                  </Button>
                </div>

                {/* Dropzone */}
                <div className="border-2 border-dashed border-[#00AEEF]/50 rounded-xl p-6 text-center bg-cyan-50/20 dark:bg-cyan-950/10">
                  <Upload className="size-8 mx-auto text-[#00AEEF] mb-2" />
                  <p className="text-xs font-semibold">Pilih berkas CSV atau seret ke sini</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Maksimum 500 pengguna per file</p>
                </div>

                {/* Preview sample */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Pratinjau Data Calon Pengguna (3 Baris):</Label>
                  <div className="border rounded-lg overflow-hidden text-xs">
                    <Table>
                      <TableHeader className="bg-muted/40">
                        <TableRow className="h-8">
                          <TableHead className="text-[11px]">Nama</TableHead>
                          <TableHead className="text-[11px]">Peran</TableHead>
                          <TableHead className="text-[11px]">NIS/NIP</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sampleImportUsers.map((s, idx) => (
                          <TableRow key={idx} className="h-8">
                            <TableCell className="py-1 font-medium">{s.name}</TableCell>
                            <TableCell className="py-1">{s.role}</TableCell>
                            <TableCell className="py-1 font-mono text-muted-foreground">{s.nomorInduk}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" size="sm" onClick={() => setIsImportOpen(false)}>
                  Batal
                </Button>
                <Button
                  type="button"
                  size="sm"
                  className="bg-[#008C45] hover:bg-[#007439] text-white gap-1"
                  onClick={handleConfirmImport}
                >
                  <CheckCircle className="size-3.5" /> Impor 3 Pengguna
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Tambah User Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger render={<Button size="sm" className="bg-[#008C45] hover:bg-[#007439] text-white" />}>
              <Plus className="size-4 mr-1.5" /> Tambah User
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Pengguna Baru</DialogTitle>
                <DialogDescription>
                  Masukkan informasi akun untuk guru, staf, atau siswa baru Al-Azhar Cairo
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateUser} className="space-y-4 py-2">
                <div className="space-y-1.5">
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Input
                    id="nama"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Ustadzah Fatimah, S.Pd"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@alazharcairo.sch.id"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="nomorInduk">NIS / NIP (Nomor Induk)</Label>
                  <Input
                    id="nomorInduk"
                    value={nomorInduk}
                    onChange={(e) => setNomorInduk(e.target.value)}
                    placeholder="Contoh: 202607001 (Siswa) atau 19850123001 (Guru)"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Peran / Role</Label>
                  <div className="flex gap-2">
                    {(["GURU", "SISWA", "ADMIN"] as UserRole[]).map((r) => (
                      <Button
                        key={r}
                        type="button"
                        size="sm"
                        variant={role === r ? "default" : "outline"}
                        className={role === r ? "bg-[#27348B] text-white" : ""}
                        onClick={() => setRole(r)}
                      >
                        {r}
                      </Button>
                    ))}
                  </div>
                </div>
                <DialogFooter className="pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button type="submit" className="bg-[#008C45] hover:bg-[#007439] text-white">
                    Simpan User
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama, email, atau NIS/NIP..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 text-xs"
              />
            </div>
            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1">
              {["ALL", "ADMIN", "GURU", "SISWA"].map((r) => (
                <Button
                  key={r}
                  size="sm"
                  variant={roleFilter === r ? "default" : "ghost"}
                  className={roleFilter === r ? "bg-[#27348B] text-white h-8 text-xs font-semibold" : "h-8 text-xs"}
                  onClick={() => setRoleFilter(r)}
                >
                  {r === "ALL" ? "Semua Peran" : r}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama & NIS/NIP</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Peran</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground text-sm">
                    Tidak ada pengguna ditemukan
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="font-semibold text-sm">{user.name}</div>
                      <div className="text-[11px] font-mono text-muted-foreground">
                        NIS/NIP: {user.nomorInduk || "-"}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>
                      <Badge variant={user.isActive ? "default" : "secondary"} className="text-[10px]">
                        {user.isActive ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2 text-xs"
                        onClick={() => toggleUserStatus(user.id)}
                      >
                        {user.isActive ? (
                          <span className="text-[#E1251B] flex items-center gap-1"><UserX className="size-3.5" /> Nonaktifkan</span>
                        ) : (
                          <span className="text-[#008C45] flex items-center gap-1"><UserCheck className="size-3.5" /> Aktifkan</span>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
