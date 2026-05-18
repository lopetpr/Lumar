"use client"

import { useActionState, useState, useMemo } from "react"
import Link from "next/link"
import { registerAction, type RegisterState } from "./actions"

const initialState: RegisterState = { error: null, fieldErrors: {} }

function PasswordStrength({ password }: { password: string }) {
  const checks = useMemo(() => {
    const hasLength = password.length >= 10
    const hasNumber = /\d/.test(password)
    const hasSymbol = /[^a-zA-Z0-9]/.test(password)
    const passed = [hasLength, hasNumber, hasSymbol].filter(Boolean).length
    return { hasLength, hasNumber, hasSymbol, passed }
  }, [password])

  const colors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-500"]
  const labels = ["", "Débil", "Media", "Fuerte"]

  if (!password) return null

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i < checks.passed ? colors[checks.passed] : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">
          Mínimo 10 caracteres · al menos 1 número y 1 símbolo
        </p>
        {checks.passed > 0 && (
          <p className={`text-xs font-medium ${checks.passed === 3 ? "text-green-600" : "text-gray-500"}`}>
            Contraseña {labels[checks.passed]}{" "}
            {checks.passed === 3 && <span className="inline-block w-2 h-2 bg-green-500 rounded-full" />}
          </p>
        )}
      </div>
    </div>
  )
}

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState)
  const [password, setPassword] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex justify-end -mt-4 -mr-4">
        <p className="text-sm text-gray-500">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-[#1a237e] font-semibold hover:underline">
            Iniciar sesión &rarr;
          </Link>
        </p>
      </div>

      <div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-2">— Crear cuenta</p>
        <h1 className="text-3xl font-bold text-gray-900">Únete a Lumar</h1>
        <p className="text-sm text-gray-500 mt-2">
          Crea tu cuenta y recibe una{" "}
          <span className="font-semibold text-gray-900">muestra gratis</span> en tu primer pedido.
        </p>
      </div>

      {state.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Laura"
                  className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e]"
                />
              </div>
              {state.fieldErrors.name && (
                <p className="text-xs text-red-500 mt-1">{state.fieldErrors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Apellido
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                placeholder="Mejía"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e]"
              />
              {state.fieldErrors.lastName && (
                <p className="text-xs text-red-500 mt-1">{state.fieldErrors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="l.mejia@mail.co"
                className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e]"
              />
            </div>
            {state.fieldErrors.email && (
              <p className="text-xs text-red-500 mt-1">{state.fieldErrors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono móvil
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+57 312 489 2031"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e]"
            />
            <PasswordStrength password={password} />
            {state.fieldErrors.password && (
              <p className="text-xs text-red-500 mt-1">{state.fieldErrors.password}</p>
            )}
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-start gap-3 cursor-pointer bg-blue-50/50 border border-blue-100 rounded-xl p-3">
              <input
                name="wantsSample"
                type="checkbox"
                defaultChecked
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#1a237e] focus:ring-[#1a237e]"
              />
              <span className="text-sm text-gray-600">
                Quiero <span className="font-semibold text-gray-900">recibir 1 muestra gratis</span>{" "}
                en mi primer pedido y novedades de Lumar por correo.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                name="acceptedTerms"
                type="checkbox"
                required
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#1a237e] focus:ring-[#1a237e]"
              />
              <span className="text-sm text-gray-500">
                Acepto los{" "}
                <Link href="#" className="text-[#1a237e] underline">Términos de Servicio</Link>{" "}
                y el{" "}
                <Link href="#" className="text-[#1a237e] underline">Tratamiento de Datos</Link>{" "}
                de Lumar Parfums S.A.S.
              </span>
            </label>
            {state.fieldErrors.acceptedTerms && (
              <p className="text-xs text-red-500">{state.fieldErrors.acceptedTerms}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 bg-[#1a237e] text-white rounded-xl font-medium text-sm hover:bg-[#283593] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isPending ? "Creando cuenta..." : "Crear cuenta"} <span>&rarr;</span>
          </button>
        </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-4 text-gray-400 uppercase tracking-wider">O regístrate con</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Continuar con
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Continuar con
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
          Apple
        </button>
      </div>
    </div>
  )
}
