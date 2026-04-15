import Image from 'next/image'
import decorativeIcon from '@/src/assets/decorative-icon.png'
import revenuesIcon from '@/src/assets/revenues-icon.png'
import expensesIcon from '@/src/assets/expenses-icon.png'

function formatBRL(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value)
}

export interface BalanceCardProps {
    balance: number
    receitas: number
    despesas: number
}

export default function BalanceCard({
    balance,
    receitas,
    despesas,
}: BalanceCardProps) {
    return (
        <section
            className="relative flex flex-col justify-between self-stretch overflow-hidden rounded-[24px] bg-[#9333EA] p-8 font-(family-name:--font-inter) shadow-[0px_8px_10px_-6px_rgba(168,85,247,0.2),0px_20px_25px_-5px_rgba(168,85,247,0.2)]"
            style={{
                width: "738.66px",
                height: "254px",
                minHeight: "240px",
            }}
            aria-label="Resumo do saldo"
        >
            <div
                className="pointer-events-none absolute rounded-full bg-white/10"
                style={{ width: 256, height: 256, top: 46, right: -80 }}
                aria-hidden
            />
            <div
                className="pointer-events-none absolute rounded-full bg-white/5"
                style={{ width: 192, height: 192, left: -48, top: -48 }}
                aria-hidden
            />
            <div
                className="pointer-events-none absolute right-8 top-8 z-0 h-16 w-16 rounded-[22px] bg-white/10 p-2 shadow-[0_10px_30px_-20px_rgba(255,255,255,0.9)]"
                aria-hidden
            >
                <Image
                    src={decorativeIcon}
                    alt=""
                    width={40}
                    height={40}
                    className="object-contain"
                />
            </div>

            <div className="relative z-10 flex flex-col gap-2">
                <span className="text-sm font-normal leading-[1.4] text-[#F3E8FF]">
                    Saldo total
                </span>
                <strong className="text-[40px] font-bold leading-[1.1] tracking-[-0.02em] text-white">
                    {formatBRL(balance)}
                </strong>
            </div>

            <div className="relative z-10 h-px w-full bg-white/20" />

            <div className="relative z-10 grid w-full grid-cols-2 gap-6">
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="flex flex-row items-center gap-2">
                        <span
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15"
                            aria-hidden
                        >
                            <Image
                                src={revenuesIcon}
                                alt="Ícone de receitas"
                                width={20}
                                height={20}
                                className="object-contain"
                            />
                        </span>
                        <span className="text-xs font-normal leading-[1.33] text-[#F3E8FF]">
                            Receitas
                        </span>
                    </div>
                    <p className="text-xl font-semibold leading-[1.4] text-white">
                        {formatBRL(receitas)}
                    </p>
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="flex flex-row items-center gap-2">
                        <span
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15"
                            aria-hidden
                        >
                            <Image
                                src={expensesIcon}
                                alt="Ícone de despesas"
                                width={20}
                                height={20}
                                className="object-contain"
                            />
                        </span>
                        <span className="text-xs font-normal leading-[1.33] text-[#F3E8FF]">
                            Despesas
                        </span>
                    </div>
                    <p className="text-xl font-semibold leading-[1.4] text-white">
                        {formatBRL(despesas)}
                    </p>
                </div>
            </div>
        </section>
    )
}
