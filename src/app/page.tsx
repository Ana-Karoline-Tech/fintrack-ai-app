import { Sidebar } from './_components/sidebar'
import { Header } from './_components/header'
import BalanceCard from './_components/ballance-card'
import { FinancialMetricCard } from './_components/financial-metric-card'
import { TransactionsChart } from './_components/transactions-chart'
import { AiInsights } from './_components/ai-insights'
import { Transactions } from '@/src/components/transactions'
import pigIcon from '@/src/assets/pig-icon.png'

export default function Home() {
    const chartData = [
        { name: 'Ganhos', value: 7000, color: '#9333EA' },
        { name: 'Gastos', value: 1800, color: '#F43F5E' },
        { name: 'Invest.', value: 1200, color: '#3B82F6' },
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
                                balance={12450.32}
                                receitas={15890.75}
                                despesas={3440.43}
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

                    <Transactions />
                </main>
            </div>
        </div>
    )
}
