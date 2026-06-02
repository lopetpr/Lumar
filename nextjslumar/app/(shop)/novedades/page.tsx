import type { Metadata } from "next"
import Link from "next/link"
import { BottlePlaceholder } from "@/components/shop/BottlePlaceholder"
import { NOVEDADES, CATEGORIAS, formatFecha, type Novedad } from "@/lib/data/novedades"

export const metadata: Metadata = {
  title: "Novedades · Lumar Parfums",
  description: "Lanzamientos, colecciones y notas del taller. Lo último de Lumar Parfums.",
}

const [featured, ...rest] = NOVEDADES

function Meta({ n }: { n: Novedad }) {
  return (
    <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
      <span>{formatFecha(n.date)}</span>
      <span className="text-line">·</span>
      <span className="text-accent">{n.categoria}</span>
    </div>
  )
}

function NovedadCard({ n }: { n: Novedad }) {
  return (
    <Link
      href={n.href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-base transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_50px_-22px_rgba(54,81,230,0.35)]"
    >
      <div className="relative">
        <BottlePlaceholder tint={n.tint} className="aspect-[4/3] w-full" />
        {n.nuevo && (
          <span className="absolute left-3 top-3 rounded-md bg-ink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            Nuevo
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <Meta n={n} />
        <h3 className="font-display text-xl font-medium leading-snug text-fg">{n.title}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted">{n.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-accent">
          Leer más
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="transition-transform group-hover:translate-x-1">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

export default function NovedadesPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 pt-12 pb-8">
      {/* header */}
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
        — Lo último de Lumar
      </p>
      <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h1 className="font-display text-5xl font-semibold tracking-tight text-fg sm:text-6xl">
          Novedades
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-muted">
          Lanzamientos, colecciones y notas del taller. Lo que está pasando dentro
          de Lumar, contado en primera persona.
        </p>
      </div>

      {/* category tags */}
      <div className="mt-8 flex flex-wrap gap-2.5 border-b border-line pb-8">
        <span className="rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-white">Todas</span>
        {CATEGORIAS.map((c) => (
          <span
            key={c}
            className="cursor-pointer rounded-full border border-line px-4 py-1.5 text-sm text-muted transition-colors hover:border-fg/30 hover:text-fg"
          >
            {c}
          </span>
        ))}
      </div>

      {/* featured */}
      <article className="mt-10 grid overflow-hidden rounded-3xl border border-line bg-surface lg:grid-cols-2">
        <div className="relative">
          <BottlePlaceholder tint={featured.tint} className="h-full min-h-[340px] w-full" />
          <span className="absolute left-4 top-4 rounded-full bg-base/85 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-accent backdrop-blur">
            Destacado
          </span>
        </div>
        <div className="flex flex-col justify-center gap-5 p-8 lg:p-12">
          <Meta n={featured} />
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-fg sm:text-4xl lg:text-[2.75rem]">
            {featured.title}
          </h2>
          <p className="max-w-lg leading-relaxed text-muted">{featured.excerpt}</p>
          <Link
            href={featured.href}
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-2"
          >
            Leer publicación
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </article>

      {/* recent grid */}
      <h2 className="mt-16 mb-6 text-2xl font-semibold tracking-tight text-fg">Más reciente</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((n) => (
          <NovedadCard key={n.id} n={n} />
        ))}
      </div>
    </div>
  )
}
