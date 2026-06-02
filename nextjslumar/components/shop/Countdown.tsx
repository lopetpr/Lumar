"use client"

import { useEffect, useState } from "react"

const UNITS = [
  { key: "d", label: "Días" },
  { key: "h", label: "Horas" },
  { key: "m", label: "Min" },
  { key: "s", label: "Seg" },
] as const

function diff(target: number) {
  const ms = Math.max(0, target - Date.now())
  const s = Math.floor(ms / 1000)
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  }
}

export function Countdown({ to }: { to: string }) {
  const target = new Date(to).getTime()
  const [t, setT] = useState(() => diff(target))

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return (
    <div className="flex gap-2.5">
      {UNITS.map((u) => (
        <div
          key={u.key}
          className="flex min-w-[58px] flex-col items-center rounded-xl bg-white/10 px-3 py-2.5 backdrop-blur"
        >
          <span className="font-mono text-2xl font-bold tabular-nums text-white">
            {String(t[u.key]).padStart(2, "0")}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-white/55">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  )
}
