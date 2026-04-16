'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/src/components/ui/dialog'

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

            <DialogContent className="border-[#1E293B] bg-[#161B26] text-white">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        Adicionar Transação
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4 py-6 text-slate-400">
                    <p className="text-sm">
                        Preencha as informações da sua nova transação abaixo
                        para manter seu controle financeiro atualizado.
                    </p>
                    <div className="flex h-32 w-full items-center justify-center rounded-xl border border-dashed border-[#1E293B] bg-[#0F111A] italic text-slate-600">
                        Área do Formulário
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
