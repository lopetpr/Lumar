import type { Metadata } from "next"
import { CatalogView } from "@/components/shop/CatalogView"
import { FragranceBanner } from "@/components/shop/FragranceBanner"

export const metadata: Metadata = {
  title: "Catálogo · Lumar Parfums",
  description: "Explora las doce fragancias Lumar. Filtra por familia olfativa, intensidad, tamaño y precio.",
}

export default function TiendaPage() {
  return (
    <>
      <div className="mx-auto max-w-[1280px] px-6 pt-6">
        <FragranceBanner />
      </div>
      <CatalogView />
    </>
  )
}
