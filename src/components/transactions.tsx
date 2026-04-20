import Link from 'next/link'
import { AddTransactionButton } from '@/src/app/_components/add-transaction-button'
import { Transaction, TransactionCategory } from '@prisma/client'
import { TRANSACTION_CATEGORY_LABELS } from '../app/_constants/transaction'

export type TransactionWithFormattedData = Transaction

interface TransactionsProps {
    transactions: Transaction[]
}

const CATEGORY_ICONS = {
    [TransactionCategory.FOOD]: { emoji: '🍔', bg: 'bg-[rgba(249,115,22,0.1)]' },
    [TransactionCategory.SALARY]: { emoji: '💰', bg: 'bg-[rgba(16,185,129,0.1)]' },
    [TransactionCategory.ENTERTAINMENT]: { emoji: '📺', bg: 'bg-[rgba(99,102,241,0.1)]' },
    [TransactionCategory.HEALTH]: { emoji: '🏥', bg: 'bg-[rgba(244,63,94,0.1)]' },
    [TransactionCategory.HOUSING]: { emoji: '🏠', bg: 'bg-[rgba(59,130,246,0.1)]' },
    [TransactionCategory.TRANSPORTATION]: { emoji: '🚗', bg: 'bg-[rgba(107,114,128,0.1)]' },
    [TransactionCategory.EDUCATION]: { emoji: '📚', bg: 'bg-[rgba(139,92,246,0.1)]' },
    [TransactionCategory.UTILITY]: { emoji: '💡', bg: 'bg-[rgba(234,179,8,0.1)]' },
    [TransactionCategory.OTHER]: { emoji: '📦', bg: 'bg-[rgba(100,116,139,0.1)]' },
}

function formatBRL(value: number): string {
    const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(Math.abs(value))
    return formatted
}

export function Transactions({ transactions }: TransactionsProps) {
    return (
        <section className="flex w-full flex-col gap-6 font-sans">
            <div className="flex flex-row items-center justify-between gap-4">
                <h2 className="text-xl font-bold leading-7 text-[#F1F5F9]">
                    Transações recentes
                </h2>
                <AddTransactionButton />
            </div>

            <div className="overflow-hidden rounded-3xl border border-[#1E293B] bg-[#161B26]">
                {transactions.length === 0 && (
                    <div className="p-10 text-center text-[#64748B]">
                        Nenhuma transação encontrada.
                    </div>
                )}
                {transactions.map((tx, index) => {
                    const categoryIcon = CATEGORY_ICONS[tx.category] || CATEGORY_ICONS.OTHER
                    return (
                        <div
                            key={tx.id}
                            className={`flex flex-row items-center justify-between gap-4 px-5 py-5 ${
                                index > 0 ? 'border-t border-[#1E293B]' : ''
                            }`}
                        >
                            <div className="flex min-w-0 flex-row items-center gap-4">
                                <div
                                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                                        categoryIcon.bg
                                    }`}
                                    aria-hidden
                                >
                                    <span className="text-[30px] leading-none">
                                        {categoryIcon.emoji}
                                    </span>
                                </div>
                                <div className="flex min-w-0 flex-col gap-0.5">
                                    <p className="text-base font-bold leading-6 text-[#F1F5F9]">
                                        {tx.name}
                                    </p>
                                    <p className="text-xs font-normal leading-[1.33] text-[#64748B]">
                                        {new Date(tx.date).toLocaleDateString('pt-BR', {
                                            day: '2-digit',
                                            month: 'long',
                                        })} • {TRANSACTION_CATEGORY_LABELS[tx.category]}
                                    </p>
                                </div>
                            </div>
                            <p
                                className={`shrink-0 text-lg font-bold leading-7 ${
                                    tx.type === 'DEPOSIT'
                                        ? 'text-[#10B981]'
                                        : 'text-[#F43F5E]'
                                }`}
                            >
                                {tx.type === 'DEPOSIT' ? '+' : '-'}
                                {formatBRL(Number(tx.amount))}
                            </p>
                        </div>
                    )
                })}

                <div className="flex w-full justify-center bg-[rgba(30,41,59,0.2)] px-4 pb-[17px] pt-[18.5px]">
                    <Link
                        href="/transactions"
                        className="text-center text-sm font-semibold leading-5 text-[#9333EA] transition hover:text-[#a855f7]"
                    >
                        Ver todo o histórico
                    </Link>
                </div>
            </div>
        </section>
    )
}
