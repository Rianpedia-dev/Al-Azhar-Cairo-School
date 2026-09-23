import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50/40 to-emerald-100/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
