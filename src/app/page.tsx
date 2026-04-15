import { Sidebar } from './_components/sidebar'
import { Header } from './_components/header'
import BalanceCard from './_components/ballance-card'
import { FinancialMetricCard } from './_components/financial-metric-card'
import { MonthSelect } from './_components/month-select'
import { DonutChart } from './_components/donut-chart'
import { ChartCard } from './_components/chart-card'
import pigIcon from '@/src/assets/pig-icon.png'

export default function Home() {
  const chartData = [
    { name: 'Ganhos', value: 7000, color: '#9333EA' },
    { name: 'Gastos', value: 1800, color: '#F43F5E' },
    { name: 'Invest.', value: 1200, color: '#3B82F6' },
  ]
  const chartTotal = chartData.reduce((total, item) => total + item.value, 0)

  return (
    <div className="flex min-h-screen bg-[#0F111A] font-sans">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header userName="João da Silva" date={new Date()} />
        <main className="space-y-8 p-8">
          <section className="flex w-full flex-col gap-2 lg:flex-row">
            <div className="w-full lg:flex-[2.067]">
              <BalanceCard balance={12450.32} receitas={15890.75} despesas={3440.43} />
            </div>
            <div className="w-full lg:max-w-[357px] lg:flex-1">
              <FinancialMetricCard
                title="Economia do mês"
                value="+12%"
                description="Você economizou R$ 120,00 a mais que no mês passado."
                icon={pigIcon}
              />
            </div>
          </section>

          <section className="w-full rounded-3xl border border-[#1E293B] bg-[#161B26] p-8 font-sans">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold leading-7 text-[#F1F5F9]">Gráficos</h2>
              <MonthSelect value="Este mês" />
            </div>

            <div className="mt-8 flex flex-col items-center">
              <DonutChart data={chartData} centerLabel="Geral" />

              <div className="mt-10 grid w-full grid-cols-1 gap-4 border-t border-[#1E293B] pt-8 sm:grid-cols-3 sm:gap-4">
                {chartData.map((item) => (
                  <ChartCard
                    key={item.name}
                    label={item.name}
                    value={item.value}
                    total={chartTotal}
                    color={item.color}
                  />
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
