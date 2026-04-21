"use client";

import { AuthLayout } from '../_components/auth.layout'
import ArrowIcon from '@/src/assets/arrow-icon.png'
import Image from 'next/image'
import { inputClass } from '../../_styles/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema, type SignUpSchema } from '../../_schemas/auth'
import { authClient } from '@/src/lib/auth-client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function SignUpPage() {
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })

    const onSubmit = async (data: SignUpSchema) => {
        setError(null)

        await authClient.signUp.email({
            email: data.email,
            password: data.password,
            name: data.name,
            callbackURL: "/",
        }, {
            onSuccess: () => {
                router.push("/")
            },
            onError: (ctx) => {
                setError(ctx.error.message || "Ocorreu um erro ao criar sua conta")
            }
        })
    }

    return (
        <AuthLayout
            title="Crie sua conta"
            description="Preencha os campos abaixo para criar sua conta"
            footerText="Já tem uma conta?"
            footerLinkText="Faça login"
            footerHref="/sign-in"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-xl text-center">
                        {error}
                    </div>
                )}

                <div>
                    <label className="block text-sm text-zinc-300 mb-2">
                        Nome
                    </label>
                    <input
                        type="text"
                        placeholder="Seu nome completo"
                        className={inputClass}
                        {...register("name")}
                    />
                    {errors.name && (
                        <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>
                    )}
                </div>

                <div>
                    <label className="block text-sm text-zinc-300 mb-2">
                        E-mail
                    </label>
                    <input
                        type="email"
                        placeholder="seu@email.com"
                        className={inputClass}
                        {...register("email")}
                    />
                    {errors.email && (
                        <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>
                    )}
                </div>

                <div>
                    <label className="block text-sm text-zinc-300 mb-2">
                        Senha (min. 8 caracteres)
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className={inputClass}
                        {...register("password")}
                    />
                    {errors.password && (
                        <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#9333EA] hover:bg-[#7e22ce] transition-colors flex items-center justify-center gap-2 font-semibold rounded-2xl py-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        <>
                            <span>Criar Conta</span>
                            <Image src={ArrowIcon} alt="Ícone de seta" />
                        </>
                    )}
                </button>
            </form>
        </AuthLayout>
    )
}
