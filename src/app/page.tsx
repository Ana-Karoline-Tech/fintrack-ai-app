import { Sidebar } from './_components/sidebar'
import { Header } from './_components/header'
import BalanceCard from './_components/ballance-card'
import { FinancialMetricCard } from './_components/financial-metric-card'
import pigIcon from '@/src/assets/pig-icon.png'

export default function Home() {
    return (
        <div className="flex min-h-screen bg-slate-50 font-sans">
            <Sidebar />
            <main className="flex flex-1 flex-col">
                <Header userName="João da Silva" date={new Date()} />
                <div className="flex flex-1 p-8">
                    <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[1.8fr_1fr]">
                        <BalanceCard
                            balance={12450.32}
                            receitas={15890.75}
                            despesas={3440.43}
                        />
                        <FinancialMetricCard
                            title="Economia do mês"
                            value="+12%"
                            description="Você economizou R$ 120,00 a mais que no mês passado."
                            icon={pigIcon}
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}
