"use client"

import dynamic from "next/dynamic"

const StoreMap = dynamic(() => import("./StoreMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-[#dde4f2]">
      <span className="text-sm text-slate-400">Cargando mapa…</span>
    </div>
  ),
})

export function MapPanel() {
  return (
    <div className="relative h-[560px] overflow-hidden rounded-3xl border border-line">
      <StoreMap />
    </div>
  )
}
