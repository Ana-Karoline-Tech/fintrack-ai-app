import Image from "next/image";

import avatarUser from "@/src/assets/avatar.png";

interface HeaderProps {
  userName: string;
  date: Date;
}

const formatToday = (date: Date) => {
  const weekday = new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(date);
  const month = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(date);
  const day = new Intl.DateTimeFormat("pt-BR", { day: "2-digit" }).format(date);

  const weekdayCapitalized = weekday.charAt(0).toUpperCase() + weekday.slice(1);

  return `${weekdayCapitalized}, ${day} de ${month}`;
};

export const Header = ({ userName, date }: HeaderProps) => {
  const firstName = userName.trim().split(" ")[0] || "usuario";
  const greeting = `Bem-vindo de volta, ${firstName}! 👋`;

  return (
    <header className="flex h-[88px] w-full items-center justify-between border-b border-(--color-card-dark) bg-(--color-background-dark-header) px-8 font-(family-name:--font-inter)">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold leading-7 text-[#F1F5F9]">{greeting}</h1>
        <p className="text-xs font-normal leading-4 text-[#94A3B8]">{formatToday(date)}</p>
      </div>

      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#334155] bg-(--color-card-dark)">
        <Image
          src={avatarUser}
          alt="Avatar do usuário"
          width={38}
          height={38}
          className="h-[38px] w-[38px] rounded-full object-cover"
        />
      </div>
    </header>
  );
};