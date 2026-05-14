// Graceful image placeholder
// If /public/{src} exists -> shows image. If missing -> shows placeholder with filename.
// Use everywhere we expect a Gemini-generated image.

interface Props {
  src: string;          // e.g. "/pipeline/stage-1.jpg"
  alt: string;
  className?: string;
  variant?: "dark" | "light";
  label?: string;       // override filename label
}

export default function ImageSlot({ src, alt, className = "", variant = "dark", label }: Props) {
  const isDark = variant === "dark";
  const displayLabel = label ?? src;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Real image — hidden via CSS if broken, fallback shows */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover z-10"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.opacity = "0";
        }}
      />

      {/* Placeholder shown when image is absent */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 z-0
        ${isDark
          ? "bg-gradient-to-br from-navy/60 to-navy-deep/80"
          : "bg-gradient-to-br from-[#EBEBD3] to-[#E0DAC4]"
        }`}>
        {/* Camera icon */}
        <svg
          width="28" height="28" viewBox="0 0 28 28" fill="none"
          className={isDark ? "text-snow/25" : "text-navy/25"}
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        >
          <rect x="2" y="7" width="24" height="17" rx="3" />
          <circle cx="14" cy="15" r="4.5" />
          <path d="M8 7V5a2 2 0 012-2h8a2 2 0 012 2v2" />
        </svg>
        <p className={`font-mono text-[9px] tracking-[0.2em] uppercase text-center px-4
          ${isDark ? "text-snow/30" : "text-navy/35"}`}>
          {displayLabel}
        </p>
      </div>
    </div>
  );
}
