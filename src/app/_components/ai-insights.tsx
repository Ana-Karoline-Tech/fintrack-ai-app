import Image from 'next/image'
import bulbIcon from '@/src/assets/bulb-icon.png'
import insightsIcon from '@/src/assets/insigt-icon.png'
import starIcon from '@/src/assets/star-icon.png'
import refreshIcon from '@/src/assets/refresh-icon.png'

export const AiInsights = () => {
    return (
        <section className="flex flex-col gap-6 rounded-[24px] border border-[#1E293B] bg-[#161B26] p-6">
            <div className="flex items-center gap-3">
                <Image src={starIcon} alt="Insights" width={24} height={24} />
                <h2 className="text-xl font-semibold text-white">
                    Insights com AI
                </h2>
            </div>

            <div className="flex flex-col gap-4">
                <div className="rounded-2xl border border-[#1E293B] bg-[#0F111A] p-4">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#9333EA]/10">
                            <Image
                                src={insightsIcon}
                                alt="Insight icon"
                                width={24}
                                height={24}
                            />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-400">
                                Categoria com maior gasto
                            </p>
                            <p className="text-lg font-bold text-white">
                                Alimentação: R$ 42,00
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#10B981]/5 p-6 rounded-2xl flex items-center gap-4">
                    <div className="bg-[#10B981]/20 p-4 rounded-xl">
                        <Image
                            src={bulbIcon}
                            alt="Bulb icon"
                            width={24}
                            height={24}
                        />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-white">
                            Sugestão de economia
                        </p>
                        <p className="mt-1 text-sm leading-6 text-[#CBD5E1]">
                            Para economizar em alimentação, cozinhe mais em
                            casa. Planeje as refeições e leve marmita.
                        </p>
                    </div>
                </div>
            </div>

            <button className="flex items-center justify-center gap-3 w-full border-2 border-dashed border-[#1E293B] py-4 rounded-2xl text-white transition-colors hover:border-[#9333EA] hover:text-[#9333EA]">
                <Image
                    src={refreshIcon}
                    alt="Refresh icon"
                    width={24}
                    height={24}
                />
                <span className="font-semibold">Atualizar análise</span>
            </button>
        </section>
    )
}
