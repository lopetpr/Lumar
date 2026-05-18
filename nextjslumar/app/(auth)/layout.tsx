import Image from "next/image";

function MoonLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M55 8C55 8 35 15 35 38C35 61 55 68 55 68C45 72 28 65 22 50C16 35 22 16 38 8C44 4.5 50 5 55 8Z"
        fill="currentColor"
      />
      <ellipse cx="42" cy="70" rx="14" ry="2.5" fill="currentColor" opacity="0.5" />
      <ellipse cx="42" cy="73" rx="10" ry="1.8" fill="currentColor" opacity="0.3" />
      <ellipse cx="42" cy="75.5" rx="7" ry="1.2" fill="currentColor" opacity="0.2" />
      <line x1="30" y1="70" x2="54" y2="70" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="33" y1="71.5" x2="51" y2="71.5" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
    </svg>
  );
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen text-gray-900">
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/mathilde.jpg"
          alt="Lumar Parfums"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/15" />
      </div>

      <div className="fixed top-6 left-6 sm:top-8 sm:left-8 z-30 flex items-center gap-3">
        <MoonLogo className="w-9 h-11 text-[#C9A96E]" />
        <div>
          <p className="text-lg font-semibold tracking-widest text-white uppercase">Lumar</p>
          <p className="text-[9px] tracking-[0.35em] uppercase text-[#C9A96E]/80">Parfums</p>
        </div>
      </div>

      <div className="relative z-20 min-h-screen flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full max-w-6xl mx-auto px-4 sm:px-8 py-24 lg:py-16">
        <div className="hidden lg:flex flex-col justify-end flex-1 text-white space-y-6">
          <p className="text-xs tracking-[0.3em] uppercase text-[#C9A96E]/80 font-medium">
            — Doce fragancias, doce momentos
          </p>
          <h2 className="font-display text-6xl xl:text-7xl font-bold italic leading-[0.95] tracking-tight drop-shadow-[0_2px_30px_rgba(0,0,0,0.6)]">
            Aromas que
            <br />
            cuentan
            <br />
            historias.
          </h2>
          <p className="text-sm text-white/70 max-w-xs leading-relaxed">
            Tu cuenta Lumar guarda tus aromas favoritos, pedidos y puntos en cada tienda
            física y online del país.
          </p>
          <div className="flex gap-8 pt-4">
            <div>
              <p className="text-3xl font-bold font-display text-[#C9A96E]">8K+</p>
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/50 mt-1">Clientes</p>
            </div>
            <div>
              <p className="text-3xl font-bold font-display text-[#C9A96E]">4.9</p>
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/50 mt-1">Rating</p>
            </div>
            <div>
              <p className="text-3xl font-bold font-display text-[#C9A96E]">12</p>
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/50 mt-1">Fragancias</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md">
          <div className="bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-black/30 p-8 sm:p-10 ring-1 ring-[#C9A96E]/20">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
