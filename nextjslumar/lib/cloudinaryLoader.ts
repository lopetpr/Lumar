import type { ImageLoaderProps } from "next/image"

/**
 * Global next/image loader (registrado en next.config → images.loaderFile).
 *
 * - Con NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME definido: sirve desde Cloudinary con
 *   f_auto (WebP/AVIF), q_auto (compresión) y w_<width> (responsive) vía CDN.
 * - Sin esa variable: devuelve la ruta local (fallback para dev / antes de
 *   subir los assets). La página nunca se rompe.
 *
 * Convención: el path local "/images/hero.jpg" → public_id "images/hero".
 * Sube las imágenes a Cloudinary conservando ese folder/nombre.
 */
export default function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  if (!cloud) return src // fallback local

  const publicId = src.replace(/^\//, "").replace(/\.[^.]+$/, "")
  const transforms = ["f_auto", `q_${quality ?? "auto"}`, `w_${width}`, "c_limit"].join(",")
  return `https://res.cloudinary.com/${cloud}/image/upload/${transforms}/${publicId}`
}
