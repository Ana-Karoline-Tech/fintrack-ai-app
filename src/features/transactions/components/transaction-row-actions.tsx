'use client'

import { useEffect, useState, useTransition } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Loader2Icon, X } from 'lucide-react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/src/components/ui/dialog'
import type {
    TransactionCategory,
    TransactionPaymentMethod,
    TransactionType,
} from '@prisma/client'
import { deleteTransaction } from '../actions/delete-transaction'
import { upsertTransaction } from '../actions/upsert-transaction'
import { upsertTransactionSchema, type UpsertTransactionData } from '../schemas'
import { TransactionFormFields } from './transaction-form-fields'

export interface TransactionRowActionData {
    id: string
    name: string
    amount: number
    type: TransactionType
    category: TransactionCategory
    paymentMethod: TransactionPaymentMethod
    date: string
}

function toDateInputValue(iso: string) {
    const d = new Date(iso)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** Trechos do SVG exportado do Figma (`transaction-actions-1.svg`) */
function IconEditFigma({ className }: { className?: string }) {
    return (
        <svg
            width={20}
            height={20}
            viewBox="26 9 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden
        >
            <path
                d="M40.116 14.5413C40.4685 14.1889 40.6665 13.711 40.6666 13.2126C40.6666 12.7142 40.4687 12.2361 40.1163 11.8837C39.7639 11.5312 39.286 11.3331 38.7876 11.3331C38.2892 11.333 37.8111 11.5309 37.4587 11.8833L28.5613 20.7827C28.4065 20.937 28.2921 21.127 28.228 21.336L27.3473 24.2373C27.3301 24.295 27.3288 24.3562 27.3436 24.4146C27.3583 24.4729 27.3886 24.5262 27.4312 24.5687C27.4738 24.6112 27.5271 24.6414 27.5854 24.656C27.6438 24.6707 27.705 24.6693 27.7627 24.652L30.6647 23.772C30.8734 23.7085 31.0634 23.5947 31.218 23.4407L40.116 14.5413Z"
                stroke="#90A1B9"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M36 13.3333L38.6667 16"
                stroke="#90A1B9"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function IconDeleteFigma({ className }: { className?: string }) {
    return (
        <svg
            width={20}
            height={20}
            viewBox="66 10 16 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden
        >
            <path
                d="M72.6667 17.3333V21.3333"
                stroke="#90A1B9"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M75.3333 17.3333V21.3333"
                stroke="#90A1B9"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M78.6666 14V23.3333C78.6666 23.687 78.5262 24.0261 78.2761 24.2761C78.0261 24.5262 77.6869 24.6667 77.3333 24.6667H70.6666C70.313 24.6667 69.9739 24.5262 69.7238 24.2761C69.4738 24.0261 69.3333 23.687 69.3333 23.3333V14"
                stroke="#90A1B9"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M68 14H80"
                stroke="#90A1B9"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M71.3333 14V12.6667C71.3333 12.313 71.4738 11.9739 71.7238 11.7239C71.9739 11.4738 72.313 11.3333 72.6666 11.3333H75.3333C75.6869 11.3333 76.0261 11.4738 76.2761 11.7239C76.5262 11.9739 76.6666 12.313 76.6666 12.6667V14"
                stroke="#90A1B9"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

interface TransactionRowActionsProps {
    transaction: TransactionRowActionData
}

export function TransactionRowActions({ transaction }: TransactionRowActionsProps) {
    const router = useRouter()
    const [editOpen, setEditOpen] = useState(false)
    const [isDeleting, startDeleteTransition] = useTransition()

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<UpsertTransactionData>({
        resolver: zodResolver(
            upsertTransactionSchema
        ) as Resolver<UpsertTransactionData>,
    })

    useEffect(() => {
        if (!editOpen) return
        reset({
            name: transaction.name,
            amount: transaction.amount,
            type: transaction.type,
            category: transaction.category,
            paymentMethod: transaction.paymentMethod,
            date: toDateInputValue(transaction.date) as unknown as Date,
        })
    }, [editOpen, transaction, reset])

    const onSubmitEdit = async (data: UpsertTransactionData) => {
        try {
            await upsertTransaction({ ...data, id: transaction.id })
            setEditOpen(false)
            router.refresh()
        } catch (e) {
            console.error(e)
        }
    }

    const handleDelete = () => {
        if (
            !window.confirm(
                'Excluir esta transação? Esta ação não pode ser desfeita.'
            )
        ) {
            return
        }
        startDeleteTransition(async () => {
            try {
                await deleteTransaction(transaction.id)
                router.refresh()
            } catch (e) {
                console.error(e)
            }
        })
    }

    return (
        <div className="ml-auto w-fit">
            <div className="flex items-center gap-1 pl-4">
                <button
                    type="button"
                    onClick={() => setEditOpen(true)}
                    className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-[#90A1B9] transition hover:bg-white/10 hover:text-[#CBD5E1]"
                    aria-label="Editar transação"
                >
                    <IconEditFigma />
                </button>
                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-[#90A1B9] transition hover:bg-white/10 hover:text-[#CBD5E1] disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Excluir transação"
                >
                    {isDeleting ? (
                        <Loader2Icon className="size-4 animate-spin" />
                    ) : (
                        <IconDeleteFigma />
                    )}
                </button>
            </div>

            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent
                    showCloseButton={false}
                    className="max-h-[90vh] w-[420px] max-w-[calc(100%-2rem)] gap-0 overflow-hidden rounded-[24px] border border-[#334155] bg-[#1E293B] p-0 font-sans text-white ring-0"
                >
                    <DialogHeader className="flex-row items-center justify-between border-b border-[#334155] px-6 py-5">
                        <DialogTitle className="text-[18px] font-semibold leading-7 tracking-normal text-[#F1F5F9]">
                            Editar transação
                        </DialogTitle>
                        <DialogClose asChild>
                            <button
                                type="button"
                                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-[#94A3B8] transition hover:bg-[#334155] hover:text-[#F1F5F9]"
                                aria-label="Fechar modal"
                            >
                                <X size={20} />
                            </button>
                        </DialogClose>
                    </DialogHeader>

                    <form
                        onSubmit={handleSubmit(onSubmitEdit)}
                        className="space-y-4 overflow-y-auto px-6 py-5"
                    >
                        <TransactionFormFields
                            register={register}
                            control={control}
                            errors={errors}
                        />

                        <div className="pt-2">
                            <div className="flex items-center gap-4">
                                <DialogClose asChild>
                                    <button
                                        type="button"
                                        className="h-[44px] flex-1 cursor-pointer rounded-xl border border-[#334155] text-[16px] font-semibold text-[#CBD5E1] transition hover:bg-[#334155]/40"
                                    >
                                        Cancelar
                                    </button>
                                </DialogClose>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex h-[44px] flex-[1.35] cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#9333EA] text-[16px] font-semibold text-white shadow-[0px_4px_6px_-4px_rgba(168,85,247,0.2),0px_10px_15px_-3px_rgba(168,85,247,0.2)] transition hover:bg-[#7c2dd2] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isSubmitting && (
                                        <Loader2Icon className="animate-spin" size={16} />
                                    )}
                                    Salvar alterações
                                </button>
                            </div>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
