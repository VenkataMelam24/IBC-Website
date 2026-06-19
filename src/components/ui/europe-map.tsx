export function EuropeMap({ className }: { className?: string }) {
  const country = "fill-transparent stroke-[hsl(var(--primary))] stroke-[0.7]"

  return (
    <svg
      viewBox="0 0 520 460"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Map of Europe with Germany highlighted"
    >
      <g strokeLinejoin="round" strokeLinecap="round" opacity="0.35">
        {/* Ireland */}
        <path className={country} d="M12,200 L52,170 L55,205 Z" />
        {/* Great Britain */}
        <path className={country} d="M64,220 L130,208 L132,188 L112,142 L74,142 L56,148 L58,163 Z" />
        {/* Iberian Peninsula */}
        <path className={country} d="M28,278 L143,278 L152,316 L141,344 L103,353 L65,353 L28,344 L28,306 Z" />
        {/* France */}
        <path className={country} d="M68,238 L130,208 L171,228 L179,278 L143,278 L93,282 L74,248 Z" />
        {/* Benelux */}
        <path className={country} d="M130,208 L171,208 L171,188 L130,188 Z" />
        {/* Switzerland */}
        <path className={country} d="M171,244 L209,244 L209,250 L171,250 Z" />
        {/* Austria */}
        <path className={country} d="M209,234 L276,234 L276,250 L209,244 Z" />
        {/* Czech Republic + Slovakia */}
        <path className={country} d="M230,210 L285,210 L322,218 L285,226 L230,226 Z" />
        {/* Poland */}
        <path className={country} d="M247,178 L332,178 L332,218 L322,218 L285,218 L257,214 L247,210 Z" />
        {/* Baltic States */}
        <path className={country} d="M314,130 L382,130 L382,178 L314,178 Z" />
        {/* Scandinavia — Norway + Sweden */}
        <path className={country} d="M188,170 L160,150 L160,104 L188,75 L256,28 L380,18 L400,28 L400,75 L283,142 L255,155 L226,162 L208,170 Z" />
        {/* Finland */}
        <path className={country} d="M322,122 L382,75 L382,28 L340,75 L340,114 Z" />
        {/* Denmark */}
        <path className={country} d="M188,170 L180,164 L198,168 L214,156 L216,146 L204,136 L188,148 Z" />
        {/* Hungary */}
        <path className={country} d="M266,234 L322,234 L322,258 L266,258 Z" />
        {/* Romania */}
        <path className={country} d="M322,234 L390,240 L398,268 L350,278 L322,278 Z" />
        {/* Balkans (simplified) */}
        <path className={country} d="M248,258 L362,258 L362,296 L304,296 L248,296 Z" />
        {/* Greece */}
        <path className={country} d="M304,296 L362,296 L340,334 L322,344 L302,334 Z" />
        {/* Italy */}
        <path className={country} d="M179,278 L248,248 L248,278 L226,306 L246,334 L264,340 L284,316 L274,334 L256,344 L226,340 L218,344 L208,334 L198,306 L188,278 Z" />
        {/* Belarus */}
        <path className={country} d="M322,178 L400,178 L400,218 L322,218 Z" />
        {/* Ukraine */}
        <path className={country} d="M285,218 L460,218 L460,278 L350,278 L322,258 L285,258 Z" />
      </g>

      {/* Germany — highlighted in site primary (burgundy) */}
      <path
        d="M174,184 L198,170 L246,180 L256,210 L256,214 L240,234 L209,244 L188,244 L183,234 L170,228 L170,210 L174,200 Z"
        fill="hsl(var(--primary))"
        stroke="hsl(var(--primary))"
        strokeWidth="0.5"
        strokeLinejoin="round"
        opacity="0.85"
      />

      {/* Berlin dot */}
      <circle
        cx="208"
        cy="210"
        r="3.5"
        fill="hsl(var(--background))"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
      />
    </svg>
  )
}
