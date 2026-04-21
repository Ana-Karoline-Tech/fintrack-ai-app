import Image from "next/image";

import bulbIcon from "@/src/assets/bulb-icon.png";
import insightsIcon from "@/src/assets/insigt-icon.png";

type InsightItem = {
  id: string;
  title: string;
  description: string;
  icon: "chart" | "bulb";
  accentClass: string;
  iconBgClass: string;
};

const INSIGHTS: InsightItem[] = [
  {
    id: "1",
    title: "Categoria com maior gasto",
    description: "Alimentação: R$ 42,00",
    icon: "chart",
    accentClass: "bg-[#1E293B]/20 border-[#1E293B]",
    iconBgClass: "bg-[#9333EA]/10",
  },
  {
    id: "2",
    title: "Sugestão de economia",
    description: "Para economizar em alimentação, cozinhe mais em casa.",
    icon: "bulb",
    accentClass: "bg-[#10B981]/5 border-[#10B981]/20",
    iconBgClass: "bg-[#10B981]/20",
  },
];

export const InsightsList = () => {
  return (
    <div className="flex flex-col gap-[12px]">
      {INSIGHTS.map((item) => (
        <article
          key={item.id}
          className={`rounded-2xl border p-4 font-sans ${item.accentClass}`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.iconBgClass}`}
            >
              <Image
                src={item.icon === "chart" ? insightsIcon : bulbIcon}
                alt=""
                width={24}
                height={24}
                aria-hidden
              />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold leading-5 text-[#F1F5F9]">{item.title}</p>
              <p className="mt-1 text-sm leading-5 text-[#94A3B8]">{item.description}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};
