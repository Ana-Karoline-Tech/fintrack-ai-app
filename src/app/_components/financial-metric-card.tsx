import Image, { StaticImageData } from 'next/image'

interface FinancialMetricCardProps {
    title: string
    value: string
    description?: string
    icon: StaticImageData
}

export const FinancialMetricCard = ({
  title,
  value,
  description,
  icon,
}: FinancialMetricCardProps) => {
  return (
    <article className="flex h-[254px] w-full flex-col items-center justify-center gap-6 rounded-[24px] border border-slate-800 bg-slate-950/95 p-6 text-center shadow-[0_25px_80px_-50px_rgba(15,23,42,0.8)]">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 shadow-sm">
        <Image
          src={icon}
          alt={title}
          width={28}
          height={28}
          className="object-contain"
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-sm font-semibold tracking-[0.02em] text-slate-100">
          {title}
        </h2>
        <p className="text-3xl font-semibold leading-tight text-emerald-400">
          {value}
        </p>
        {description ? (
          <p className="max-w-[260px] text-sm leading-[1.6] text-slate-400">
            {description}
          </p>
        ) : null}
      </div>
    </article>
  );
};
