import Link from "next/link"

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5 group">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-white font-semibold text-lg leading-none">
        L
      </span>
      <span className="flex items-baseline gap-1.5">
        <span className="text-xl font-semibold tracking-tight text-fg">Lumar</span>
        <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-muted">
          Parfums
        </span>
      </span>
    </Link>
  )
}
