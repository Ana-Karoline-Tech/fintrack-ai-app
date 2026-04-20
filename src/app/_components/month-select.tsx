"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { MONTH_OPTIONS } from "../_constants/months";

export const MonthSelect = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const month = searchParams.get("month");

  const handleMonthChange = (month: string) => {
    push(`/?month=${month}`);
  };

  return (
    <Select
      onValueChange={(value) => handleMonthChange(value)}
      defaultValue={month ?? ""}
    >
      <SelectTrigger className="h-9 w-[162px] rounded-lg border border-[#1E293B] px-3 text-sm font-normal text-[#F1F5F9] font-sans bg-transparent">
        <SelectValue placeholder="Mês" />
      </SelectTrigger>
      <SelectContent className="bg-[#1E293B] border-[#334155] text-white">
        {MONTH_OPTIONS.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="focus:bg-[#334155] focus:text-white"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
