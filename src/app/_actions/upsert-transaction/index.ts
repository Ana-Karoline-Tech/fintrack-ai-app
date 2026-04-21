"use server";

import { db } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertTransactionSchema, UpsertTransactionData } from "../../_schemas/transactions";
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
  
  await db.transaction.create({
    data: {
        ...params,
        userId: session.user.id
    },
  });

  revalidatePath("/");
  revalidatePath("/transactions");
};
