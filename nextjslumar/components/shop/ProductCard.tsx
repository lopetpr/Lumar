"use client"

import Link from "next/link"
import { BottlePlaceholder } from "./BottlePlaceholder"
import { formatCOP, type Product } from "@/lib/data/products"

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/tienda/${product.id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl">
        <BottlePlaceholder tint={product.tint} className="aspect-[4/5] w-full" />

        {product.badge && (
          <span className="absolute left-3 top-3 rounded-md bg-ink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          aria-label="Añadir a favoritos"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-gray-500 shadow-sm transition-colors hover:text-ink"
          onClick={(e) => e.preventDefault()}
        >
          <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 21s-7-4.5-9.5-9A5 5 0 0112 5a5 5 0 019.5 7c-2.5 4.5-9.5 9-9.5 9z" />
          </svg>
        </button>

        <span className="absolute bottom-3 left-3 text-[11px] font-medium tracking-wider text-ink/55">
          {product.code}
        </span>
      </div>

      <div className="space-y-1 pt-3.5">
        <h3 className="font-semibold text-fg">{product.name}</h3>
        <p className="text-sm text-muted">{product.notes}</p>
        <div className="flex items-center justify-between pt-1.5">
          <span className="font-semibold text-fg">{formatCOP(product.price)}</span>
          {product.inStock ? (
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              En stock
            </span>
          ) : (
            <span className="text-xs font-medium text-muted">Agotado</span>
          )}
        </div>
      </div>
    </Link>
  )
}
