"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

type Banner = {
  id: string
  title: string
  sub: string
  offer: string
  offerSub: string
  href: string
  /** Color de fondo sólido (se usa cuando NO hay `image`). */
  bg: string
  /** Imagen de fondo opcional. Si se define, reemplaza al color `bg`. */
  image?: string
  /** Texto en blanco — úsalo en banners con imagen de fondo oscura. */
  textLight?: boolean
  /** Frascos decorativos SVG (solo se muestran si NO hay `image`). */
  bottles?: [string, string]
}

const BANNERS: Banner[] = [
  {
    id: "papa",
    title: "Feliz día, papá",
    sub: "Del 1 al 21 de junio",
    offer: "Hasta 30% OFF",
    offerSub: "en productos seleccionados",
    href: "/sale",
    bg: "#d7e6db",
    bottles: ["#1c2a8a", "#b9a06a"],
  },
  {
    id: "otono",
    title: "Colección Otoño",
    sub: "Doce fragancias, doce historias",
    offer: "Nueva temporada",
    offerSub: "descubre los lanzamientos",
    href: "/novedades",
    bg: "#e3def5",
    bottles: ["#7c5cff", "#3a55dd"],
  },
  {
    id: "envio",
    title: "Envío gratis",
    sub: "A todo Colombia",
    offer: "Sobre $250.000",
    offerSub: "despacho en 24-48h",
    href: "/tienda",
    bg: "#f0e8dc",
    bottles: ["#c9882b", "#8b93c9"],
  },
  {
    id: "refill",
    title: "Refill program",
    sub: "Recarga tu frasco Lumar",
    offer: "20% de descuento",
    offerSub: "menos vidrio, mismo aroma",
    href: "/sale",
    bg: "#cfe9d6",
    bottles: ["#1f9d6b", "#3a55dd"],
  },
]

function Bottle({ color }: { color: string }) {
  return (
    <svg width="64" height="96" viewBox="0 0 78 118" fill="none" aria-hidden="true" className="drop-shadow-md">
      <rect x="31" y="2" width="20" height="16" rx="3" fill={color} />
      <rect x="34" y="16" width="14" height="10" fill={color} opacity="0.7" />
      <rect x="14" y="26" width="50" height="88" rx="12" fill={color} />
      <rect x="28" y="64" width="22" height="26" rx="3" fill="#fff" opacity="0.85" />
    </svg>
  )
}

function Arrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "prev" ? "Anterior" : "Siguiente"}
      className={`absolute top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-ink/30 text-ink transition-colors hover:bg-ink/10 ${
        dir === "prev" ? "left-3 md:left-5" : "right-3 md:right-5"
      }`}
    >
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={dir === "prev" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
      </svg>
    </button>
  )
}

export function FragranceBanner() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const len = BANNERS.length
  const go = (i: number) => setActive((i + len) % len)

  const activeRef = useRef(active)
  activeRef.current = active
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % len), 3000)
    return () => clearInterval(id)
  }, [paused, len])

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {BANNERS.map((b) => {
          const fg = b.textLight ? "text-white" : "text-ink"
          const fgSoft = b.textLight ? "text-white/75" : "text-ink/70"
          const border = b.textLight ? "border-white" : "border-ink"
          return (
            <div
              key={b.id}
              className="relative flex h-[200px] w-full shrink-0 items-center justify-between gap-4 overflow-hidden px-14 md:h-[230px] md:px-24"
              style={{ backgroundColor: b.image ? undefined : b.bg }}
            >
              {/* OPCIÓN A — imagen de fondo (si `image` está definido) */}
              {b.image ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  {/* scrim para legibilidad del texto sobre la imagen */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-black/45" />
                </>
              ) : (
                /* OPCIÓN B — color sólido + textura de líneas */
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.07]"
                  style={{ backgroundImage: "repeating-linear-gradient(-12deg, #0f1320 0, #0f1320 1px, transparent 1px, transparent 26px)" }}
                />
              )}

              <div className="relative flex-1">
                <h3 className={`font-display text-2xl font-semibold uppercase tracking-wide md:text-3xl ${fg}`}>
                  {b.title}
                </h3>
                <p className={`mt-1 text-sm md:text-base ${fgSoft}`}>{b.sub}</p>
              </div>

              {/* TODO: cuando haya imágenes reales de producto (PNG transparente),
                  reemplazar estos frascos SVG por <img>. Solo se muestran si el
                  banner NO usa imagen de fondo. */}
              {!b.image && b.bottles && (
                <div className="relative hidden items-end gap-1 md:flex">
                  <Bottle color={b.bottles[0]} />
                  <Bottle color={b.bottles[1]} />
                </div>
              )}

              <div className="relative flex flex-1 flex-col items-end text-right">
                <p className={`text-xl font-bold uppercase tracking-tight md:text-3xl ${fg}`}>{b.offer}</p>
                <p className={`mt-0.5 text-xs md:text-sm ${fgSoft}`}>{b.offerSub}</p>
                <Link
                  href={b.href}
                  className={`mt-3 border-b-2 pb-0.5 text-sm font-semibold uppercase tracking-wider transition-colors hover:border-accent hover:text-accent ${fg} ${border}`}
                >
                  Ver más
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      <Arrow dir="prev" onClick={() => go(active - 1)} />
      <Arrow dir="next" onClick={() => go(active + 1)} />

      {/* dots */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {BANNERS.map((b, i) => (
          <button
            key={b.id}
            onClick={() => go(i)}
            aria-label={`Ir al banner ${i + 1}`}
            className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-ink" : "w-2 bg-ink/30 hover:bg-ink/50"}`}
          />
        ))}
      </div>
    </div>
  )
}
