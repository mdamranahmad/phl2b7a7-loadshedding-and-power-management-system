"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export interface IPieChartData {
  label: string;
  value: number;
}

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

interface IStatusDonutChartProps {
  data: IPieChartData[];
  height?: number;
}

/** Donut chart for status distributions (tokens, issues, ...). */
const StatusDonutChart = ({ data, height = 280 }: IStatusDonutChartProps) => {
  return (
    <div style={{ height, width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.label}-${index}`}
                fill={CHART_COLORS[index % CHART_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid var(--border)",
              fontSize: 12,
            }}
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusDonutChart;
