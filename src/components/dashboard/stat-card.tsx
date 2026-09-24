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
  primary: "bg-primary/10 text-primary dark:bg-primary/20",
  secondary: "bg-secondary text-secondary-foreground",
  accent: "bg-[#662D91]/10 text-[#662D91] dark:bg-[#662D91]/20 dark:text-[#c084fc]",
  warning: "bg-[#FDB913]/10 text-[#FDB913] dark:bg-[#FDB913]/20 dark:text-[#fcd34d]",
  danger: "bg-[#E1251B]/10 text-[#E1251B] dark:bg-[#E1251B]/20",
  success: "bg-[#008C45]/10 text-[#008C45] dark:bg-[#00b85a]/20",
  red: "bg-[#E1251B]/10 text-[#E1251B] dark:bg-[#E1251B]/20",
  yellow: "bg-[#FDB913]/10 text-[#FDB913] dark:bg-[#FDB913]/20",
  green: "bg-[#008C45]/10 text-[#008C45] dark:bg-[#00b85a]/20 dark:text-[#00b85a]",
  purple: "bg-[#662D91]/10 text-[#662D91] dark:bg-[#F37021]/20 dark:text-[#F37021]",
  blue: "bg-primary/10 text-primary dark:bg-primary/20",
};

export function StatCard({
  title,
  value,
  icon,
  description,
  colorClass,
  variant = "cyan",
}: StatCardProps) {
  const activeColor = colorClass || colorClasses[variant] || colorClasses.cyan;
  return (
    <Card className="stat-card overflow-hidden border border-border/50 hover:border-border transition-all duration-300 group">
      <CardContent className="p-4 sm:p-5 md:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1 truncate">
              {title}
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {value}
            </p>
            {description && (
              <p className="text-[11px] sm:text-xs text-muted-foreground mt-1 truncate">
                {description}
              </p>
            )}
          </div>
          <div
            className={cn(
              "flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 shrink-0",
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
