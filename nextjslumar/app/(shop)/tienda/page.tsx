import type { Metadata } from "next"
import { CatalogView } from "@/components/shop/CatalogView"

export const metadata: Metadata = {
  title: "Catálogo · Lumar Parfums",
  description: "Explora las doce fragancias Lumar. Filtra por familia olfativa, intensidad, tamaño y precio.",
}

export default function TiendaPage() {
  return <CatalogView />
}
