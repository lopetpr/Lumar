"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "./Logo"

const NAV = [
  { label: "Tienda", href: "/tienda" },
  { label: "Colecciones", href: "/colecciones" },
  { label: "Nuestra Historia", href: "/historia" },
  { label: "Tiendas", href: "/tiendas" },
]

function IconButton({
  label,
  href = "#",
  children,
}: {
  label: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="relative grid h-10 w-10 place-items-center rounded-xl border border-line text-fg transition-colors hover:bg-surface-2"
    >
      {children}
    </Link>
  )
}

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-base/80 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center gap-6 px-6">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href === "/tienda" && pathname?.startsWith("/tienda"))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-1 text-sm font-medium transition-colors ${
                  active ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-[6px] left-0 h-0.5 w-full rounded-full bg-accent" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <label className="relative hidden md:block">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-4.3-4.3M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </span>
            <input
              type="search"
              placeholder="¿Qué aroma buscas?"
              className="w-64 rounded-full border border-line bg-surface py-2.5 pl-11 pr-4 text-sm text-fg placeholder:text-muted outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25 xl:w-80"
            />
          </label>

          <IconButton label="Mi cuenta" href="/login">
            <svg width="19" height="19" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM4 21v-1a6 6 0 0112 0v1" />
            </svg>
          </IconButton>

          <IconButton label="Favoritos" href="/favoritos">
            <svg width="19" height="19" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 21s-7-4.5-9.5-9A5 5 0 0112 5a5 5 0 019.5 7c-2.5 4.5-9.5 9-9.5 9z" />
            </svg>
          </IconButton>

          <Link
            href="/carrito"
            aria-label="Carrito"
            className="relative grid h-10 w-10 place-items-center rounded-xl bg-accent text-white transition-colors hover:bg-accent-2"
          >
            <svg width="19" height="19" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 4h2l2.4 12.4a1 1 0 001 .8h8.7a1 1 0 001-.8L21 8H6M9 21a1 1 0 100-2 1 1 0 000 2zm9 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-[10px] font-semibold text-ink ring-2 ring-base">
              2
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}
