import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/shop/ProductDetail"
import { getProduct, PRODUCTS } from "@/lib/data/products"

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = getProduct(id)
  if (!product) return { title: "Producto no encontrado · Lumar Parfums" }
  return {
    title: `${product.name} · Lumar Parfums`,
    description: product.description ?? `${product.name} — ${product.notes}.`,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = getProduct(id)
  if (!product) notFound()

  return <ProductDetail product={product} />
}
