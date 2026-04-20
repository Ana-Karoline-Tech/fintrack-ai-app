"use server";

import { db } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertTransactionSchema, UpsertTransactionData } from "../../_schemas/transactions";

export const upsertTransaction = async (params: UpsertTransactionData) => {
  upsertTransactionSchema.parse(params);
  await db.transaction.create({
    data: params,
  });
  revalidatePath("/");
  revalidatePath("/transactions");
};
