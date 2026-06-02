import type { Metadata } from "next"
import { MapPanel } from "@/components/shop/MapPanel"
import { STORES, type Store } from "@/lib/data/stores"

export const metadata: Metadata = {
  title: "Tiendas · Lumar Parfums",
  description: "Visítanos en Bogotá, Medellín y Cali. Envío nacional a toda Colombia.",
}

function PinIcon() {
  return (
    <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21s-7-5.6-7-11a7 7 0 1114 0c0 5.4-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" strokeWidth={1.5} />
    </svg>
  )
}
function CalIcon() {
  return (
    <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <rect x="4" y="5" width="16" height="16" rx="2" strokeWidth={1.5} />
      <path strokeLinecap="round" strokeWidth={1.5} d="M4 9h16M8 3v4m8-4v4" />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h2.3a1 1 0 01.95.68l1 3a1 1 0 01-.25 1L7.5 9.5a14 14 0 007 7l1.8-1.5a1 1 0 011-.25l3 1a1 1 0 01.7.95V19a2 2 0 01-2 2A16 16 0 013 5z" />
    </svg>
  )
}

function StoreCard({ store }: { store: Store }) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="h-[3px] w-full bg-gradient-to-r from-accent to-brand-500" />
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {store.kind}
          </span>
          <span className="font-mono text-xs text-muted">{store.distanceKm} km</span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-4">
          <h3 className="text-2xl font-semibold text-fg">
            {store.city} · {store.area}
          </h3>
          {store.open && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Abierta ahora
            </span>
          )}
        </div>

        <dl className="mt-5 space-y-3 text-sm text-muted">
          <div className="flex items-center gap-3"><PinIcon />{store.address}</div>
          <div className="flex items-center gap-3"><CalIcon />{store.hours}</div>
          <div className="flex items-center gap-3"><PhoneIcon /><span className="font-mono">{store.phone}</span></div>
        </dl>
      </div>
    </article>
  )
}

export default function TiendasPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 pt-10">
      {/* header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            — {STORES.length} tiendas en Colombia + envío nacional
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-fg sm:text-6xl">Visítanos.</h1>
        </div>

        <form className="flex w-full max-w-md gap-3 md:w-auto">
          <label className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
              <PinIcon />
            </span>
            <input
              type="text"
              placeholder="Tu ciudad o código postal…"
              className="w-full rounded-xl border border-line bg-surface py-3 pl-10 pr-4 text-sm text-fg placeholder:text-muted outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25"
            />
          </label>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-2"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-4.3-4.3M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            Buscar
          </button>
        </form>
      </div>

      {/* map + list */}
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="lg:sticky lg:top-[88px] lg:self-start">
          <MapPanel />
        </div>
        <div className="space-y-5">
          {STORES.map((s) => (
            <StoreCard key={s.id} store={s} />
          ))}
        </div>
      </div>
    </div>
  )
}
