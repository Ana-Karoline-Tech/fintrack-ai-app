import DolaIcon from '@/src/assets/dola-icon.png'
import Image from 'next/image'
import Link from 'next/link'

interface AuthLayoutProps {
    title: string
    description: string
    children: React.ReactNode
    footerText: string
    footerLinkText: string
    footerHref: string
}

export const AuthLayout = ({    
    children,       
    description,
    title,
    footerHref,
    footerLinkText,
    footerText,
}: AuthLayoutProps) => {
        return (
            <section className="flex min-h-screen items-center justify-center bg-[#09090B] px-4 py-8 font-(family-name:--font-inter)">
                <div className="w-full max-w-md rounded-2xl border border-zinc-800/60 bg-[#121214] p-8 shadow-2xl shadow-black/40">
                    <div className="mb-8 flex flex-col items-center">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#8B5CF6] shadow-[0_0_32px_rgba(139,92,246,0.35)]">
                            <Image src={DolaIcon} alt="Ícone da página de autenticação" />
                        </div>

                        <h1 className="mb-2 text-center text-2xl font-bold text-white">
                            {title}
                        </h1>
                        <p className="text-center text-sm text-zinc-400">{description}</p>
                    </div>

                    {children}

                    <div className="mt-10 text-center">
                        <p className="text-sm text-zinc-400">
                            {footerText}
                            <Link
                                href={footerHref}
                                className="ml-1 font-semibold text-[#8B5CF6] transition hover:text-violet-400 hover:underline"
                            >
                                {footerLinkText}
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        )
}