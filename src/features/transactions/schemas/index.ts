import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { z } from "zod";

export const upsertTransactionSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  amount: z.coerce
    .number()
    .positive({
      message: "O valor deve ser positivo.",
    }),
  type: z.nativeEnum(TransactionType, {
    message: "O tipo é obrigatório.",
  }),
  category: z.nativeEnum(TransactionCategory, {
    message: "A categoria é obrigatória.",
  }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
    message: "O método de pagamento é obrigatório.",
  }),
  date: z.coerce.date({
    message: "A data é obrigatória.",
  }),
});

export type UpsertTransactionData = z.infer<typeof upsertTransactionSchema>;
