import Image from "next/image";
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between bg-gradient-to-b from-[#1a237e] to-[#283593] p-10 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
              L
            </div>
            <div>
              <p className="text-lg font-semibold tracking-wide">Lumar</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/60">Parfums</p>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-48 h-72 border-2 border-white/30 rounded-2xl" />
          <div className="absolute w-20 h-8 border-2 border-white/30 rounded-md -top-4 left-1/2 -translate-x-1/2 translate-y-[40%]" />
        </div>

        <div className="absolute inset-0">


          <Image
            src="/images/mathilde.jpg"
            alt="Auth Background"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
          />

        </div>

        <div className="relative z-10 space-y-6">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/60">
            — Doce fragancias, doce momentos
          </p>
          <h2 className="text-4xl font-bold leading-tight">
            Aromas que
            <br />
            cuentan historias.
          </h2>
          <p className="text-sm text-white/70 max-w-xs">
            Tu cuenta Lumar guarda tus aromas favoritos, pedidos y puntos en cada tienda
            fisica y online del pais.
          </p>
          <div className="flex gap-8 pt-4">
            <div>
              <p className="text-2xl font-bold">8K+</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/50">Clientes</p>
            </div>
            <div>
              <p className="text-2xl font-bold">4.9</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/50">Rating</p>
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/50">Fragancias</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  )
}
