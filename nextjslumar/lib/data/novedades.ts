export type Categoria =
  | "Lanzamiento"
  | "Diario"
  | "Colección"
  | "Guía"
  | "Tienda"
  | "Programa"

export type Novedad = {
  id: string
  date: string // ISO
  categoria: Categoria
  title: string
  excerpt: string
  href: string
  tint: string
  nuevo?: boolean
}

// Ordered newest → oldest. The first entry is the featured publication.
export const NOVEDADES: Novedad[] = [
  {
    id: "bruma-azul-permanente",
    date: "2026-05-28",
    categoria: "Lanzamiento",
    title: "Bruma Azul N°07 entra a la colección permanente",
    excerpt:
      "Nuestra fragancia más vendida del otoño deja de ser edición limitada. Bergamota, sal marina y un fondo de almizcle que ya no se va.",
    href: "/tienda/bruma-azul",
    tint: "#c7d2fe",
    nuevo: true,
  },
  {
    id: "como-nace-una-fragancia",
    date: "2026-05-20",
    categoria: "Diario",
    title: "Detrás del aroma: cómo nace una fragancia Lumar",
    excerpt:
      "Del primer boceto olfativo a la maceración lenta. Un recorrido por el taller donde nacen nuestras doce historias.",
    href: "#",
    tint: "#ddd6fe",
  },
  {
    id: "edicion-otono-2025",
    date: "2026-05-12",
    categoria: "Colección",
    title: "Edición Otoño 2025: tres aromas para las noches largas",
    excerpt:
      "Vetiver, ámbar e incienso azul se reúnen en una cápsula pensada para los días que se alargan.",
    href: "/tienda",
    tint: "#bae6fd",
  },
  {
    id: "noche-vetiver-100ml",
    date: "2026-05-05",
    categoria: "Lanzamiento",
    title: "Noche Vetiver, ahora también en 100ml",
    excerpt:
      "Por pedido de la comunidad, nuestro amaderado especiado llega en formato grande para los que no se conforman.",
    href: "/tienda/noche-vetiver",
    tint: "#fde2c0",
    nuevo: true,
  },
  {
    id: "guia-familia-olfativa",
    date: "2026-04-28",
    categoria: "Guía",
    title: "Guía rápida: encuentra tu familia olfativa",
    excerpt:
      "Floral, amaderado, cítrico, oriental o gourmand. Un test corto para descubrir qué cuenta tu piel.",
    href: "/tienda",
    tint: "#d4d4d8",
  },
  {
    id: "tienda-taller-cali",
    date: "2026-04-20",
    categoria: "Tienda",
    title: "Nueva tienda-taller en Cali · Granada",
    excerpt:
      "Abrimos un espacio donde puedes oler, recargar y ver cómo se compone un perfume en vivo.",
    href: "/tiendas",
    tint: "#fbcfe8",
  },
  {
    id: "programa-refill",
    date: "2026-04-10",
    categoria: "Programa",
    title: "Refill program: recarga tu frasco con 20% de descuento",
    excerpt:
      "Trae tu frasco Lumar a cualquier tienda y rellénalo. Menos vidrio, mismo aroma, mejor precio.",
    href: "#",
    tint: "#bbf7d0",
  },
]

export const CATEGORIAS: Categoria[] = [
  "Lanzamiento",
  "Diario",
  "Colección",
  "Guía",
  "Tienda",
  "Programa",
]

export const formatFecha = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
