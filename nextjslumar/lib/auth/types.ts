import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      accessToken: string
    } & DefaultSession["user"]
  }

  interface User {
    role: string
    accessToken: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
    accessToken: string
  }
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  lastName: string
  email: string
  phone: string
  password: string
  wantsSample: boolean
  acceptedTerms: boolean
}

export interface AuthUser {
  id: string
  name: string
  email: string
  role: string
  accessToken: string
}
