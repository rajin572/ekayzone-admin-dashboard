import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { IEarningOverviewPoint } from "@/types";

interface EarningOverviewBarChartProps {
  data: IEarningOverviewPoint[];
  height?: number;
}

const EarningOverviewBarChart = ({ data, height = 260 }: EarningOverviewBarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -18 }} barCategoryGap="28%">
        <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F1" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          domain={[0, 1000]}
          ticks={[0, 200, 400, 600, 800, 1000]}
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          cursor={{ fill: "rgba(16, 185, 129, 0.06)" }}
          contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #e5e7eb" }}
        />
        <Bar dataKey="earnings" name="Earnings" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={28} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EarningOverviewBarChart;
