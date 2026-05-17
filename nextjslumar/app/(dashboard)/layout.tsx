import { auth } from "@/lib/auth/auth"
import { redirect } from "next/navigation"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1a237e] flex items-center justify-center text-white text-sm font-bold">
              L
            </div>
            <span className="font-semibold text-gray-900">Lumar Parfums</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{session.user.name}</span>
            <span className="text-xs bg-[#1a237e]/10 text-[#1a237e] px-2 py-1 rounded-full font-medium">
              {session.user.role}
            </span>
            <form
              action={async () => {
                "use server"
                const { signOut } = await import("@/lib/auth/auth")
                await signOut({ redirectTo: "/login" })
              }}
            >
              <button
                type="submit"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto p-6">{children}</main>
    </div>
  )
}
