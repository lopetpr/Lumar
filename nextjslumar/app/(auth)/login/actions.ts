"use server"

import { signIn } from "@/lib/auth/auth"
import { AuthError } from "next-auth"

export interface LoginState {
  error: string | null
}

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirectTo: "/dashboard",
    })
    return { error: null }
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Correo o contraseña incorrectos" }
    }
    throw error
  }
}
