import { auth } from "@/lib/auth/auth"

export default async function DashboardPage() {
  const session = await auth()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Datos de sesión</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Nombre</p>
            <p className="font-medium text-gray-900">{session?.user?.name}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium text-gray-900">{session?.user?.email}</p>
          </div>
          <div>
            <p className="text-gray-500">Rol</p>
            <p className="font-medium text-gray-900">{session?.user?.role}</p>
          </div>
          <div>
            <p className="text-gray-500">ID</p>
            <p className="font-medium text-gray-900">{session?.user?.id}</p>
          </div>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Access Token</p>
          <code className="text-xs bg-gray-100 px-3 py-2 rounded-lg block mt-1 text-gray-700 break-all">
            {session?.user?.accessToken}
          </code>
        </div>
      </div>
    </div>
  )
}
