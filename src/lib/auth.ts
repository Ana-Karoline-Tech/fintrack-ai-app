import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { db as prisma } from './prisma'
import { nextCookies } from 'better-auth/next-js'

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL:
        process.env.BETTER_AUTH_URL ??
        process.env.NEXT_PUBLIC_APP_URL ??
        'http://localhost:3000',
    database: prismaAdapter(prisma, {
        provider: 'postgresql',
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [nextCookies()],
    trustedOrigins: [
        process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
    ],
})

export type Session = typeof auth.$Infer.Session;
