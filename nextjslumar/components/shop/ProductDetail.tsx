"use client"

import { useState } from "react"
import Link from "next/link"
import { BottlePlaceholder } from "./BottlePlaceholder"
import {
  formatCOP,
  priceForSize,
  skuFor,
  getRating,
  getReviews,
  getDescription,
  getPyramid,
  type Product,
  type Size,
} from "@/lib/data/products"

const THUMB_TINTS = ["#c7d2fe", "#ddd6fe", "#bae6fd", "#d4d4d8"]

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating)
  return (
    <span className="flex items-center gap-0.5 text-accent">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < full ? "currentColor" : "none"} stroke="currentColor">
          <path strokeWidth={1.5} strokeLinejoin="round" d="M12 3l2.7 5.9 6.3.6-4.7 4.2 1.4 6.3L12 17.8 6 20.2l1.4-6.3L2.7 9.7l6.3-.6L12 3z" />
        </svg>
      ))}
    </span>
  )
}

export function ProductDetail({ product }: { product: Product }) {
  const sizes = product.sizes
  const [size, setSize] = useState<Size>(sizes.includes("50ml") ? "50ml" : sizes[0])
  const [qty, setQty] = useState(1)
  const [fav, setFav] = useState(false)

  const price = priceForSize(product.price, size)
  const cuota = Math.round(price / 3)
  const pyramid = getPyramid(product)
  const rating = getRating(product)

  return (
    <div className="mx-auto max-w-[1280px] px-6 pt-8">
      {/* breadcrumb */}
      <nav className="text-sm text-muted">
        <Link href="/" className="hover:text-fg">Inicio</Link>
        <span className="px-1.5">/</span>
        <Link href="/tienda" className="hover:text-fg">Catálogo</Link>
        <span className="px-1.5">/</span>
        <Link href={`/tienda?familia=${encodeURIComponent(product.family)}`} className="hover:text-fg">
          {product.family}
        </Link>
        <span className="px-1.5">/</span>
        <span className="text-fg/80">{product.name}</span>
      </nav>

      <div className="mt-7 grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* GALLERY */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {THUMB_TINTS.map((t, i) => (
              <button
                key={i}
                className={`relative h-[72px] w-[72px] overflow-hidden rounded-xl border-2 transition-colors ${
                  i === 0 ? "border-accent" : "border-line hover:border-muted"
                }`}
              >
                <BottlePlaceholder tint={i === 0 ? product.tint : t} className="h-full w-full" />
                <span className="absolute bottom-1 left-1.5 text-[9px] font-medium text-ink/50">
                  0{i + 1}
                </span>
              </button>
            ))}
          </div>

          <div className="relative flex-1 overflow-hidden rounded-3xl">
            <BottlePlaceholder tint={product.tint} className="aspect-square w-full" />
            {(product.badge || product.rating) && (
              <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Bestseller
              </span>
            )}
            <span className="absolute bottom-4 left-4 font-mono text-[11px] uppercase tracking-wider text-ink/50">
              Product · {product.name} · {size}
            </span>
          </div>
        </div>

        {/* INFO */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            {product.code} — Lumar Parfums
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tight text-fg">
            {product.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <Stars rating={rating} />
            <span className="font-medium text-fg">{rating.toFixed(1)}</span>
            <span className="text-muted">· {getReviews(product)} reseñas</span>
            <span className="text-muted">· SKU {skuFor(product, size)}</span>
          </div>

          <p className="mt-6 max-w-lg leading-relaxed text-muted">{getDescription(product)}</p>

          {/* size selector */}
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Tamaño</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {sizes.map((s) => {
              const active = s === size
              return (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`rounded-xl border px-5 py-3 text-left transition-colors ${
                    active
                      ? "border-accent bg-accent/10"
                      : "border-line hover:border-muted"
                  }`}
                >
                  <span className="block text-sm font-semibold text-fg">{s}</span>
                  <span className="block text-xs text-muted">{formatCOP(priceForSize(product.price, s))}</span>
                </button>
              )
            })}
          </div>

          {/* price + quantity */}
          <div className="mt-8 flex items-end justify-between">
            <div>
              <p className="text-4xl font-bold tracking-tight text-fg">{formatCOP(price)}</p>
              <p className="mt-1 text-sm text-muted">o 3 cuotas de {formatCOP(cuota)}</p>
            </div>
            <div className="flex items-center rounded-xl border border-line">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-12 w-12 place-items-center text-xl text-muted transition-colors hover:text-fg"
                aria-label="Disminuir"
              >
                −
              </button>
              <span className="w-10 text-center font-semibold text-fg">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="grid h-12 w-12 place-items-center text-xl text-muted transition-colors hover:text-fg"
                aria-label="Aumentar"
              >
                +
              </button>
            </div>
          </div>

          {/* actions */}
          <div className="mt-6 flex gap-3">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent py-4 text-sm font-semibold text-white transition-colors hover:bg-accent-2">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 4h2l2.4 12.4a1 1 0 001 .8h8.7a1 1 0 001-.8L21 8H6M9 21a1 1 0 100-2 1 1 0 000 2zm9 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
              Agregar al carrito
            </button>
            <button
              onClick={() => setFav((f) => !f)}
              className="flex items-center justify-center gap-2 rounded-xl border border-line px-6 py-4 text-sm font-medium text-fg transition-colors hover:bg-surface-2"
            >
              <svg width="18" height="18" fill={fav ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" className={fav ? "text-accent" : ""}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 21s-7-4.5-9.5-9A5 5 0 0112 5a5 5 0 019.5 7c-2.5 4.5-9.5 9-9.5 9z" />
              </svg>
              Favorito
            </button>
          </div>

          {/* scent pyramid */}
          <div className="mt-8 rounded-2xl border border-line bg-surface p-6">
            <h2 className="font-semibold text-fg">Pirámide olfativa</h2>
            <dl className="mt-5 space-y-px">
              {([
                ["Salida", pyramid.salida],
                ["Corazón", pyramid.corazon],
                ["Fondo", pyramid.fondo],
              ] as const).map(([label, notes], i) => (
                <div
                  key={label}
                  className={`grid grid-cols-[90px_1fr] items-center py-3 ${i > 0 ? "border-t border-line" : ""}`}
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{label}</dt>
                  <dd className="text-sm text-fg">{notes.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* meta */}
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted">
            <span className="flex items-center gap-2">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7h11v8H3V7zm11 3h4l3 3v2h-7v-5zM7 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm10 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              Envío en 24-48h
            </span>
            <span className="flex items-center gap-2">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14l-1 12H6L5 8zm3 0V6a4 4 0 018 0v2" />
              </svg>
              Muestra gratis con cada pedido
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
