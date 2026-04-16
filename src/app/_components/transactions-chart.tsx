import { DonutChart } from "./donut-chart"
import { ChartCard } from "./chart-card"
import { MonthSelect } from "./month-select"

interface TransactionsChartProps {
    data: { name: string; value: number; color: string }[]
}

export const TransactionsChart = ({ data }: TransactionsChartProps) => {
    const total = data.reduce((acc, item) => acc + item.value, 0)

    return (
        <section className="flex h-full w-full flex-col rounded-[24px] border border-[#1E293B] bg-[#161B26] p-8">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold leading-7 text-[#F1F5F9]">
                    Gráficos
                </h2>
                <MonthSelect value="Este mês" />
            </div>

            <div className="mt-8 flex flex-1 flex-col items-center">
                <div className="flex items-center justify-center">
                    <DonutChart data={data} centerLabel="Geral" />
                </div>

                <div className="mt-10 grid w-full grid-cols-3 gap-4 border-t border-[#1E293B] pt-8">
                    {data.map((item) => (
                        <ChartCard
                            key={item.name}
                            label={item.name}
                            value={item.value}
                            total={total}
                            color={item.color}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
