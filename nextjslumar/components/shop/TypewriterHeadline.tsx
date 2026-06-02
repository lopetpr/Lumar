"use client"

import { useEffect, useRef, useState } from "react"

const FULL = "Aromas que cuentan historias."
const PREFIX = "Aromas que cuentan "

export function TypewriterHeadline() {
  const ref = useRef<HTMLHeadingElement>(null)
  // false on the server + first paint → real text is visible (SEO / no-JS).
  // turns true after hydration → hand over to the animated overlay.
  const [mounted, setMounted] = useState(false)
  const [n, setN] = useState(0)
  const done = n >= FULL.length

  useEffect(() => setMounted(true), [])

  // type character by character
  useEffect(() => {
    if (!mounted || done) return
    const id = setTimeout(() => setN((c) => c + 1), n === 0 ? 250 : 38)
    return () => clearTimeout(id)
  }, [mounted, n, done])

  // restart each time the heading enters the viewport
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setN(0)
      },
      { threshold: 0.6 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const prefix = FULL.slice(0, Math.min(n, PREFIX.length))
  const suffix = n > PREFIX.length ? FULL.slice(PREFIX.length, n) : ""

  return (
    <h1
      ref={ref}
      className="relative max-w-[15ch] font-display font-medium leading-[1.04] tracking-tight text-white"
      style={{ textShadow: "0 2px 34px rgba(0,0,0,0.5)", fontSize: "clamp(3rem, 8.5vw, 8.5rem)" }}
    >
      {/* real heading text — visible by default (SSR), hidden once JS takes over */}
      <span className={mounted ? "opacity-0" : "opacity-100"}>
        Aromas que cuentan <span className="italic">historias.</span>
      </span>

      {/* animated overlay (only after hydration) */}
      {mounted && (
        <span aria-hidden className="absolute inset-0">
          {prefix}
          <span className="italic">{suffix}</span>
          <span
            className="ml-1 inline-block h-[0.82em] w-[3px] translate-y-[0.08em] bg-white"
            style={{ animation: "blink 1s step-end infinite" }}
          />
        </span>
      )}
    </h1>
  )
}
