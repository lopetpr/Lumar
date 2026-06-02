"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ProductCard } from "./ProductCard"
import {
  PRODUCTS,
  FAMILIES,
  INTENSITIES,
  SIZES,
  familyCounts,
  intensityCounts,
  sizeCounts,
  type Family,
  type Intensity,
  type Size,
} from "@/lib/data/products"

const PRICE_MIN = 150000
const PRICE_MAX = 360000

type Sort = "popular" | "price-asc" | "price-desc" | "name"

const SORT_LABELS: Record<Sort, string> = {
  popular: "Más populares",
  "price-asc": "Precio: menor a mayor",
  "price-desc": "Precio: mayor a menor",
  name: "Nombre A–Z",
}

function toggle<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set)
  next.has(value) ? next.delete(value) : next.add(value)
  return next
}

function FilterGroup<T extends string>({
  title,
  options,
  counts,
  selected,
  onToggle,
}: {
  title: string
  options: T[]
  counts: Map<T, number>
  selected: Set<T>
  onToggle: (v: T) => void
}) {
  return (
    <div className="border-b border-line pb-7">
      <h3 className="mb-4 font-semibold text-fg">{title}</h3>
      <ul className="space-y-3">
        {options.map((opt) => {
          const checked = selected.has(opt)
          return (
            <li key={opt}>
              <label className="flex cursor-pointer items-center justify-between text-sm">
                <span className="flex items-center gap-3">
                  <span
                    className={`grid h-[18px] w-[18px] place-items-center rounded-[5px] border transition-colors ${
                      checked ? "border-accent bg-accent text-white" : "border-line bg-surface"
                    }`}
                  >
                    {checked && (
                      <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <input type="checkbox" className="sr-only" checked={checked} onChange={() => onToggle(opt)} />
                  <span className={checked ? "text-fg" : "text-muted"}>{opt}</span>
                </span>
                <span className="text-muted/70">{counts.get(opt) ?? 0}</span>
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function CatalogView() {
  const [families, setFamilies] = useState<Set<Family>>(new Set(["Floral", "Amaderado"]))
  const [intensities, setIntensities] = useState<Set<Intensity>>(new Set(["Media"]))
  const [sizes, setSizes] = useState<Set<Size>>(new Set(["50ml"]))
  const [minPrice, setMinPrice] = useState(PRICE_MIN)
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX)
  const [sort, setSort] = useState<Sort>("popular")
  const [sortOpen, setSortOpen] = useState(false)

  const familyCount = FAMILIES.length

  const filtered = useMemo(() => {
    const result = PRODUCTS.filter((p) => {
      if (families.size && !families.has(p.family)) return false
      if (intensities.size && !intensities.has(p.intensity)) return false
      if (sizes.size && !p.sizes.some((s) => sizes.has(s))) return false
      if (p.price < minPrice || p.price > maxPrice) return false
      return true
    })
    switch (sort) {
      case "price-asc":
        return [...result].sort((a, b) => a.price - b.price)
      case "price-desc":
        return [...result].sort((a, b) => b.price - a.price)
      case "name":
        return [...result].sort((a, b) => a.name.localeCompare(b.name))
      default:
        return result
    }
  }, [families, intensities, sizes, minPrice, maxPrice, sort])

  const chips: { label: string; clear: () => void }[] = [
    ...[...families].map((f) => ({ label: f, clear: () => setFamilies((s) => toggle(s, f)) })),
    ...[...intensities].map((i) => ({ label: i, clear: () => setIntensities((s) => toggle(s, i)) })),
    ...[...sizes].map((s) => ({ label: s, clear: () => setSizes((set) => toggle(set, s)) })),
  ]

  const clearAll = () => {
    setFamilies(new Set())
    setIntensities(new Set())
    setSizes(new Set())
    setMinPrice(PRICE_MIN)
    setMaxPrice(PRICE_MAX)
  }

  const span = PRICE_MAX - PRICE_MIN
  const minPct = ((minPrice - PRICE_MIN) / span) * 100
  const maxPct = ((maxPrice - PRICE_MIN) / span) * 100

  return (
    <div className="mx-auto max-w-[1280px] px-6 pt-10">
      {/* breadcrumb + title */}
      <nav className="text-sm text-muted">
        <Link href="/" className="hover:text-fg">Inicio</Link>
        <span className="px-1.5">/</span>
        <span className="text-fg/80">Catálogo</span>
      </nav>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-fg">Todos los perfumes</h1>
      <p className="mt-2 text-sm text-muted">
        {PRODUCTS.length} fragancias · {familyCount} familias olfativas
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
        {/* SIDEBAR */}
        <aside className="space-y-7">
          <FilterGroup
            title="Familia olfativa"
            options={FAMILIES}
            counts={familyCounts}
            selected={families}
            onToggle={(v) => setFamilies((s) => toggle(s, v))}
          />
          <FilterGroup
            title="Intensidad"
            options={INTENSITIES}
            counts={intensityCounts}
            selected={intensities}
            onToggle={(v) => setIntensities((s) => toggle(s, v))}
          />
          <FilterGroup
            title="Tamaño"
            options={SIZES}
            counts={sizeCounts}
            selected={sizes}
            onToggle={(v) => setSizes((s) => toggle(s, v))}
          />

          <div>
            <h3 className="mb-5 font-semibold text-fg">Precio</h3>
            <div className="relative h-4">
              <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-line" />
              <div
                className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-accent"
                style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
              />
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={5000}
                value={minPrice}
                onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 5000))}
                className="price-range pointer-events-none absolute inset-0 w-full"
                aria-label="Precio mínimo"
              />
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={5000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 5000))}
                className="price-range pointer-events-none absolute inset-0 w-full"
                aria-label="Precio máximo"
              />
            </div>
            <div className="mt-3 flex justify-between text-sm text-muted">
              <span>$ {Math.round(minPrice / 1000)}K</span>
              <span>$ {Math.round(maxPrice / 1000)}K</span>
            </div>
          </div>
        </aside>

        {/* CONTENT */}
        <div>
          {/* toolbar */}
          <div className="mb-7 flex flex-wrap items-center gap-3">
            {chips.map((c) => (
              <button
                key={c.label}
                onClick={c.clear}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1.5 text-sm font-medium text-accent-soft transition-colors hover:bg-accent/25"
              >
                {c.label}
                <span className="text-accent-soft/70">×</span>
              </button>
            ))}
            {chips.length > 0 && (
              <button onClick={clearAll} className="text-sm text-muted hover:text-fg">
                Limpiar todo
              </button>
            )}

            <div className="relative ml-auto flex items-center gap-3">
              <span className="hidden text-sm text-muted sm:inline">Ordenar por</span>
              <button
                onClick={() => setSortOpen((o) => !o)}
                onBlur={() => setTimeout(() => setSortOpen(false), 120)}
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-surface-2"
              >
                {SORT_LABELS[sort]}
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {sortOpen && (
                <ul className="absolute right-0 top-full z-20 mt-2 w-56 overflow-hidden rounded-xl border border-line bg-surface py-1 shadow-xl">
                  {(Object.keys(SORT_LABELS) as Sort[]).map((key) => (
                    <li key={key}>
                      <button
                        onMouseDown={() => {
                          setSort(key)
                          setSortOpen(false)
                        }}
                        className={`block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-surface-2 ${
                          sort === key ? "font-medium text-fg" : "text-muted"
                        }`}
                      >
                        {SORT_LABELS[key]}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-line py-24 text-center">
              <p className="font-medium text-fg">Sin resultados</p>
              <p className="mt-1 text-sm text-muted">
                Ajusta los filtros para ver más fragancias.
              </p>
              <button
                onClick={clearAll}
                className="mt-5 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-2"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
