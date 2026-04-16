import { TransactionCategory, TransactionType } from "@prisma/client";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { AddTransactionButton } from "@/src/components/add-transaction-button";
import { TransactionIcon } from "@/src/components/transaction-icon";
import Link from "next/link";

export interface Transaction {
  id: string;
  name: string;
  amount: number | { toNumber?: () => number };
  type: TransactionType;
  category: TransactionCategory;
  date: Date | string;
}

export default function Transactions() {

  const transactions: Transaction[] = [
    {
      id: "1",
      name: "Salário",
      amount: 8500,
      type: "DEPOSIT",
      category: "SALARY",
      date: new Date(2026, 2, 1),
    },
    {
      id: "2",
      name: "Aluguel",
      amount: 2200,
      type: "EXPENSE",
      category: "HOUSING",
      date: new Date(2026, 2, 3),
    },
    {
      id: "3",
      name: "Supermercado",
      amount: 680.9,
      type: "EXPENSE",
      category: "FOOD",
      date: new Date(2026, 2, 5),
    },
    {
      id: "4",
      name: "Freelance",
      amount: 1500,
      type: "DEPOSIT",
      category: "OTHER",
      date: new Date(2026, 2, 8),
    },
    {
      id: "5",
      name: "Academia",
      amount: 129.9,
      type: "EXPENSE",
      category: "HEALTH",
      date: new Date(2026, 2, 10),
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-xl font-bold">Transações recentes</p>
        <AddTransactionButton />
      </div>

      <div className="bg-[#161b26] rounded-3xl border border-[#1d293d] overflow-hidden">
        {transactions.map((transaction, index) => (
          <div
            key={transaction.id}
            className="p-5 flex gap-4 border-b last:border-none border-[#1d293d] hover:bg-slate-800/50 transition-colors"
          >
            <TransactionIcon type={transaction.type} />

            <div className="flex-1">
              <p>{transaction.name}</p>
              <p className="text-sm text-muted-foreground">
                {dayjs(transaction.date).format("DD [de] MMMM")} •{" "}
                {transaction.category}
              </p>
            </div>

            <span
              className={
                transaction.type === "EXPENSE"
                  ? "text-rose-500"
                  : "text-emerald-500"
              }
            >
              {transaction.type === "EXPENSE" ? "-" : "+"}
              {transaction.amount.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
        ))}
        <div className="p-4 bg-slate-800/20 text-center">
          <Link className="text-primary text-sm hover:underline" href='/transactions'>
            Ver todo o histórico
          </Link>
        </div>
      </div>
    </div>
  )
}