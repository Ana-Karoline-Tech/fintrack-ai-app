"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/src/components/logout";
import { useState, useEffect } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

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
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Fecha a sidebar automaticamente ao mudar de rota em telas menores
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };
    handleResize(); // Executa ao montar
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pathname]);

  return (
    <>
      {/* 
          ESPAÇADOR (Desktop apenas): 
          Ele empurra o conteúdo apenas em telas grandes (md+). 
          No mobile, a sidebar flutua, então o espaçador tem apenas a largura da barra fechada.
      */}
      <div 
        className={`shrink-0 transition-all duration-500 ease-in-out ${
          isCollapsed ? "w-16 md:w-[80px]" : "w-16 md:w-[280px]"
        }`} 
      />

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full flex-col border-r border-white/10 font-sans transition-all duration-500 ease-in-out ${
          isCollapsed 
            ? "w-16 md:w-[80px] bg-[#0F111A]" 
            : "w-[280px] bg-[#161B26]/95 backdrop-blur-xl shadow-2xl shadow-black/50"
        }`}
        aria-label="Menu lateral"
      >
        {/* Header: Logo */}
        <div className="flex flex-col gap-4 px-3 md:px-6 py-6">
          <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--color-primary) shadow-lg shadow-violet-500/20">
              <Image
                src={logoPng}
                alt="Logo FinTrack"
                width={22}
                height={22}
                className="h-[22px] w-[22px] object-contain"
              />
            </div>
            {!isCollapsed && (
              <span className="text-left text-xl font-bold leading-[1.4] tracking-[-0.025em] text-white">
                FinTrack
              </span>
            )}
          </div>

          {/* Botão de alternar */}
          <div className={`flex ${isCollapsed ? "justify-center" : "justify-start pl-1"}`}>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
              title={isCollapsed ? "Expandir menu" : "Recolher menu"}
            >
              {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            </button>
          </div>
        </div>

        {/* Nav: Ícones sempre visíveis e clicáveis */}
        <nav
          className="flex flex-1 flex-col gap-2 px-2 md:px-4 py-4"
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
                onClick={() => {
                   if (window.innerWidth < 768) setIsCollapsed(true);
                }}
                className={`flex items-center gap-3 self-stretch rounded-xl px-4 py-3 text-base font-medium leading-normal transition-all ${
                  isActive
                    ? "bg-[#8B5CF6] text-white shadow-lg shadow-violet-500/25"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                } ${isCollapsed ? "justify-center" : ""}`}
                title={isCollapsed ? label : ""}
              >
                <Image
                  src={icon}
                  alt=""
                  width={20}
                  height={28}
                  className="h-5 w-5 shrink-0 object-contain"
                />
                {!isCollapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer: Sair */}
        <div className={`border-t border-white/5 py-6 ${isCollapsed ? "px-1 md:px-2" : "px-4"}`}>
          <LogoutButton
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-zinc-400 transition-all hover:bg-red-500/10 hover:text-red-400 ${isCollapsed ? "justify-center" : ""}`}
          >
            <Image
              src={iconSair}
              alt=""
              width={20}
              height={28}
              className="h-5 w-5 shrink-0 object-contain"
            />
            {!isCollapsed && <span>Sair</span>}
          </LogoutButton>
        </div>
      </aside>

      {/* Overlay (MOBILE APENAS): Escurece o fundo e permite fechar ao clicar fora */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] md:hidden" 
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  );
};

