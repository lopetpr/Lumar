import Link from "next/link"
import { Logo } from "./Logo"

const COLS = [
  {
    title: "Tienda",
    links: ["Todos los perfumes", "Colecciones", "Novedades", "Sets de regalo"],
  },
  {
    title: "Lumar",
    links: ["Nuestra historia", "Tiendas físicas", "Sostenibilidad", "Prensa"],
  },
  {
    title: "Ayuda",
    links: ["Envíos y devoluciones", "Encuentra tu aroma", "Contacto", "Preguntas frecuentes"],
  },
]

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-surface/40">
      <div className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Perfumes artesanales pensados para los días largos y las noches sin prisa.
              Doce fragancias, doce momentos.
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-fg">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link href="#" className="text-sm text-muted transition-colors hover:text-fg">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Lumar Parfums. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-fg">Términos</Link>
            <Link href="#" className="hover:text-fg">Privacidad</Link>
            <Link href="#" className="hover:text-fg">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
