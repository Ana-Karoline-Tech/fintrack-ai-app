interface ChartCardProps {
  label: string;
  value: number;
  total: number;
  color: string;
}

const getPercent = (value: number, total: number) => {
  if (total <= 0) return 0;
  return Math.round((value / total) * 100);
};

export const ChartCard = ({ label, value, total, color }: ChartCardProps) => {
  const percent = getPercent(value, total);

  return (
    <article className="flex flex-col items-center gap-1 font-sans">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} aria-hidden />
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#64748B]">
          {label}
        </span>
      </div>
      <strong className="text-xl font-bold leading-7 text-[#F1F5F9]">{percent}%</strong>
    </article>
  );
};
