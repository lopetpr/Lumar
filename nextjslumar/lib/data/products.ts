export type Family = "Floral" | "Amaderado" | "Cítrico" | "Oriental" | "Gourmand"
export type Intensity = "Fresca" | "Media" | "Intensa"
export type Size = "30ml" | "50ml" | "100ml"
export type Badge = "NUEVO" | "TOP"

export type Pyramid = {
  salida: string[]
  corazon: string[]
  fondo: string[]
}

export type Product = {
  id: string
  code: string // N°01
  name: string
  family: Family
  notes: string // "Cítrico · Marino"
  price: number // base price = 50ml
  intensity: Intensity
  sizes: Size[]
  inStock: boolean
  badge?: Badge
  tint: string // hatch color
  // detail-page fields (optional — fall back to generated values)
  rating?: number
  reviews?: number
  description?: string
  pyramid?: Pyramid
}

// Card tint palette cycles through the 4 mockup colors
const TINTS = ["#c7d2fe", "#ddd6fe", "#bae6fd", "#d4d4d8"]
const tint = (i: number) => TINTS[i % TINTS.length]

export const PRODUCTS: Product[] = [
  {
    id: "bruma-azul",
    code: "N°01",
    name: "Bruma Azul",
    family: "Cítrico",
    notes: "Cítrico · Marino",
    price: 280000,
    intensity: "Fresca",
    sizes: ["30ml", "50ml", "100ml"],
    inStock: true,
    badge: "NUEVO",
    tint: tint(0),
    rating: 4.8,
    reviews: 312,
    description:
      "Una fragancia fresca y luminosa que evoca el aire salado del Caribe al amanecer. Bergamota brillante sobre una base aterciopelada de ámbar y almizcle.",
    pyramid: {
      salida: ["Bergamota", "Limón siciliano", "Sal marina"],
      corazon: ["Ámbar gris", "Iris", "Lavanda"],
      fondo: ["Almizcle blanco", "Cedro", "Vetiver"],
    },
  },
  {
    id: "noche-vetiver",
    code: "N°02",
    name: "Noche Vetiver",
    family: "Amaderado",
    notes: "Amaderado · Especiado",
    price: 320000,
    intensity: "Intensa",
    sizes: ["50ml", "100ml"],
    inStock: true,
    tint: tint(1),
  },
  {
    id: "jardin-norte",
    code: "N°03",
    name: "Jardín Norte",
    family: "Floral",
    notes: "Floral · Polvo",
    price: 245000,
    intensity: "Media",
    sizes: ["30ml", "50ml"],
    inStock: true,
    badge: "TOP",
    tint: tint(2),
  },
  {
    id: "humo-de-sandalo",
    code: "N°04",
    name: "Humo de Sándalo",
    family: "Amaderado",
    notes: "Amaderado · Ahumado",
    price: 360000,
    intensity: "Intensa",
    sizes: ["50ml", "100ml"],
    inStock: true,
    tint: tint(3),
  },
  {
    id: "sol-de-bergamota",
    code: "N°05",
    name: "Sol de Bergamota",
    family: "Cítrico",
    notes: "Cítrico · Verde",
    price: 230000,
    intensity: "Fresca",
    sizes: ["30ml", "50ml"],
    inStock: true,
    tint: tint(0),
  },
  {
    id: "rosa-de-medianoche",
    code: "N°06",
    name: "Rosa de Medianoche",
    family: "Floral",
    notes: "Floral · Amaderado",
    price: 295000,
    intensity: "Media",
    sizes: ["30ml", "50ml"],
    inStock: true,
    tint: tint(1),
  },
  {
    id: "ambar-secreto",
    code: "N°07",
    name: "Ámbar Secreto",
    family: "Oriental",
    notes: "Oriental · Resina",
    price: 340000,
    intensity: "Intensa",
    sizes: ["50ml", "100ml"],
    inStock: false,
    tint: tint(2),
  },
  {
    id: "cedro-lluvia",
    code: "N°08",
    name: "Cedro & Lluvia",
    family: "Amaderado",
    notes: "Amaderado · Fresco",
    price: 275000,
    intensity: "Media",
    sizes: ["30ml", "50ml", "100ml"],
    inStock: true,
    tint: tint(3),
  },
  {
    id: "flor-de-higo",
    code: "N°09",
    name: "Flor de Higo",
    family: "Floral",
    notes: "Floral · Lácteo",
    price: 260000,
    intensity: "Fresca",
    sizes: ["30ml", "50ml"],
    inStock: true,
    tint: tint(0),
  },
  {
    id: "vainilla-tabaco",
    code: "N°10",
    name: "Vainilla & Tabaco",
    family: "Gourmand",
    notes: "Gourmand · Dulce",
    price: 310000,
    intensity: "Media",
    sizes: ["50ml"],
    inStock: true,
    badge: "TOP",
    tint: tint(1),
  },
  {
    id: "incienso-azul",
    code: "N°11",
    name: "Incienso Azul",
    family: "Oriental",
    notes: "Oriental · Ahumado",
    price: 355000,
    intensity: "Intensa",
    sizes: ["30ml", "50ml"],
    inStock: true,
    tint: tint(2),
  },
  {
    id: "musgo-de-pino",
    code: "N°12",
    name: "Musgo de Pino",
    family: "Amaderado",
    notes: "Amaderado · Verde",
    price: 285000,
    intensity: "Media",
    sizes: ["30ml", "50ml", "100ml"],
    inStock: true,
    tint: tint(3),
  },
]

export const FAMILIES: Family[] = ["Floral", "Amaderado", "Cítrico", "Oriental", "Gourmand"]
export const INTENSITIES: Intensity[] = ["Fresca", "Media", "Intensa"]
export const SIZES: Size[] = ["30ml", "50ml", "100ml"]

export const countBy = <T extends string>(get: (p: Product) => T | T[]) => {
  const map = new Map<T, number>()
  for (const p of PRODUCTS) {
    const v = get(p)
    const keys = Array.isArray(v) ? v : [v]
    for (const k of keys) map.set(k, (map.get(k) ?? 0) + 1)
  }
  return map
}

export const familyCounts = countBy<Family>((p) => p.family)
export const intensityCounts = countBy<Intensity>((p) => p.intensity)
export const sizeCounts = countBy<Size>((p) => p.sizes)

export const formatCOP = (n: number) => "$ " + n.toLocaleString("es-CO")

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id)

// Price multipliers relative to the 50ml base price, rounded to nearest 5.000
const SIZE_FACTOR: Record<Size, number> = { "30ml": 0.7, "50ml": 1, "100ml": 1.5 }
export const priceForSize = (base: number, size: Size) =>
  Math.round((base * SIZE_FACTOR[size]) / 5000) * 5000

// SKU like LM-007-50 (code number + size)
export const skuFor = (p: Product, size: Size) => {
  const num = p.code.replace(/\D/g, "").padStart(3, "0")
  return `LM-${num}-${size.replace("ml", "")}`
}

export const getRating = (p: Product) => p.rating ?? 4.6
export const getReviews = (p: Product) => p.reviews ?? 80 + (p.name.length * 17) % 240

export const getDescription = (p: Product) =>
  p.description ??
  `Una composición ${p.intensity.toLowerCase()} de carácter ${p.family.toLowerCase()}. ${p.notes} en perfecto equilibrio, pensada para acompañar cada momento del día.`

// Generic pyramid per olfactive family when a product has none defined
const FAMILY_PYRAMID: Record<Family, Pyramid> = {
  Floral: { salida: ["Mandarina", "Pera"], corazon: ["Rosa", "Jazmín", "Peonía"], fondo: ["Almizcle", "Sándalo"] },
  Amaderado: { salida: ["Bergamota", "Pimienta"], corazon: ["Cedro", "Vetiver"], fondo: ["Sándalo", "Ámbar", "Pachulí"] },
  Cítrico: { salida: ["Limón", "Bergamota", "Pomelo"], corazon: ["Neroli", "Petitgrain"], fondo: ["Almizcle blanco", "Cedro"] },
  Oriental: { salida: ["Cardamomo", "Azafrán"], corazon: ["Incienso", "Rosa"], fondo: ["Ámbar", "Resinas", "Vainilla"] },
  Gourmand: { salida: ["Bergamota"], corazon: ["Vainilla", "Caramelo"], fondo: ["Tabaco", "Haba tonka", "Almizcle"] },
}
export const getPyramid = (p: Product) => p.pyramid ?? FAMILY_PYRAMID[p.family]
