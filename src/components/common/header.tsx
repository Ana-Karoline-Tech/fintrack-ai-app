import Image from "next/image";
import avatarUser from "@/src/assets/avatar.png";
import { MonthSelect } from "@/src/components/common/month-select";

interface HeaderProps {
  userName: string;
  userImage?: string | null;
  date: Date;
}

const formatToday = (date: Date) => {
  const weekday = new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(date);
  const month = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(date);
  const day = new Intl.DateTimeFormat("pt-BR", { day: "2-digit" }).format(date);

  const weekdayCapitalized = weekday.charAt(0).toUpperCase() + weekday.slice(1);

  return `${weekdayCapitalized}, ${day} de ${month}`;
};

export const Header = ({ userName, userImage, date }: HeaderProps) => {
  const firstName = userName.trim().split(" ")[0] || "usuario";
  const greeting = `Bem-vindo de volta, ${firstName}! 👋`;

  return (
    <header className="flex h-[88px] w-full items-center justify-between border-b border-[#1E293B] bg-[#0F111A] px-4 font-sans md:px-8">
      <div className="flex flex-col">
        <h1 className="text-sm font-semibold leading-7 text-[#F1F5F9] sm:text-base md:text-lg">
          {greeting}
        </h1>
        <p className="text-[10px] font-normal leading-4 text-[#94A3B8] sm:text-xs">
          {formatToday(date)}
        </p>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <MonthSelect />
        <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-[#334155] bg-[#1E293B] md:h-10 md:w-10">
          <Image
            src={userImage || avatarUser}
            alt="Avatar do usuário"
            width={38}
            height={38}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};
