import { Header } from "@/src/components/common/header";
import { Sidebar } from "@/src/components/common/sidebar";
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
  TRANSACTION_TYPE_LABELS,
} from "@/src/features/transactions/constants";
import { TransactionPaymentMethod } from "@prisma/client";
import { auth } from "@/src/lib/auth";
import { db } from "@/src/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import actionIcons from "@/src/assets/figma/transaction-actions-1.svg";
import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const typeBadgeStyles = {
  DEPOSIT: "bg-[rgba(0,188,125,0.2)] text-[#00D492]",
  EXPENSE: "bg-[rgba(251,44,54,0.2)] text-[#FF6467]",
  INVESTMENT: "bg-[rgba(43,127,255,0.2)] text-[#51A2FF]",
} as const;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function getPaymentMethodLabel(paymentMethod: TransactionPaymentMethod) {
  if (paymentMethod === "BOLETO") {
    return "Boleto";
  }

  return TRANSACTION_PAYMENT_METHOD_LABELS[paymentMethod];
}

export default async function TransactionsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: { date: "desc" },
  });

  return (
    <div className="flex min-h-screen bg-[#0F111A] font-sans">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header
          userName={session.user.name}
          userImage={session.user.image}
          date={new Date()}
        />
        <main className="space-y-6 p-8 font-(family-name:--font-inter)">
          <section className="space-y-1">
            <h1 className="text-3xl font-bold leading-9 tracking-[-0.025em] text-white">
              Transacoes
            </h1>
            <p className="text-sm font-normal leading-5 text-[#90A1B9]">
              Gerencie suas entradas, despesas e investimentos
            </p>
          </section>

          <section className="overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.1)] bg-[rgba(30,41,59,0.8)] shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.2),0px_20px_25px_-5px_rgba(0,0,0,0.2)]">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.06)]">
                  <TableHead className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.05em] text-[#CAD5E2]">
                    Nome
                  </TableHead>
                  <TableHead className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.05em] text-[#94A3B8]">
                    Categoria
                  </TableHead>
                  <TableHead className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.05em] text-[#94A3B8]">
                    Metodo
                  </TableHead>
                  <TableHead className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.05em] text-[#94A3B8]">
                    Tipo
                  </TableHead>
                  <TableHead className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.05em] text-[#94A3B8]">
                    Data
                  </TableHead>
                  <TableHead className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-[0.05em] text-[#94A3B8]">
                    Valor
                  </TableHead>
                  <TableHead className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-[0.05em] text-[#94A3B8]">
                    Acoes
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    className="border-b border-[rgba(255,255,255,0.05)] hover:bg-white/5"
                  >
                    <TableCell className="px-4 py-6 text-sm font-medium text-white">
                      {transaction.name}
                    </TableCell>
                    <TableCell className="px-4 py-6 text-sm text-[#CAD5E2]">
                      {TRANSACTION_CATEGORY_LABELS[transaction.category]}
                    </TableCell>
                    <TableCell className="px-4 py-6 text-sm text-[#90A1B9]">
                      {getPaymentMethodLabel(transaction.paymentMethod)}
                    </TableCell>
                    <TableCell className="px-4 py-6">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium leading-4 ${
                          typeBadgeStyles[transaction.type]
                        }`}
                      >
                        {TRANSACTION_TYPE_LABELS[transaction.type]}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-6 text-sm text-[#90A1B9]">
                      {new Intl.DateTimeFormat("pt-BR").format(transaction.date)}
                    </TableCell>
                    <TableCell className="px-4 py-6 text-right text-sm font-semibold text-[#CAD5E2]">
                      {formatCurrency(Number(transaction.amount))}
                    </TableCell>
                    <TableCell className="px-4 py-6">
                      <div className="ml-auto w-fit">
                        <Image
                          src={actionIcons}
                          alt="Acoes da transacao"
                          width={92}
                          height={36}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {transactions.length === 0 && (
                  <TableRow className="hover:bg-transparent">
                    <TableCell
                      colSpan={7}
                      className="px-4 py-12 text-center text-sm text-[#90A1B9]"
                    >
                      Nenhuma transacao encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </section>
        </main>
      </div>
    </div>
  );
}
