"use client";

import { AuthLayout } from '../_components/auth.layout'
import ArrowIcon from '@/src/assets/arrow-icon.png'
import Image from 'next/image'
import { inputClass } from '../../_styles/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema, type SignInSchema } from '../../_schemas/auth'
import { authClient } from '@/src/lib/auth-client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function SignInPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
    })

    const onSubmit = async (data: SignInSchema) => {
        setIsLoading(true)
        setError(null)

        await authClient.signIn.email({
            email: data.email,
            password: data.password,
            callbackURL: "/",
        }, {
            onRequest: () => setIsLoading(true),
            onSuccess: () => {
                setIsLoading(false)
                router.push("/")
            },
            onError: (ctx) => {
                setIsLoading(false)
                setError(ctx.error.message || "E-mail ou senha incorretos")
            }
        })
    }

    return (
        <AuthLayout
            title="Bem-vindo de volta!"
            description="Faça login para acessar sua conta"
            footerText="Não tem uma conta?"
            footerLinkText="Registre-se"
            footerHref="/sign-up"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-xl text-center">
                        {error}
                    </div>
                )}

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
                        Senha
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
                    disabled={isLoading}
                    className="w-full bg-[#9333EA] hover:bg-[#7e22ce] transition-colors flex items-center justify-center gap-2 font-semibold rounded-2xl py-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        <>
                            <span>Entrar</span>
                            <Image src={ArrowIcon} alt="Ícone de seta" />
                        </>
                    )}
                </button>
            </form>
        </AuthLayout>
    )
}
