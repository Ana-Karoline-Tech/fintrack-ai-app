import { Sidebar } from './_components/sidebar'
import { Header } from './_components/header'
import BalanceCard from './_components/ballance-card'
import { FinancialMetricCard } from './_components/financial-metric-card'
import { TransactionsChart } from './_components/transactions-chart'
import { AiInsights } from './_components/ai-insights'
import { Transactions } from '@/src/components/transactions'
import pigIcon from '@/src/assets/pig-icon.png'
import { db } from '../lib/prisma'

export default async function Home() {
    // 1. Buscar transações recentes
    const transactions = await db.transaction.findMany({
        orderBy: { date: 'desc' },
        take: 10,
    })

    // 2. Buscar todas as transações para calcular métricas
    // (Em um app real, você filtraria pelo mês selecionado)
    const allTransactions = await db.transaction.findMany()

    const receitas = allTransactions
        .filter((t) => t.type === 'DEPOSIT')
        .reduce((acc, t) => acc + Number(t.amount), 0)

    const despesas = allTransactions
        .filter((t) => t.type === 'EXPENSE')
        .reduce((acc, t) => acc + Number(t.amount), 0)

    const investimentos = allTransactions
        .filter((t) => t.type === 'INVESTMENT')
        .reduce((acc, t) => acc + Number(t.amount), 0)

    const balance = receitas - despesas - investimentos

    const chartData = [
        { name: 'Ganhos', value: receitas, color: '#9333EA' },
        { name: 'Gastos', value: despesas, color: '#F43F5E' },
        { name: 'Invest.', value: investimentos, color: '#3B82F6' },
    ]

    return (
        <div className="flex min-h-screen bg-[#0F111A] font-sans">
            <Sidebar />
            <div className="flex flex-1 flex-col">
                <Header userName="João da Silva" date={new Date()} />
                <main className="space-y-8 p-8">
                    <section className="grid lg:grid-cols-3 grid-cols-1 gap-6">
                        <div className="lg:col-span-2 col-span-1">
                            <BalanceCard
                                balance={balance}
                                receitas={receitas}
                                despesas={despesas}
                            />
                        </div>
                        <FinancialMetricCard
                            title="Economia do mês"
                            value="+12%"
                            description="Você economizou R$ 120,00 a mais que no mês passado."
                            icon={pigIcon}
                        />
                    </section>

                    <section className="grid lg:grid-cols-[1.45fr_1fr] grid-cols-1 gap-6">
                        <TransactionsChart data={chartData} />
                        <AiInsights />
                    </section>

                    <Transactions transactions={transactions} />
                </main>
            </div>
        </div>
    )
}
