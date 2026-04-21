"use server";

import { db } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertTransactionSchema, UpsertTransactionData } from "../schemas";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";

export const upsertTransaction = async (params: UpsertTransactionData) => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  upsertTransactionSchema.parse(params);

  const { id, ...data } = params;

  if (id) {
    const existing = await db.transaction.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!existing) {
      throw new Error("Transação não encontrada");
    }

    await db.transaction.update({
      where: { id },
      data,
    });
  } else {
    await db.transaction.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/transactions");
};
