import type { NextAuthConfig } from "next-auth"
import type { JWT } from "@auth/core/jwt"
import Credentials from "next-auth/providers/credentials"
import { loginUser } from "@/lib/api/auth-api"

export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials.email as string
        const password = credentials.password as string

        if (!email || !password) return null

        const user = await loginUser({ email, password })
        if (!user) return null

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          accessToken: user.accessToken,
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.accessToken = user.accessToken
      }
      return token
    },
    session({ session, token }) {
      const t = token as JWT
      session.user.id = t.sub!
      session.user.role = t.role
      session.user.accessToken = t.accessToken
      return session
    },
  },
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig
