"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { PROMOS, type Promo } from "@/lib/data/sale"

function PromoCard({ promo }: { promo: Promo }) {
  return (
    <Link
      href={promo.href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-base transition-all hover:-translate-y-1 hover:shadow-[0_18px_50px_-22px_rgba(15,19,32,0.25)]"
    >
      <div
        className="relative flex h-36 items-start justify-between p-4"
        style={{ backgroundColor: `color-mix(in srgb, ${promo.tint} 55%, #fff)` }}
      >
        <span className="rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">{promo.tag}</span>
        <svg width="40" height="40" viewBox="0 0 78 118" fill="none" className="opacity-60" aria-hidden="true">
          <rect x="33" y="2" width="20" height="18" rx="3" fill="#8b93c9" />
          <rect x="15" y="27" width="56" height="86" rx="13" fill="#fff" stroke="#c7ccea" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-medium text-fg">{promo.title}</h3>
        <p className="mt-1 text-sm text-muted">{promo.subtitle}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          Ver más
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="transition-transform group-hover:translate-x-1">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

function Arrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "prev" ? "Anterior" : "Siguiente"}
      className={`absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-base text-fg shadow-md transition-colors hover:bg-surface md:grid ${
        dir === "prev" ? "-left-4" : "-right-4"
      }`}
    >
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={dir === "prev" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        />
      </svg>
    </button>
  )
}

export function PromoCarousel() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const step = () => {
    const el = ref.current
    return el ? el.scrollWidth / PROMOS.length : 0
  }
  const goTo = (i: number) => {
    const idx = Math.max(0, Math.min(PROMOS.length - 1, i))
    ref.current?.scrollTo({ left: idx * step(), behavior: "smooth" })
  }
  const onScroll = () => {
    const el = ref.current
    if (el) setActive(Math.round(el.scrollLeft / step()))
  }

  // auto-advance every 5s, pause on hover
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => goTo(active + 1 >= PROMOS.length ? 0 : active + 1), 3000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, paused])

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Arrow dir="prev" onClick={() => goTo(active - 1)} />
      <Arrow dir="next" onClick={() => goTo(active + 1)} />

      <div
        ref={ref}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {PROMOS.map((p) => (
          <div key={p.id} className="w-[260px] shrink-0 snap-start sm:w-[280px]">
            <PromoCard promo={p} />
          </div>
        ))}
      </div>

      {/* dots */}
      <div className="mt-5 flex justify-center gap-2">
        {PROMOS.map((p, i) => (
          <button
            key={p.id}
            onClick={() => goTo(i)}
            aria-label={`Ir a la promoción ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-6 bg-accent" : "w-2 bg-line hover:bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
