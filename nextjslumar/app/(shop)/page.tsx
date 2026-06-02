import Link from "next/link"
import { ProductCard } from "@/components/shop/ProductCard"
import { PRODUCTS, FAMILIES } from "@/lib/data/products"

const bestsellers = PRODUCTS.slice(0, 4)

const STATS = [
  { value: "12", label: "Fragancias" },
  { value: "4.9", label: "Rating medio" },
  { value: "8K+", label: "Clientes" },
]

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

function HeroCard() {
  return (
    <div className="relative aspect-[5/4.4] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 lg:aspect-auto lg:h-full">
      {/* diagonal lines */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, rgba(255,255,255,.22) 0, rgba(255,255,255,.22) 1px, transparent 1px, transparent 26px)",
        }}
      />
      {/* bottle */}
      <div className="absolute inset-0 grid place-items-center">
        <svg width="150" height="240" viewBox="0 0 150 240" fill="none" aria-hidden="true">
          <rect x="60" y="6" width="30" height="30" rx="5" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" />
          <rect x="66" y="34" width="18" height="18" stroke="rgba(255,255,255,.5)" strokeWidth="1.5" />
          <rect x="22" y="50" width="106" height="184" rx="26" stroke="rgba(255,255,255,.7)" strokeWidth="1.5" />
          <text x="75" y="138" textAnchor="middle" fill="rgba(255,255,255,.85)" fontSize="15" letterSpacing="4" fontWeight="500">LUMAR</text>
          <text x="75" y="158" textAnchor="middle" fill="rgba(255,255,255,.5)" fontSize="8" letterSpacing="2">EAU DE PARFUM · 50mL</text>
        </svg>
      </div>
      {/* captions */}
      <span className="absolute bottom-6 left-6 text-xs font-medium tracking-[0.2em] text-white/80">
        N°07 — BRUMA AZUL
      </span>
      <span className="absolute bottom-6 right-6 text-xs text-white/45">
        [foto principal de campaña]
      </span>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-[1280px] px-6 pt-12 lg:pt-16">
        <div className="grid items-stretch gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <span className="mb-7 inline-flex w-fit items-center gap-2 rounded-full bg-accent/15 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Colección Otoño · 2025
            </span>

            <h1 className="text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
              <span className="text-fg">Aromas que</span>
              <br />
              <span className="text-accent">cuentan historias.</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
              Perfumes artesanales pensados para los días largos y las noches sin
              prisa. Doce fragancias, doce momentos.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-6">
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
                className="inline-flex items-center gap-2 text-sm font-medium text-fg hover:text-accent"
              >
                Encuentra tu aroma
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6l6 6-6 6" />
                </svg>
              </Link>
            </div>

            <hr className="my-9 border-line" />

            <dl className="flex gap-12">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="text-3xl font-semibold text-fg">{s.value}</dt>
                  <dd className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <HeroCard />
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
              style={{ backgroundColor: `color-mix(in srgb, ${FAMILY_TINTS[i]} 16%, #11162f)` }}
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
