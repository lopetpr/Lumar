import { PRODUCTS, type Product } from "./products"

export const SALE_ENDS = "2026-06-21T23:59:59"

// % discount per product id — only these go on sale
const DISCOUNTS: Record<string, number> = {
  "bruma-azul": 30,
  "noche-vetiver": 20,
  "jardin-norte": 25,
  "humo-de-sandalo": 35,
  "sol-de-bergamota": 15,
  "rosa-de-medianoche": 40,
  "cedro-lluvia": 20,
  "vainilla-tabaco": 30,
}

export type Deal = {
  product: Product
  discount: number
  salePrice: number
}

const round5 = (n: number) => Math.round(n / 5000) * 5000

export const DEALS: Deal[] = PRODUCTS.filter((p) => DISCOUNTS[p.id]).map((product) => {
  const discount = DISCOUNTS[product.id]
  return {
    product,
    discount,
    salePrice: round5(product.price * (1 - discount / 100)),
  }
})

export const TOP_DEAL = DEALS.reduce((a, b) => (b.discount > a.discount ? b : a), DEALS[0])

export type Promo = {
  id: string
  title: string
  subtitle: string
  tag: string
  href: string
  tint: string
}

export const PROMOS: Promo[] = [
  {
    id: "bestsellers",
    title: "Best sellers en oferta",
    subtitle: "Los favoritos, ahora con descuento",
    tag: "Hasta 30%",
    href: "/tienda",
    tint: "#c7d2fe",
  },
  {
    id: "amaderados",
    title: "Amaderados de noche",
    subtitle: "Vetiver, sándalo y cedro",
    tag: "Hasta 35%",
    href: "/tienda?familia=Amaderado",
    tint: "#fde2c0",
  },
  {
    id: "sets",
    title: "Sets de regalo",
    subtitle: "Listos para sorprender",
    tag: "-25%",
    href: "/tienda",
    tint: "#ddd6fe",
  },
  {
    id: "cuotas",
    title: "Paga en cuotas",
    subtitle: "Hasta 6 sin interés",
    tag: "0% interés",
    href: "/tienda",
    tint: "#bbf7d0",
  },
  {
    id: "outlet",
    title: "Outlet Lumar",
    subtitle: "Últimas unidades",
    tag: "Hasta 40%",
    href: "/tienda",
    tint: "#fbcfe8",
  },
]
