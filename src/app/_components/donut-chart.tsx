"use client";

import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";

interface DonutChartItem {
  name: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DonutChartItem[];
  centerLabel: string;
}

const getTotal = (items: DonutChartItem[]) => items.reduce((acc, item) => acc + item.value, 0);

const getCenterPercent = (items: DonutChartItem[]) => {
  const total = getTotal(items);
  if (total <= 0) return 0;
  const highestValue = Math.max(...items.map((item) => item.value));
  return Math.round((highestValue / total) * 100);
};

export const DonutChart = ({ data, centerLabel }: DonutChartProps) => {
  const centerPercent = getCenterPercent(data);

  return (
    <div className="relative h-[200px] w-[200px] font-sans">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={64}
            outerRadius={92}
            paddingAngle={2}
            stroke="none"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#64748B]">
          {centerLabel}
        </span>
        <strong className="text-[30px] font-black leading-9 text-[#F1F5F9]">{centerPercent}%</strong>
      </div>
    </div>
  );
};
