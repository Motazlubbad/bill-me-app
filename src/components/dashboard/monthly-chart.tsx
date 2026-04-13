"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatMonthShort } from "@/lib/utils/format";

interface MonthlyChartProps {
  data: { month: string; total: number }[];
  currency?: string;
}

export function MonthlyChart({ data, currency = "TRY" }: MonthlyChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    label: formatMonthShort(d.month),
  }));

  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle>Monthly Spending</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d9d9d9" />
              <XAxis
                dataKey="label"
                className="text-xs"
                tick={{ fill: "#757575" }}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: "#757575" }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value) =>
                  new Intl.NumberFormat("tr-TR", {
                    style: "currency",
                    currency,
                  }).format(Number(value))
                }
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #d9d9d9",
                  borderRadius: "8px",
                  boxShadow: "0 1px 4px rgba(12,12,13,0.05)",
                }}
              />
              <Bar
                dataKey="total"
                fill="#2563eb"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
