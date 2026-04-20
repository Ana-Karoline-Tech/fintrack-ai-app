'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
    DialogClose,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/src/components/ui/dialog'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/src/components/ui/select'
import { X, Loader2Icon } from 'lucide-react'
import {
    TRANSACTION_CATEGORY_OPTIONS,
    TRANSACTION_PAYMENT_METHOD_OPTIONS,
    TRANSACTION_TYPE_OPTIONS,
} from '../_constants/transaction'
import {
    TransactionCategory,
    TransactionPaymentMethod,
    TransactionType,
} from '@prisma/client'
import { upsertTransaction } from '../_actions/upsert-transaction'
import { UpsertTransactionData, upsertTransactionSchema } from '../_schemas/transactions'

/** Ícone “+” exportado do Figma (Button > Container, node 2:204) */
function IconAddFigma() {
    return (
        <svg
            width={20}
            height={20}
            viewBox="0 0 20 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
            aria-hidden
        >
            <path
                d="M15 14.8203H10.8203V19C10.8203 19.4688 10.4688 19.8203 10 19.8203C9.53125 19.8203 9.17969 19.4688 9.17969 19V14.8203H5C4.53125 14.8203 4.17969 14.4688 4.17969 14C4.17969 13.5312 4.53125 13.1797 5 13.1797H9.17969V9C9.17969 8.53125 9.53125 8.17969 10 8.17969C10.4688 8.17969 10.8203 8.53125 10.8203 9V13.1797H15C15.4688 13.1797 15.8203 13.5312 15.8203 14C15.8203 14.4688 15.4688 14.8203 15 14.8203Z"
                fill="white"
            />
        </svg>
    )
}

export const AddTransactionButton = () => {
    const [open, setIsOpen] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<UpsertTransactionData>({
        resolver: zodResolver(upsertTransactionSchema),
        defaultValues: {
            name: '',
            amount: 0,
            date: new Date(),
        },
    })

    const onSubmit = async (data: UpsertTransactionData) => {
        try {
            await upsertTransaction(data)
            reset()
            setIsOpen(false)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button
                    type="button"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#9333EA] px-5 py-2.5 text-base font-bold leading-6 text-white shadow-[0px_4px_6px_-4px_rgba(168,85,247,0.2),0px_10px_15px_-3px_rgba(168,85,247,0.2)] transition hover:bg-[#7c2dd2]"
                >
                    <IconAddFigma />
                    Adicionar
                </button>
            </DialogTrigger>

            <DialogContent
                showCloseButton={false}
                className="w-[420px] max-w-[calc(100%-2rem)] gap-0 overflow-hidden rounded-[24px] border border-[#334155] bg-[#1E293B] p-0 font-sans text-white ring-0 max-h-[90vh]"
            >
                <DialogHeader className="flex-row items-center justify-between border-b border-[#334155] px-6 py-5">
                    <DialogTitle className="text-[18px] font-semibold leading-7 tracking-normal text-[#F1F5F9]">
                        Nova transação
                    </DialogTitle>
                    <DialogClose asChild>
                        <button
                            type="button"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#94A3B8] transition hover:bg-[#334155] hover:text-[#F1F5F9]"
                            aria-label="Fechar modal"
                        >
                            <X size={20} />
                        </button>
                    </DialogClose>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 overflow-y-auto px-6 py-5"
                >
                    <div className="space-y-2">
                        <Label className="text-[14px] font-medium leading-[14px] tracking-normal text-[#CBD5E1]">
                            Título
                        </Label>
                        <Input
                            {...register('name')}
                            placeholder="Ex: Almoço, Freela..."
                            className="h-[44px] rounded-full border-[#334155] bg-[#334155] px-4 text-[14px] text-[#F1F5F9] placeholder:text-[#64748B] focus-visible:border-[#64748B] focus-visible:ring-0"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[14px] font-medium leading-[14px] tracking-normal text-[#CBD5E1]">
                            Valor (R$)
                        </Label>
                        <Input
                            id="amount"
                            type="number"
                            {...register('amount', { valueAsNumber: true })}
                            placeholder="0,00"
                            inputMode="decimal"
                            className="h-[44px] rounded-full border-[#334155] bg-[#334155] px-4 text-[14px] text-[#F1F5F9] placeholder:text-[#64748B] focus-visible:border-[#64748B] focus-visible:ring-0"
                        />
                        {errors.amount && (
                            <p className="text-red-500 text-sm">
                                {errors.amount.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[14px] font-medium leading-[14px] tracking-normal text-[#CBD5E1]">
                            Tipo
                        </Label>
                        <Controller
                            name="type"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="h-[44px] w-full rounded-full border-[#334155] bg-[#334155] px-4 text-[14px] text-[#CBD5E1] [&_svg]:text-[#94A3B8]">
                                        <SelectValue placeholder="Selecione o tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {TRANSACTION_TYPE_OPTIONS.map(
                                            (option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.type && (
                            <p className="text-red-500 text-sm">
                                {errors.type.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[14px] font-medium leading-[14px] tracking-normal text-[#CBD5E1]">
                            Categoria
                        </Label>
                        <Controller
                            name="category"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="h-[44px] w-full rounded-full border-[#334155] bg-[#334155] px-4 text-[14px] text-[#CBD5E1] [&_svg]:text-[#94A3B8]">
                                        <SelectValue placeholder="Selecione a categoria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {TRANSACTION_CATEGORY_OPTIONS.map(
                                            (option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.category && (
                            <p className="text-red-500 text-sm">
                                {errors.category.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[14px] font-medium leading-[14px] tracking-normal text-[#CBD5E1]">
                            Método de pagamento
                        </Label>
                        <Controller
                            name="paymentMethod"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="h-[44px] w-full rounded-full border-[#334155] bg-[#334155] px-4 text-[14px] text-[#CBD5E1] [&_svg]:text-[#94A3B8]">
                                        <SelectValue placeholder="Selecione o método" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {TRANSACTION_PAYMENT_METHOD_OPTIONS.map(
                                            (option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.paymentMethod && (
                            <p className="text-red-500 text-sm">
                                {errors.paymentMethod.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[14px] font-medium leading-[14px] tracking-normal text-[#CBD5E1]">
                            Data
                        </Label>
                        <Input
                            {...register('date')}
                            type="date"
                            className="h-[44px] rounded-full border-[#334155] bg-[#334155] px-4 text-[14px] text-[#F1F5F9] placeholder:text-[#64748B] focus-visible:border-[#64748B] focus-visible:ring-0 [color-scheme:dark]"
                        />
                        {errors.date && (
                            <p className="text-red-500 text-sm">
                                {errors.date.message}
                            </p>
                        )}
                    </div>

                    <div className="pt-2">
                        <div className="flex items-center gap-4">
                            <DialogClose asChild>
                                <button
                                    type="button"
                                    className="h-[44px] flex-1 rounded-xl border border-[#334155] text-[16px] font-semibold text-[#CBD5E1] transition hover:bg-[#334155]/40"
                                >
                                    Cancelar
                                </button>
                            </DialogClose>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex h-[44px] flex-[1.35] items-center justify-center gap-2 rounded-xl bg-[#9333EA] text-[16px] font-semibold text-white shadow-[0px_4px_6px_-4px_rgba(168,85,247,0.2),0px_10px_15px_-3px_rgba(168,85,247,0.2)] transition hover:bg-[#7c2dd2] disabled:opacity-50"
                            >
                                {isSubmitting && (
                                    <Loader2Icon className="animate-spin" size={16} />
                                )}
                                Salvar transação
                            </button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
