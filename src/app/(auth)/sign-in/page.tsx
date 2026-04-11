import { AuthLayout } from '../_components/auth.layout'
import ArrowIcon from '@/src/assets/arrow-icon.png'
import Image from 'next/image'
import { inputClass } from '../../_styles/input'

export default function SignInPage() {
    return (
        <AuthLayout
            title="Bem-vindo de volta!"
            description="Faça login para acessar sua conta"
            footerText="Não tem uma conta?"
            footerLinkText="Registre-se"
            footerHref="/sign-up"
        >
            <form className="space-y-6">
                <label className="block text-sm text-zinc-300 mb-2">
                    E-mail
                </label>
                <input
                    type="email"
                    placeholder="seu@email.com"
                    className={inputClass}
                />
                <label className="block text-sm text-zinc-300 mb-2">
                    Senha
                </label>
                <input
                    type="password"
                    placeholder="••••••••"
                    className={inputClass}
                />

                <button
                    type="submit"
                    className="w-full bg-[#9333EA] flex items-center justify-center gap-2 font-semibold rounded-2xl py-4 cursor-pointer"
                >
                    <span>Entrar</span>
                    <Image src={ArrowIcon} alt="Ícone de seta" />
                </button>
            </form>
        </AuthLayout>
    )
}
