"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: { value: number; isPositive: boolean };
  colorClass?: string;
  variant?: "primary" | "secondary" | "accent" | "warning" | "danger" | "success" | string;
}

const colorClasses: Record<string, string> = {
  cyan: "bg-[#00AEEF]/10 text-[#00AEEF] dark:bg-[#00AEEF]/20",
  primary: "bg-[#008C45]/10 text-[#008C45] dark:bg-[#00b85a]/20 dark:text-[#00b85a]",
  secondary: "bg-[#00AEEF]/10 text-[#00AEEF] dark:bg-[#00AEEF]/20",
  accent: "bg-[#662D91]/10 text-[#662D91] dark:bg-[#662D91]/20 dark:text-[#c084fc]",
  warning: "bg-[#FDB913]/10 text-[#FDB913] dark:bg-[#FDB913]/20 dark:text-[#fcd34d]",
  danger: "bg-[#E1251B]/10 text-[#E1251B] dark:bg-[#E1251B]/20",
  success: "bg-[#008C45]/10 text-[#008C45] dark:bg-[#00b85a]/20",
  red: "bg-[#E1251B]/10 text-[#E1251B] dark:bg-[#E1251B]/20",
  yellow: "bg-[#FDB913]/10 text-[#FDB913] dark:bg-[#FDB913]/20",
  green: "bg-[#008C45]/10 text-[#008C45] dark:bg-[#00b85a]/20 dark:text-[#00b85a]",
  purple: "bg-[#662D91]/10 text-[#662D91] dark:bg-[#F37021]/20 dark:text-[#F37021]",
  blue: "bg-[#27348B]/10 text-[#27348B] dark:bg-[#00AEEF]/20 dark:text-[#00AEEF]",
};

export function StatCard({
  title,
  value,
  icon,
  colorClass,
  variant = "cyan",
}: StatCardProps) {
  const activeColor = colorClass || colorClasses[variant] || colorClasses.cyan;
  return (
    <Card className="stat-card overflow-hidden border border-border/50 hover:border-border transition-all duration-300 group">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <p className="text-2xl md:text-3xl font-bold tracking-tight">
              {value}
            </p>
          </div>
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 shrink-0",
              activeColor
            )}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
