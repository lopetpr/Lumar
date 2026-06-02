import { SiteHeader } from "@/components/shop/SiteHeader"
import { SiteFooter } from "@/components/shop/SiteFooter"

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-base text-fg">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
