"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/src/components/logout";

import logoPng from "@/src/assets/Vector.png";
import iconDashboard from "@/src/assets/Icon.png";
import iconTransacoes from "@/src/assets/trasacoes.png";
import iconSair from "@/src/assets/logout-icon.png";

const navItems = [
  { href: "/", label: "Dashboard", icon: iconDashboard },
  { href: "/transactions", label: "Transações", icon: iconTransacoes },
] as const;

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside
      className="flex w-[255px] shrink-0 flex-col self-stretch border-r border-[var(--color-card-dark)] bg-[var(--color-background-dark-header)] font-[family-name:var(--font-inter)]"
      aria-label="Menu lateral"
    >
      {/* Header: logo do Figma + FinTrack (Inter 700, 20px) */}
      <div className="flex w-[255px] items-center gap-3 px-6 py-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]">
          <Image
            src={logoPng}
            alt=""
            width={22}
            height={22}
            className="h-[22px] w-[22px] object-contain"
          />
        </div>
        <span className="text-left text-xl font-bold leading-[1.4] tracking-[-0.025em] text-[var(--color-text-primary)]">
          FinTrack
        </span>
      </div>

      {/* Nav: ícones do Figma, Inter 500 16px */}
      <nav
        className="flex flex-1 flex-col gap-2 px-4 py-4"
        aria-label="Navegação principal"
      >
        {navItems.map(({ href, label, icon }) => {
          const isActive =
            pathname === href ||
            (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 self-stretch rounded-xl px-4 py-3 text-base font-medium leading-[1.5] ${
                isActive
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-card-dark)]/50 hover:text-[var(--color-text-primary)]"
              }`}
            >
              <Image
                src={icon}
                alt=""
                width={20}
                height={28}
                className="h-5 w-5 shrink-0 object-contain"
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Divider + Sair (ícone do Figma; LogoutButton fornece a ação) */}
      <div className="w-[255px] border-t border-[var(--color-card-dark)] px-6 py-6">
        <div className="flex items-center gap-3 self-stretch rounded-xl px-4 py-3 [&_button]:w-full [&_button]:justify-start [&_button]:rounded-xl [&_button]:px-0 [&_button]:py-0 [&_button]:text-[var(--color-text-secondary)] [&_button]:hover:text-[var(--color-text-primary)] [&_button]:flex [&_button]:items-center [&_button]:gap-3 [&_button_img]:hidden">
          <Image
            src={iconSair}
            alt=""
            width={20}
            height={28}
            className="h-5 w-5 shrink-0 object-contain"
          />
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
};
