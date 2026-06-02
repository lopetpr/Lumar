export type Store = {
  id: string
  city: string
  area: string
  kind: string // badge: "Tienda insignia" | "Tienda" | "Tienda + Taller"
  address: string
  hours: string
  phone: string
  distanceKm: number
  open: boolean
  coords: [number, number] // [lat, lng]
}

export const STORES: Store[] = [
  {
    id: "bogota-zona-t",
    city: "Bogotá",
    area: "Zona T",
    kind: "Tienda insignia",
    address: "Cra 11 #82-71, Local 104",
    hours: "Lun-Sáb 10am-9pm · Dom 11am-7pm",
    phone: "+57 (601) 482 1100",
    distanceKm: 2.4,
    open: true,
    coords: [4.6671, -74.0529],
  },
  {
    id: "medellin-poblado",
    city: "Medellín",
    area: "El Poblado",
    kind: "Tienda",
    address: "Cra 43A #6 Sur-15, Centro Andino",
    hours: "Lun-Sáb 10am-9pm · Dom 11am-7pm",
    phone: "+57 (604) 311 4502",
    distanceKm: 386,
    open: true,
    coords: [6.2088, -75.5648],
  },
  {
    id: "cali-granada",
    city: "Cali",
    area: "Granada",
    kind: "Tienda + Taller",
    address: "Av. 6N #20-58",
    hours: "Lun-Sáb 10am-8pm · Dom cerrado",
    phone: "+57 (602) 668 2230",
    distanceKm: 462,
    open: true,
    coords: [3.4612, -76.5320],
  },
]

// Recommended route order (north → south)
export const ROUTE: [number, number][] = STORES.map((s) => s.coords)
