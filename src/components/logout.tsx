'use client'

import { authClient } from '@/src/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader2, LogOut } from 'lucide-react'

export function LogoutButton() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    async function handleLogout() {
        setIsLoading(true)
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/sign-in')
                },
            },
        })
        setIsLoading(false)
    }

    return (
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
        type="button"
        aria-label="Sair da conta"
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        <span>Sair</span>
      </button>
    );
    }
