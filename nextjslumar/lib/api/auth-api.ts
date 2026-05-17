import type { AuthUser, LoginCredentials, RegisterData } from "@/lib/auth/types"

const API_URL = process.env.API_URL || "http://localhost:8080/api"

// TODO: Reemplazar mocks con llamadas reales al backend
const USE_MOCK = true

async function mockDelay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function loginUser(credentials: LoginCredentials): Promise<AuthUser | null> {
  if (USE_MOCK) {
    await mockDelay()
    if (credentials.email === "laura.mejia@mail.co" && credentials.password === "Admin12345!") {
      return {
        id: "1",
        name: "Laura Mejia",
        email: credentials.email,
        role: "admin",
        accessToken: "mock-jwt-token-" + Date.now(),
      }
    }
    return null
  }

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  })

  if (!res.ok) return null

  return res.json()
}

export async function registerUser(data: RegisterData): Promise<AuthUser | null> {
  if (USE_MOCK) {
    await mockDelay()
    return {
      id: String(Date.now()),
      name: `${data.name} ${data.lastName}`,
      email: data.email,
      role: "user",
      accessToken: "mock-jwt-token-" + Date.now(),
    }
  }

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!res.ok) return null

  return res.json()
}
