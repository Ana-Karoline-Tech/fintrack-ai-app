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
            <section className="h-screen flex items-center justify-center">
                <div className="bg-[#18181B] w-full max-w-md p-8 rounded-2xl">
                    <div className="flex flex-col items-center mb-8">
                        <div className='bg-[#9333EA] h-16 w-16 flex items-center justify-center rounded-2xl mb-6'>
                            <Image src={DolaIcon} alt='Ícone da página de autenticação' />
                        </div>

                        <h1 className='text-2xl font-bold text-white mb-2'>
                            {title}
                        </h1>
                        <p className='text-[#9F9FA9] text-sm'>{description}</p>
                    </div>

                    {children}

                    <div className='mt-10 text-center'>
                        <p className='text-sm'>
                            {footerText}
                            <Link href={footerHref} className='ml-1 text-[#9333EA] font-semibold hover:underline'>
                                {footerLinkText}
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        )
}