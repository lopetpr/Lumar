"use client"

import Link from "next/link"
import { BottlePlaceholder } from "./BottlePlaceholder"
import { formatCOP } from "@/lib/data/products"
import type { Deal } from "@/lib/data/sale"

export function SaleProductCard({ deal }: { deal: Deal }) {
  const { product, discount, salePrice } = deal
  return (
    <Link href={`/tienda/${product.id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl">
        <BottlePlaceholder tint={product.tint} className="aspect-[4/5] w-full" />

        <span className="absolute left-3 top-3 rounded-md bg-[#e11d48] px-2.5 py-1 text-[11px] font-bold tracking-wide text-white">
          −{discount}%
        </span>

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
        <div className="flex items-baseline gap-2 pt-1.5">
          <span className="font-semibold text-[#e11d48]">{formatCOP(salePrice)}</span>
          <span className="text-sm text-muted line-through">{formatCOP(product.price)}</span>
        </div>
      </div>
    </Link>
  )
}
