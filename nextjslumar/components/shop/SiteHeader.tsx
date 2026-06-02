"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const CATEGORIES: { label: string; href: string; sale?: boolean }[] = [
  { label: "Novedades", href: "/novedades" },
  { label: "Fragancias", href: "/tienda" },
  { label: "Tiendas", href: "/tiendas" },
  { label: "SALE", href: "/sale", sale: true },
]

function Wordmark() {
  return (
    <Link href="/" aria-label="Lumar Parfum" className="shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/logo.jpeg" alt="Lumar Parfum" className="h-[72px] w-[72px] rounded-full object-cover" />
    </Link>
  )
}

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 bg-base">
      {/* promo bar */}
      <div className="bg-sage py-2.5 text-center text-sm text-ink">
        Obtén <span className="font-semibold">10% de descuento</span> en tu primera compra con el
        cupón <span className="font-semibold">SOYLUMAR</span>. Aplican T&amp;C
      </div>

      {/* main row */}
      <div className="border-b border-line">
        <div className="mx-auto flex h-24 max-w-[1320px] items-center gap-6 px-6">
          <Wordmark />

          {/* search pill */}
          <label className="relative mx-2 hidden max-w-xl flex-1 items-center md:flex">
            <input
              type="search"
              placeholder="¿Qué estás buscando?"
              className="h-12 w-full rounded-full border border-line bg-base pl-6 pr-32 text-sm text-fg placeholder:text-muted outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
            />
            <span className="absolute right-2 flex items-center gap-1.5">
              <button type="button" aria-label="Buscar por voz" className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:text-fg">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 15a3 3 0 003-3V6a3 3 0 00-6 0v6a3 3 0 003 3zm6-3a6 6 0 01-12 0m6 6v3" />
                </svg>
              </button>
              <button type="button" aria-label="Buscar por imagen" className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:text-fg">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 8a2 2 0 012-2h2l1.2-2h7.6L17 6h2a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                  <circle cx="12" cy="12.5" r="3.2" strokeWidth={1.6} />
                </svg>
              </button>
              <button type="submit" aria-label="Buscar" className="grid h-9 w-9 place-items-center rounded-full bg-ink text-white transition-transform hover:scale-105">
                <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.9} d="M21 21l-4.3-4.3M11 19a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
              </button>
            </span>
          </label>

          {/* right cluster */}
          <nav className="ml-auto flex items-center gap-5 text-fg">
            <Link href="#" className="hidden items-center gap-2 text-sm font-medium transition-colors hover:text-accent xl:flex">
              <svg width="19" height="19" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 4l2.2 4.6L19 9.3l-3.5 3.4.9 4.9L12 15.4 7.6 17.6l.9-4.9L5 9.3l4.8-.7L12 4z" />
              </svg>
              Lumar Beauty Club
            </Link>
            <Link href="/tiendas" className="hidden items-center gap-2 text-sm font-medium transition-colors hover:text-accent lg:flex">
              <svg width="19" height="19" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M4 9l1-4h14l1 4M4 9v10a1 1 0 001 1h14a1 1 0 001-1V9M4 9h16M9 20v-6h6v6" />
              </svg>
              Tiendas
            </Link>
            <Link href="/favoritos" aria-label="Favoritos" className="transition-colors hover:text-accent">
              <svg width="21" height="21" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 21s-7-4.5-9.5-9A5 5 0 0112 5a5 5 0 019.5 7c-2.5 4.5-9.5 9-9.5 9z" />
              </svg>
            </Link>
            <Link href="/carrito" aria-label="Carrito" className="relative transition-colors hover:text-accent">
              <svg width="21" height="21" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 4h2l2.4 12.4a1 1 0 001 .8h8.7a1 1 0 001-.8L21 8H6M9 21a1 1 0 100-2 1 1 0 000 2zm9 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
              <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white">2</span>
            </Link>
            <Link href="/login" className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent">
              <svg width="19" height="19" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM4 21v-1a6 6 0 0112 0v1" />
              </svg>
              <span className="hidden sm:inline">Ingresar</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* category bar */}
      <div className="bg-ink">
        <div className="mx-auto flex max-w-[1320px] items-stretch justify-center px-6">
          {CATEGORIES.map((c) => {
            const active = !c.sale && pathname === c.href
            if (c.sale) {
              return (
                <Link
                  key={c.label}
                  href={c.href}
                  className="bg-sage px-5 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-sage-2"
                >
                  {c.label}
                </Link>
              )
            }
            return (
              <Link
                key={c.label}
                href={c.href}
                className={`px-5 py-3.5 text-sm font-medium transition-colors hover:text-white ${
                  active ? "text-white" : "text-white/75"
                }`}
              >
                {c.label}
              </Link>
            )
          })}
        </div>
      </div>
    </header>
  )
}
