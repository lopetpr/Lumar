/**
 * Placeholder visual for a perfume bottle photo: light diagonal-hatch panel
 * with a simple white bottle silhouette centered. Stays light even on the dark
 * theme (matches the campaign mockups). Replaced once real photos land.
 */
export function BottlePlaceholder({
  tint = "#c7d2fe",
  className = "",
}: {
  tint?: string
  className?: string
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: `color-mix(in srgb, ${tint} 38%, #fff)` }}
    >
      <div
        className="hatch absolute inset-0"
        style={{ ["--hatch-color" as string]: tint }}
      />
      <div className="absolute inset-0 grid place-items-center">
        <svg width="86" height="130" viewBox="0 0 86 130" fill="none" aria-hidden="true">
          {/* cap */}
          <rect x="33" y="2" width="20" height="18" rx="3" fill="#8b93c9" />
          {/* neck */}
          <rect x="36" y="18" width="14" height="11" fill="#aeb6e0" />
          {/* body */}
          <rect
            x="15"
            y="27"
            width="56"
            height="100"
            rx="13"
            fill="#fff"
            stroke="#c7ccea"
            strokeWidth="1.5"
          />
          {/* label */}
          <rect x="31" y="78" width="24" height="24" rx="4" fill="#eef1ff" stroke="#c7ccea" />
        </svg>
      </div>
    </div>
  )
}
