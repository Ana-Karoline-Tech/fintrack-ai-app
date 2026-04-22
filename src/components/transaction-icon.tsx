import { TransactionType } from "@prisma/client";
import Image from "next/image";
import revenuesIcon from "@/src/assets/revenues-icon.png";
import expensesIcon from "@/src/assets/expenses-icon.png";
import investmentIcon from "@/src/assets/pig-icon.png";

interface TransactionIconProps {
  type: TransactionType;
}

const icons = {
  [TransactionType.DEPOSIT]: {
    src: revenuesIcon,
    bg: "bg-white/10",
    alt: "Depósito",
  },
  [TransactionType.EXPENSE]: {
    src: expensesIcon,
    bg: "bg-white/10",
    alt: "Despesa",
  },
  [TransactionType.INVESTMENT]: {
    src: investmentIcon,
    bg: "bg-white/10",
    alt: "Investimento",
  },
};

export function TransactionIcon({ type }: TransactionIconProps) {
  const icon = icons[type];

  return (
    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${icon.bg}`}>
      <Image src={icon.src} alt={icon.alt} width={24} height={24} />
    </div>
  );
}
