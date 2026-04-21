'use client'

import { Controller, type Control, type FieldErrors, type UseFormRegister } from 'react-hook-form'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/src/components/ui/select'
import {
    TRANSACTION_CATEGORY_OPTIONS,
    TRANSACTION_PAYMENT_METHOD_OPTIONS,
    TRANSACTION_TYPE_OPTIONS,
} from '../constants'
import type { UpsertTransactionData } from '../schemas'

interface TransactionFormFieldsProps {
    register: UseFormRegister<UpsertTransactionData>
    control: Control<UpsertTransactionData>
    errors: FieldErrors<UpsertTransactionData>
}

export function TransactionFormFields({
    register,
    control,
    errors,
}: TransactionFormFieldsProps) {
    return (
        <>
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
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label className="text-[14px] font-medium leading-[14px] tracking-normal text-[#CBD5E1]">
                    Valor (R$)
                </Label>
                <Input
                    type="number"
                    {...register('amount', { valueAsNumber: true })}
                    placeholder="0,00"
                    inputMode="decimal"
                    className="h-[44px] rounded-full border-[#334155] bg-[#334155] px-4 text-[14px] text-[#F1F5F9] placeholder:text-[#64748B] focus-visible:border-[#64748B] focus-visible:ring-0"
                />
                {errors.amount && (
                    <p className="text-sm text-red-500">{errors.amount.message}</p>
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
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="h-[44px] w-full rounded-full border-[#334155] bg-[#334155] px-4 text-[14px] text-[#CBD5E1] [&_svg]:text-[#94A3B8]">
                                <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                {TRANSACTION_TYPE_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.type && (
                    <p className="text-sm text-red-500">{errors.type.message}</p>
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
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="h-[44px] w-full rounded-full border-[#334155] bg-[#334155] px-4 text-[14px] text-[#CBD5E1] [&_svg]:text-[#94A3B8]">
                                <SelectValue placeholder="Selecione a categoria" />
                            </SelectTrigger>
                            <SelectContent>
                                {TRANSACTION_CATEGORY_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.category && (
                    <p className="text-sm text-red-500">{errors.category.message}</p>
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
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="h-[44px] w-full rounded-full border-[#334155] bg-[#334155] px-4 text-[14px] text-[#CBD5E1] [&_svg]:text-[#94A3B8]">
                                <SelectValue placeholder="Selecione o método" />
                            </SelectTrigger>
                            <SelectContent>
                                {TRANSACTION_PAYMENT_METHOD_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.paymentMethod && (
                    <p className="text-sm text-red-500">{errors.paymentMethod.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label className="text-[14px] font-medium leading-[14px] tracking-normal text-[#CBD5E1]">
                    Data
                </Label>
                <Input
                    {...register('date')}
                    type="date"
                    className="h-[44px] rounded-full border-[#334155] bg-[#334155] px-4 text-[14px] text-[#F1F5F9] placeholder:text-[#64748B] focus-visible:border-[#64748B] focus-visible:ring-0 scheme-dark"
                />
                {errors.date && (
                    <p className="text-sm text-red-500">{errors.date.message}</p>
                )}
            </div>
        </>
    )
}
