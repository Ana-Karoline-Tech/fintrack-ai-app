"use client";

import Image from 'next/image'
import bulbIcon from '@/src/assets/bulb-icon.png'
import insightsIcon from '@/src/assets/insigt-icon.png'
import starIcon from '@/src/assets/star-icon.png'
import refreshIcon from '@/src/assets/refresh-icon.png'
import { TransactionCategory } from '@prisma/client'
import { useEffect, useState, useCallback } from 'react'
import { Loader2 } from 'lucide-react'

interface CategorySummary {
    category: TransactionCategory
    totalAmount: number
    percentageOfTotal: number
}

interface AiInsightsProps {
    month: string
    year: number
    depositsTotal: number
    expensesTotal: number
    investmentsTotal: number
    balance: number
    totalExpensePerCategory: CategorySummary[]
}

interface AiResponse {
    suggestion: string
    topCategory: string | null
    topCategoryAmount: string | null
}

export const AiInsights = ({
    year,
    month,
    balance,
    depositsTotal,
    expensesTotal,
    investmentsTotal,
    totalExpensePerCategory,
}: AiInsightsProps) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [suggestion, setSuggestion] = useState<string | null>(null)
    const [topCategory, setTopCategory] = useState<string | null>(null)
    const [topCategoryAmount, setTopCategoryAmount] = useState<string | null>(
        null
    )

    const fetchInsights = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/ai-insights', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    month,
                    year,
                    depositsTotal,
                    expensesTotal,
                    investmentsTotal,
                    balance,
                    totalExpensePerCategory,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error ?? 'Erro ao carregar análise.')
                return
            }

            setSuggestion((data as AiResponse).suggestion ?? null)
            setTopCategory((data as AiResponse).topCategory ?? null)
            setTopCategoryAmount((data as AiResponse).topCategoryAmount ?? null)
        } catch (error) {
            console.error(error)
            setError('Erro ao conectar. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }, [month, year, balance, depositsTotal, expensesTotal, investmentsTotal, totalExpensePerCategory])

    useEffect(() => {
        fetchInsights()
    }, [fetchInsights])

    return (
        <section className="flex h-full flex-col rounded-[24px] border border-[#1E293B] bg-[#161B26] p-6 font-sans">
            <div className="flex items-center gap-3 mb-6">
                <Image src={starIcon} alt="" width={24} height={24} />
                <h2 className="text-xl font-bold leading-7 text-[#F1F5F9]">Insights com IA</h2>
            </div>

            <div className="flex-1 space-y-4">
                {loading ? (
                    <div className="flex flex-col items-center justify-center gap-4 min-h-[200px] bg-[#0F111A]/50 rounded-2xl border border-[#1E293B] border-dashed">
                        <Loader2 className="h-10 w-10 animate-spin text-[#9333EA]" />
                        <p className="text-sm text-[#94A3B8]">Analisando seus dados de {month}/{year}...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl">
                        <p className="text-sm text-red-400">{error}</p>
                        <button
                            type="button"
                            onClick={fetchInsights}
                            className="mt-3 text-sm font-medium text-[#9333EA] hover:underline"
                        >
                            Tentar novamente
                        </button>
                    </div>
                ) : (
                    <>
                        {topCategory && topCategoryAmount && (
                            <div className="bg-[#0F111A]/50 p-6 rounded-2xl border border-[#1E293B] flex flex-col sm:flex-row gap-4">
                                <div className="bg-[#9333EA]/10 p-3 rounded-xl h-fit w-fit shrink-0">
                                    <Image src={insightsIcon} alt="" width={24} height={24} />
                                </div>
                                <div>
                                    <p className="text-[#94A3B8] text-sm">Categoria com maior gasto</p>
                                    <p className="font-semibold text-white">
                                        {topCategory}: {topCategoryAmount}
                                    </p>
                                </div>
                            </div>
                        )}

                        {suggestion && (
                            <div className="bg-[#10B981]/5 border-[#10B981]/20 p-6 rounded-2xl border flex flex-col sm:flex-row gap-4">
                                <div className="bg-[#10B981]/10 p-3 rounded-xl h-fit w-fit shrink-0">
                                    <Image src={bulbIcon} alt="" width={24} height={24} />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-medium text-[#10B981] mb-2">Sugestão de economia</p>
                                    <div className="text-sm text-[#94A3B8] whitespace-pre-line leading-relaxed">
                                        {suggestion}
                                    </div>
                                </div>
                            </div>
                        )}

                        {!suggestion && !topCategory && (
                            <div className="text-center py-10">
                                <p className="text-[#94A3B8] text-sm">Adicione transações para receber insights.</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            <button
                type="button"
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#1E293B] py-4 text-white transition-colors hover:border-[#9333EA] hover:text-[#9333EA]"
                onClick={fetchInsights}
                disabled={loading}
            >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Image src={refreshIcon} alt="" width={24} height={24} />}
                <span>Atualizar análise</span>
            </button>
        </section>
    )
}
