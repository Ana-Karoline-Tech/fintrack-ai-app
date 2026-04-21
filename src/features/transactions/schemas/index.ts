import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { z } from "zod";

export const upsertTransactionSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  amount: z.coerce
    .number()
    .positive({
      message: "O valor deve ser positivo.",
    }),
  type: z.nativeEnum(TransactionType, {
    errorMap: () => ({ message: "O tipo é obrigatório." }),
  }),
  category: z.nativeEnum(TransactionCategory, {
    errorMap: () => ({ message: "A categoria é obrigatória." }),
  }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
    errorMap: () => ({ message: "O método de pagamento é obrigatório." }),
  }),
  date: z.coerce.date({
    errorMap: () => ({ message: "A data é obrigatória." }),
  }),
});

export type UpsertTransactionData = z.infer<typeof upsertTransactionSchema>;
