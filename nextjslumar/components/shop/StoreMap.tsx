"use client"

import { MapContainer, TileLayer, CircleMarker, Tooltip, Polyline, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { STORES, ROUTE } from "@/lib/data/stores"

// Bottom bar with custom zoom controls (needs the map instance)
function MapChrome() {
  const map = useMap()
  return (
    <>
      {/* recommended route label */}
      <div className="pointer-events-none absolute left-4 top-4 z-[500] rounded-xl bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
          Ruta recomendada
        </p>
        <p className="mt-0.5 text-sm font-medium text-slate-600">
          {STORES.map((s) => s.city).join(" → ")}
        </p>
      </div>

      {/* bottom bar */}
      <div className="absolute inset-x-4 bottom-4 z-[500] flex items-center justify-between rounded-xl bg-white/90 px-4 py-2.5 shadow-sm backdrop-blur">
        <span className="text-sm text-slate-400">Vista geográfica · arrastra para explorar</span>
        <div className="flex gap-2">
          <button
            onClick={() => map.zoomIn()}
            aria-label="Acercar"
            className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-lg leading-none text-slate-600 transition-colors hover:bg-slate-50"
          >
            +
          </button>
          <button
            onClick={() => map.zoomOut()}
            aria-label="Alejar"
            className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-lg leading-none text-slate-600 transition-colors hover:bg-slate-50"
          >
            −
          </button>
        </div>
      </div>
    </>
  )
}

export default function StoreMap() {
  return (
    <MapContainer
      center={[4.9, -75.0]}
      zoom={6}
      zoomControl={false}
      scrollWheelZoom={false}
      className="h-full w-full"
      style={{ background: "#dde4f2" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      <Polyline
        positions={ROUTE}
        pathOptions={{ color: "#4f74ff", weight: 2, opacity: 0.5, dashArray: "6 8" }}
      />

      {STORES.map((s) => (
        <CircleMarker
          key={s.id}
          center={s.coords}
          radius={9}
          pathOptions={{ color: "#fff", weight: 3, fillColor: "#16215f", fillOpacity: 1 }}
        >
          <Tooltip permanent direction="right" offset={[10, 0]} className="lumar-tooltip">
            {s.city}
          </Tooltip>
        </CircleMarker>
      ))}

      <MapChrome />
    </MapContainer>
  )
}
