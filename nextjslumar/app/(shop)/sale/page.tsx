import type { Metadata } from "next"
import Link from "next/link"
import { BottlePlaceholder } from "@/components/shop/BottlePlaceholder"
import { Countdown } from "@/components/shop/Countdown"
import { SaleProductCard } from "@/components/shop/SaleProductCard"
import { PromoCarousel } from "@/components/shop/PromoCarousel"
import { formatCOP } from "@/lib/data/products"
import { DEALS, TOP_DEAL, SALE_ENDS } from "@/lib/data/sale"

export const metadata: Metadata = {
  title: "SALE · Lumar Parfums",
  description: "Temporada de rebajas Lumar. Hasta 40% en fragancias seleccionadas.",
}

export default function SalePage() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 pt-8 pb-8">
      {/* HERO banner */}
      <section className="relative overflow-hidden rounded-3xl bg-ink px-8 py-12 text-white md:px-14 md:py-16">
        {/* decorative glow + hatch */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--color-accent), transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 1px, transparent 22px)",
          }}
        />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Temporada de rebajas · Del 1 al 21 de junio
            </p>

            <h1 className="mt-5 font-display font-semibold leading-[0.92] tracking-tight">
              <span className="block text-2xl font-normal text-white/70 sm:text-3xl">Hasta</span>
              <span className="block text-7xl sm:text-8xl">40% OFF</span>
            </h1>

            <p className="mt-5 max-w-md leading-relaxed text-white/70">
              En fragancias seleccionadas. Tu aroma favorito, por menos — pero solo
              por tiempo limitado.
            </p>

            <div className="mt-8">
              <p className="mb-2.5 text-xs font-medium uppercase tracking-wider text-white/50">
                Termina en
              </p>
              <Countdown to={SALE_ENDS} />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#ofertas"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white/90"
              >
                Ver ofertas
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m-6-6l6 6 6-6" />
                </svg>
              </a>
              <span className="text-xs text-white/45">Imagen referencial · Aplican T&amp;C</span>
            </div>
          </div>

          {/* featured top deal */}
          <Link
            href={`/tienda/${TOP_DEAL.product.id}`}
            className="group relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10"
          >
            <div className="relative">
              <BottlePlaceholder tint={TOP_DEAL.product.tint} className="aspect-[4/3] w-full" />
              <span className="absolute left-4 top-4 rounded-lg bg-[#e11d48] px-3 py-1.5 text-sm font-bold text-white">
                −{TOP_DEAL.discount}%
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 p-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-white/50">Oferta del día</p>
                <h3 className="mt-1 font-display text-xl font-medium">{TOP_DEAL.product.name}</h3>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-white">{formatCOP(TOP_DEAL.salePrice)}</p>
                <p className="text-xs text-white/45 line-through">{formatCOP(TOP_DEAL.product.price)}</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* promo carousel */}
      <h2 className="mt-14 mb-6 text-2xl font-semibold tracking-tight text-fg">Ofertas por categoría</h2>
      <PromoCarousel />

      {/* sale grid */}
      <div id="ofertas" className="mt-20 scroll-mt-32 text-center">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
          — En oferta ahora
        </p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-fg">
          Selección especial para ti
        </h2>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {DEALS.map((deal) => (
          <SaleProductCard key={deal.product.id} deal={deal} />
        ))}
      </div>
    </div>
  )
}
