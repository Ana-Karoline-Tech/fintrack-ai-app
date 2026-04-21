"use server";

import { auth } from "@/src/lib/auth";
import { db } from "@/src/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function deleteTransaction(transactionId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  const result = await db.transaction.deleteMany({
    where: {
      id: transactionId,
      userId: session.user.id,
    },
  });

  if (result.count === 0) {
    throw new Error("Transação não encontrada");
  }

  revalidatePath("/");
  revalidatePath("/transactions");
}
