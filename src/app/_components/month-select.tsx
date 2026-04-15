interface MonthSelectProps {
  value: string;
}

export const MonthSelect = ({ value }: MonthSelectProps) => {
  return (
    <button
      type="button"
      className="flex h-9 w-[162px] items-center justify-between rounded-lg border border-[#1E293B] px-3 text-sm font-normal text-[#F1F5F9] font-sans"
      aria-label="Selecionar período"
    >
      <span>{value}</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
};
