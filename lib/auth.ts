import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { AuthOptions,  } from 'next-auth';
import prisma from "@/lib/prisma"

import Auth0Provider from "next-auth/providers/auth0"

export const authOptions : AuthOptions = {
    adapter : PrismaAdapter(prisma),
    providers : [
        Auth0Provider({
            clientId: process.env.AUTH0_CLIENT_ID!,
            clientSecret: process.env.AUTH0_CLIENT_SECRET!,
            issuer: process.env.AUTH0_ISSUER,
        })
    ],
    secret : process.env.AUTH0_SECRET,
};