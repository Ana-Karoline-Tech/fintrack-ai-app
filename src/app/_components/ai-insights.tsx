import Image from "next/image";

import starIcon from "@/src/assets/star-icon.png";
import refreshIcon from "@/src/assets/refresh-icon.png";
import { InsightsList } from "./insights-list";

export const AiInsights = () => {
  return (
    <section className="flex h-full flex-col rounded-[24px] border border-[#1E293B] bg-[#161B26] p-6 font-sans">
      <div className="flex items-center gap-3">
        <Image src={starIcon} alt="" width={24} height={24} aria-hidden />
        <h2 className="text-xl font-bold leading-7 text-[#F1F5F9]">Insights com IA</h2>
      </div>

      <div className="mt-6">
        <InsightsList />
      </div>

      <button
        type="button"
        className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#1E293B] py-4 text-white transition-colors hover:border-[#9333EA] hover:text-[#9333EA]"
      >
        <Image src={refreshIcon} alt="" width={24} height={24} aria-hidden />
        Atualizar análise
      </button>
    </section>
  );
};
