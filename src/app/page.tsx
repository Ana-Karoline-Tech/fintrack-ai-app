import { Sidebar } from '@/src/components/common/sidebar'
import { Header } from '@/src/components/common/header'
import BalanceCard from '@/src/features/dashboard/components/ballance-card'
import { FinancialMetricCard } from '@/src/features/dashboard/components/financial-metric-card'
import { TransactionsChart } from '@/src/features/dashboard/components/transactions-chart'
import { AiInsights } from '@/src/features/ai-insights/components/ai-insights'
import { Transactions } from '@/src/components/transactions'
import pigIcon from '@/src/assets/pig-icon.png'
import { db } from '@/src/lib/prisma'
import { redirect } from 'next/navigation'
import { auth } from '@/src/lib/auth'
import { headers } from 'next/headers'
import { TransactionCategory } from '@prisma/client'

interface HomeProps {
    searchParams: Promise<{
        month?: string
    }>
}

export default async function Home(props: HomeProps) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect("/sign-in")
    }

    const userId = session.user.id
    const userName = session.user.name

    const searchParams = await props.searchParams;
    const month = searchParams.month;

    if (!month) {
        redirect(`/?month=${(new Date().getMonth() + 1).toString().padStart(2, '0')}`)
    }

    const year = new Date().getFullYear()

    const transactions = await db.transaction.findMany({
        where: {
            userId,
            date: {
                gte: new Date(`${year}-${month}-01`),
                lt: new Date(`${year}-${month}-31`), 
            },
        },
        orderBy: { date: 'desc' },
        take: 10,
    })

    const monthTransactions = await db.transaction.findMany({
        where: {
            userId,
            date: {
                gte: new Date(`${year}-${month}-01`),
                lt: new Date(`${year}-${month}-31`),
            },
        },
    })

    const receitas = monthTransactions
        .filter((t) => t.type === 'DEPOSIT')
        .reduce((acc, t) => acc + Number(t.amount), 0)

    const despesas = monthTransactions
        .filter((t) => t.type === 'EXPENSE')
        .reduce((acc, t) => acc + Number(t.amount), 0)

    const investimentos = monthTransactions
        .filter((t) => t.type === 'INVESTMENT')
        .reduce((acc, t) => acc + Number(t.amount), 0)

    const balance = receitas - despesas - investimentos

    // Agrupamento por categoria para a IA
    const expensesByCategory = await db.transaction.groupBy({
        by: ['category'],
        where: {
            userId,
            type: 'EXPENSE',
            date: {
                gte: new Date(`${year}-${month}-01`),
                lt: new Date(`${year}-${month}-31`),
            },
        },
        _sum: { amount: true },
    })

    const totalExpensePerCategory = expensesByCategory.map(item => ({
        category: item.category as TransactionCategory,
        totalAmount: Number(item._sum.amount),
        percentageOfTotal: despesas > 0 ? Math.round((Number(item._sum.amount) / despesas) * 100) : 0
    }))

    const chartData = [
        { name: 'Ganhos', value: receitas, color: '#9333EA' },
        { name: 'Gastos', value: despesas, color: '#F43F5E' },
        { name: 'Invest.', value: investimentos, color: '#3B82F6' },
    ]

    return (
        <div className="flex min-h-screen bg-[#0F111A] font-sans">
            <Sidebar />
            <div className="flex flex-1 flex-col">
                <Header 
                    userName={userName} 
                    userImage={session.user.image} 
                    date={new Date()} 
                />
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
                        <AiInsights 
                            month={month}
                            year={year}
                            balance={balance}
                            depositsTotal={receitas}
                            expensesTotal={despesas}
                            investmentsTotal={investimentos}
                            totalExpensePerCategory={totalExpensePerCategory}
                        />
                    </section>

                    <Transactions transactions={transactions} />
                </main>
            </div>
        </div>
    )
}
