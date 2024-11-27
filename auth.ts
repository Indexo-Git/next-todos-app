
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { prisma } from "./prisma"
import { signInEmailPassword } from "@/auth/components/actions/auth-actions"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: { label: "Username", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await signInEmailPassword(credentials!.email, credentials!.password)
 
        if (user) {
         return user
        }
 
        // return user object with their profile data
        return null
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn(user, account, profile) {
      return true;
    },
    async jwt({ token, trigger, session, account }) {
      const dbUser = await prisma.user.findUnique({
        where: {
          email: token.email ?? ''
        }
      });
      token.roles = dbUser?.roles ?? ['no-roles'];
      token.id = dbUser?.id ?? 'no-uuid';

      return token
    },
    async session({ session, token }) {

      if(session && session.user){
        (session.user as any).roles = token.roles;
        (session.user as any).id = token.id;
      }
      
      return session
    },
    
  }
})


