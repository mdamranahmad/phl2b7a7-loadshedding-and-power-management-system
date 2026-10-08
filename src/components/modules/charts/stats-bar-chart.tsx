"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface IChartData {
  label: string;
  value: number;
}

interface IStatsBarChartProps {
  data: IChartData[];
  height?: number;
  color?: string;
}

/** Simple responsive bar chart for analytics stat breakdowns. */
const StatsBarChart = ({
  data,
  height = 280,
  color = "var(--chart-1)",
}: IStatsBarChartProps) => {
  return (
    <div style={{ height, width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-border"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11 }}
            interval={0}
            angle={-25}
            textAnchor="end"
            height={60}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: "var(--muted)" }}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid var(--border)",
              fontSize: 12,
            }}
          />
          <Bar
            dataKey="value"
            fill={color}
            radius={[6, 6, 0, 0]}
            maxBarSize={48}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsBarChart;
