"use server"

import { signIn } from "@/lib/auth/auth"
import { registerUser } from "@/lib/api/auth-api"
import { AuthError } from "next-auth"

export interface RegisterState {
  error: string | null
  fieldErrors: Record<string, string>
}

export async function registerAction(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const name = formData.get("name") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const password = formData.get("password") as string
  const wantsSample = formData.get("wantsSample") === "on"
  const acceptedTerms = formData.get("acceptedTerms") === "on"

  const fieldErrors: Record<string, string> = {}

  if (!name) fieldErrors.name = "Nombre requerido"
  if (!lastName) fieldErrors.lastName = "Apellido requerido"
  if (!email) fieldErrors.email = "Correo requerido"
  if (!password || password.length < 10) fieldErrors.password = "Mínimo 10 caracteres"
  if (password && !/\d/.test(password)) fieldErrors.password = "Debe contener al menos 1 número"
  if (password && !/[^a-zA-Z0-9]/.test(password))
    fieldErrors.password = "Debe contener al menos 1 símbolo"
  if (!acceptedTerms) fieldErrors.acceptedTerms = "Debes aceptar los términos"

  if (Object.keys(fieldErrors).length > 0) {
    return { error: null, fieldErrors }
  }

  const user = await registerUser({ name, lastName, email, phone, password, wantsSample, acceptedTerms })

  if (!user) {
    return { error: "Error al crear la cuenta. Inténtalo de nuevo.", fieldErrors: {} }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    })
    return { error: null, fieldErrors: {} }
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Cuenta creada pero error al iniciar sesión. Intenta hacer login.", fieldErrors: {} }
    }
    throw error
  }
}
