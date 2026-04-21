"use client";

import { AuthLayout } from '@/src/features/auth/components/auth.layout'
import ArrowIcon from '@/src/assets/arrow-icon.png'
import Image from 'next/image'
import { inputClass } from '@/src/styles/input-styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema, type SignInSchema } from '@/src/features/auth/schemas'
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
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center text-sm text-red-400">
                        {error}
                    </div>
                )}

                <div>
                    <label className="mb-2 block text-sm font-medium text-white">
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
                    <label className="mb-2 block text-sm font-medium text-white">
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
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#8B5CF6] py-4 font-semibold text-white shadow-lg shadow-violet-500/25 transition-colors hover:bg-[#7C3AED] disabled:cursor-not-allowed disabled:opacity-50"
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
