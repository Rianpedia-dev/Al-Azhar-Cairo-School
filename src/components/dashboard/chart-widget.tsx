"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from "recharts";

const CHART_COLORS = ["#00AEEF", "#E1251B", "#FDB913", "#008C45", "#662D91", "#F37021"];

interface ChartWidgetProps {
  title: string;
  description?: string;
  type: "bar" | "pie" | "radar" | "line";
  data: Record<string, unknown>[];
  dataKey?: string;
  xAxisKey?: string;
  nameKey?: string;
  className?: string;
}

export function ChartWidget({
  title,
  description,
  type,
  data,
  dataKey = "value",
  xAxisKey,
  nameKey = "name",
  className,
}: ChartWidgetProps) {
  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey={nameKey} tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
              <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--foreground)",
                }}
              />
              <Bar dataKey={dataKey} radius={[6, 6, 0, 0]}>
                {data.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey={dataKey}
                nameKey={nameKey}
                label={({ name, percent }) => `${name} ${percent != null ? (percent * 100).toFixed(0) : 0}%`}
              >
                {data.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--foreground)",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      case "radar":
        return (
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={data}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey={nameKey} tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
              <PolarRadiusAxis tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
              <Radar
                dataKey={dataKey}
                stroke="#00AEEF"
                fill="#00AEEF"
                fillOpacity={0.3}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--foreground)",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        );

      case "line":
        return (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey={nameKey} tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
              <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--foreground)",
                }}
              />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke="#00AEEF"
                strokeWidth={2}
                dot={{ fill: "#00AEEF", r: 4 }}
                activeDot={{ r: 6, fill: "#27348B" }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {description && <CardDescription className="text-xs">{description}</CardDescription>}
      </CardHeader>
      <CardContent>{renderChart()}</CardContent>
    </Card>
  );
}
