import {
    TRANSACTION_CATEGORY_LABELS,
    TRANSACTION_PAYMENT_METHOD_LABELS,
} from '@/src/features/transactions/constants'
import { TransactionCategory, TransactionPaymentMethod } from '@prisma/client'

export function formatTransactionBRL(
    amount: number,
    options?: { absolute?: boolean }
): string {
    const value = options?.absolute ? Math.abs(amount) : amount
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value)
}

export function getTransactionCategoryLabel(
    category: TransactionCategory
): string {
    return TRANSACTION_CATEGORY_LABELS[category]
}

export function getTransactionPaymentMethodLabel(
    paymentMethod: TransactionPaymentMethod
): string {
    if (paymentMethod === 'BOLETO') {
        return 'Boleto'
    }
    return TRANSACTION_PAYMENT_METHOD_LABELS[paymentMethod]
}
