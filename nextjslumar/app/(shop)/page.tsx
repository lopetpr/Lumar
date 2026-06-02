import Link from "next/link"
import Image from "next/image"
import { ProductCard } from "@/components/shop/ProductCard"
import { TypewriterHeadline } from "@/components/shop/TypewriterHeadline"
import { PRODUCTS, FAMILIES } from "@/lib/data/products"

const bestsellers = PRODUCTS.slice(0, 4)

const VALUE_PROPS = [
  {
    title: "Muestras gratis",
    desc: "Dos muestras a elección en cada pedido.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 8h14l-1 12H6L5 8zm3 0V6a4 4 0 018 0v2" />
    ),
  },
  {
    title: "Envío en 48h",
    desc: "Despacho gratis en compras sobre $250.000.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 7h11v8H3V7zm11 3h4l3 3v2h-7v-5zM7 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm10 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    ),
  },
  {
    title: "Hecho a mano",
    desc: "Maceración lenta en pequeños lotes.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 3z" />
    ),
  },
  {
    title: "Recarga tu frasco",
    desc: "Programa de refill con 20% de descuento.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M4 12a8 8 0 0114-5m2 5a8 8 0 01-14 5m-2-10v4h4m12 6v-4h-4" />
    ),
  },
]

// Subtle dark tints for the family tiles
const FAMILY_TINTS = ["#3a55dd", "#7c5cff", "#1f9fd6", "#d6a52b", "#d65a9f"]

export default function HomePage() {
  return (
    <>
      {/* HERO — full-bleed photo, text over a soft left scrim */}
      <section className="relative min-h-[90vh] overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="Persona aplicándose un perfume Lumar bajo luz cálida"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 32%" }}
        />
        {/* scrim — darkens the left for legibility, keeps the right vivid */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(8,9,15,0.88) 0%, rgba(8,9,15,0.66) 32%, rgba(8,9,15,0.28) 52%, rgba(8,9,15,0) 72%)",
          }}
        />

        <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-[1600px] flex-col justify-center px-6 py-24">
          <TypewriterHeadline />

          <p className="rise mt-8 max-w-md text-base leading-relaxed text-white/75" style={{ animationDelay: "1.5s" }}>
            Perfumes artesanales pensados para los días largos y las noches sin
            prisa. Doce fragancias, doce momentos.
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-6" style={{ animationDelay: "1.7s" }}>
            <Link
              href="/tienda"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-2"
            >
              Explorar catálogo
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              href="/tienda"
              className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-white/70"
            >
              Encuentra tu aroma
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="mx-auto max-w-[1280px] px-6 pt-24">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          — Destacados
        </p>
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-3xl font-semibold tracking-tight text-fg">
            Bestsellers de la semana
          </h2>
          <Link
            href="/tienda"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-2"
          >
            Ver todos
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* COLECCIONES / FAMILIAS */}
      <section className="mx-auto max-w-[1280px] px-6 pt-24">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          — Familias olfativas
        </p>
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-3xl font-semibold tracking-tight text-fg">
            Encuentra tu familia
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {FAMILIES.map((f, i) => (
            <Link
              key={f}
              href={`/tienda?familia=${encodeURIComponent(f)}`}
              className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-line p-5 transition-all hover:border-accent/50 hover:shadow-[0_18px_50px_-18px_rgba(79,116,255,0.45)]"
              style={{ backgroundColor: `color-mix(in srgb, ${FAMILY_TINTS[i]} 16%, #ffffff)` }}
            >
              <span className="text-lg font-semibold text-fg">{f}</span>
              <span className="mt-1 inline-flex items-center gap-1 text-sm text-fg/60 transition-transform group-hover:translate-x-1">
                Ver perfumes →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="mx-auto max-w-[1280px] px-6 pt-24">
        <div className="grid grid-cols-2 gap-6 rounded-3xl border border-line bg-surface p-8 md:grid-cols-4 md:p-10">
          {VALUE_PROPS.map((v) => (
            <div key={v.title} className="space-y-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-surface-2 text-accent">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {v.icon}
                </svg>
              </span>
              <h3 className="font-semibold text-fg">{v.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-[1280px] px-6 pt-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 px-8 py-14 text-center md:px-16 md:py-20">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, rgba(255,255,255,.22) 0, rgba(255,255,255,.22) 1px, transparent 1px, transparent 26px)",
            }}
          />
          <div className="relative mx-auto max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Recibe el aroma del mes
            </h2>
            <p className="mt-4 text-white/70">
              Historias, lanzamientos y un descuento de bienvenida del 10%.
            </p>
            <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                placeholder="tu@correo.com"
                className="flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20"
              />
              <button
                type="submit"
                className="rounded-xl bg-white px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-white/90"
              >
                Suscribirme
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
