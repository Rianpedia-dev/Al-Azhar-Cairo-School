"use client";

import { TugasForm } from "@/components/tugas/tugas-form";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function BuatTugasPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/guru/tugas");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <Link
          href="/guru/tugas"
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          <ArrowLeft className="size-4 mr-1" /> Kembali ke Daftar Tugas
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Buat Penugasan Baru
        </h1>
      </div>

      <TugasForm onSubmit={handleSuccess} />
    </div>
  );
}
