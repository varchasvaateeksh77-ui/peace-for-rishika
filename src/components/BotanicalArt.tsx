import React from 'react';

/**
 * Crisp, balanced Golden Sunflower illustration
 */
export function SunflowerSvg({
  className = 'w-12 h-12',
  spinSlow = false,
}: {
  className?: string;
  spinSlow?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={`${className} ${spinSlow ? 'animate-[spin_36s_linear_infinite]' : ''}`}
      fill="none"
      aria-hidden="true"
    >
      {/* Back layer of warm amber petals */}
      <g stroke="#2C221E" strokeWidth="1.4" fill="#E5A93B">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <path
            key={`back-${deg}`}
            d="M60 12 C53 25, 53 40, 60 48 C67 40, 67 25, 60 12 Z"
            transform={`rotate(${deg + 15} 60 60)`}
          />
        ))}
      </g>
      {/* Front layer of bright golden petals */}
      <g stroke="#2C221E" strokeWidth="1.4" fill="#F4C145">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <g key={`front-${deg}`} transform={`rotate(${deg} 60 60)`}>
            <path d="M60 9 C52 23, 52 39, 60 48 C68 39, 68 23, 60 9 Z" />
            <line
              x1="60"
              y1="16"
              x2="60"
              y2="42"
              stroke="#B87D1E"
              strokeWidth="0.9"
            />
          </g>
        ))}
      </g>
      {/* Rich espresso seed center */}
      <circle
        cx="60"
        cy="60"
        r="19"
        fill="#3A281E"
        stroke="#2C221E"
        strokeWidth="1.6"
      />
      <circle
        cx="60"
        cy="60"
        r="13.5"
        fill="none"
        stroke="#E5A93B"
        strokeWidth="1.1"
        strokeDasharray="2.5 3"
      />
      <circle
        cx="60"
        cy="60"
        r="8"
        fill="none"
        stroke="#F4C145"
        strokeWidth="1"
        strokeDasharray="2 2.5"
      />
      <circle cx="60" cy="60" r="3" fill="#F4C145" />
    </svg>
  );
}

/**
 * Crisp, balanced White Lily illustration
 */
export function LilySvg({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {/* Back layer of soft blush-ivory petals */}
      <g stroke="#2C221E" strokeWidth="1.3" fill="#F5EBE6">
        {[30, 90, 150, 210, 270, 330].map((deg) => (
          <path
            key={`back-${deg}`}
            d="M60 60 C48 40, 50 18, 60 11 C70 18, 72 40, 60 60 Z"
            transform={`rotate(${deg} 60 60)`}
          />
        ))}
      </g>
      {/* Front layer of pure ivory lily tepals */}
      <g stroke="#2C221E" strokeWidth="1.4" fill="#FFFDF9">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <g key={`front-${deg}`} transform={`rotate(${deg} 60 60)`}>
            <path d="M60 60 C47 39, 49 16, 60 8 C71 16, 73 39, 60 60 Z" />
            <line
              x1="60"
              y1="54"
              x2="60"
              y2="20"
              stroke="#D4A59A"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </g>
        ))}
      </g>
      {/* Botanical sage center & golden anthers */}
      <circle
        cx="60"
        cy="60"
        r="6"
        fill="#DCE8DC"
        stroke="#445946"
        strokeWidth="1.3"
      />
      {[30, 90, 150, 210, 270, 330].map((deg) => (
        <g key={`stamen-${deg}`} transform={`rotate(${deg} 60 60)`}>
          <line
            x1="60"
            y1="55"
            x2="60"
            y2="40"
            stroke="#445946"
            strokeWidth="1.2"
          />
          <ellipse
            cx="60"
            cy="38"
            rx="2.8"
            ry="1.6"
            fill="#E5A93B"
            stroke="#2C221E"
            strokeWidth="0.9"
          />
        </g>
      ))}
    </svg>
  );
}

/**
 * Sweet Chilled Watermelon Slice illustration (Her favorite!)
 */
export function WatermelonSvg({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {/* Outer dark green rind */}
      <path
        d="M16 46 C16 84, 42 100, 60 100 C78 100, 104 84, 104 46 Z"
        fill="#3B6E4C"
        stroke="#2C221E"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Light green inner rind */}
      <path
        d="M22 46 C22 79, 44 93, 60 93 C76 93, 98 79, 98 46 Z"
        fill="#DCE8D4"
        stroke="#2C221E"
        strokeWidth="1.2"
      />
      {/* Juicy watermelon crimson flesh */}
      <path
        d="M27 46 C27 74, 46 87, 60 87 C74 87, 93 74, 93 46 Z"
        fill="#D94E4E"
        stroke="#2C221E"
        strokeWidth="1.3"
      />
      {/* Top cut highlight */}
      <line
        x1="16"
        y1="46"
        x2="104"
        y2="46"
        stroke="#2C221E"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Watermelon seeds */}
      <ellipse cx="45" cy="58" rx="2.2" ry="3.4" transform="rotate(14 45 58)" fill="#2C221E" />
      <ellipse cx="60" cy="64" rx="2.2" ry="3.4" fill="#2C221E" />
      <ellipse cx="75" cy="58" rx="2.2" ry="3.4" transform="rotate(-14 75 58)" fill="#2C221E" />
      <ellipse cx="52" cy="73" rx="2" ry="3.2" transform="rotate(8 52 73)" fill="#2C221E" />
      <ellipse cx="68" cy="73" rx="2" ry="3.2" transform="rotate(-8 68 73)" fill="#2C221E" />
    </svg>
  );
}

/**
 * Venetian Sealing Wax Stamp with embossed 'R' monogram
 */
export function WaxSealSvg({
  broken = false,
  className = 'w-20 h-20',
}: {
  broken?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 110 110"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M55 8 C67 7, 77 12, 86 20 C95 28, 102 40, 101 54 C100 67, 95 80, 85 89 C75 98, 65 102, 52 102 C38 102, 25 96, 17 86 C9 76, 7 63, 9 49 C11 35, 19 23, 30 15 C40 8, 46 9, 55 8 Z"
        fill="#9B3F33"
        stroke="#6B261D"
        strokeWidth="1.8"
      />
      <circle
        cx="55"
        cy="55"
        r="36"
        fill="#843126"
        stroke="#DFB252"
        strokeWidth="1.1"
        strokeDasharray="3 2.5"
      />
      <circle
        cx="55"
        cy="55"
        r="31"
        fill="none"
        stroke="#FCF9F4"
        strokeOpacity="0.3"
        strokeWidth="0.8"
      />
      <text
        x="55"
        y="65"
        textAnchor="middle"
        fill="#FCF9F4"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="36"
        fontWeight="600"
        fontStyle="italic"
      >
        R
      </text>
      {broken && (
        <path
          d="M37 22 L54 49 L47 61 L69 89"
          stroke="#FCF9F4"
          strokeOpacity="0.65"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

/**
 * Balanced, Harmonious Horizontal Botanical Garland Crest
 * Properly places Golden Sunflowers, White Lilies, Botanical Sage Leaves, and a Ribbon Knot
 * with zero overlapping text or awkward boxes.
 */
export function BotanicalBouquetCrestSvg({
  className = 'w-full max-w-[340px] h-auto mx-auto',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 360 124"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {/* Graceful symmetrical botanical branches left & right */}
      <path
        d="M180 96 C135 96, 92 78, 44 52"
        stroke="#445946"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M180 96 C225 96, 268 78, 316 52"
        stroke="#445946"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M180 96 L180 48"
        stroke="#445946"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Symmetrical Sage Leaves along the branches */}
      <path
        d="M78 68 C60 58, 48 66, 58 78 C66 84, 75 76, 78 68 Z"
        fill="#DCE8D4"
        stroke="#2C221E"
        strokeWidth="1.3"
      />
      <path
        d="M140 88 C126 100, 110 98, 116 84 C122 76, 134 82, 140 88 Z"
        fill="#6E8B64"
        stroke="#2C221E"
        strokeWidth="1.3"
      />
      <path
        d="M282 68 C300 58, 312 66, 302 78 C294 84, 285 76, 282 68 Z"
        fill="#DCE8D4"
        stroke="#2C221E"
        strokeWidth="1.3"
      />
      <path
        d="M220 88 C234 100, 250 98, 244 84 C238 76, 226 82, 220 88 Z"
        fill="#6E8B64"
        stroke="#2C221E"
        strokeWidth="1.3"
      />

      {/* Left Blossom: Golden Sunflower centered at (106, 54) */}
      <svg x="70" y="18" width="72" height="72" viewBox="0 0 120 120">
        <SunflowerSvg className="w-full h-full" />
      </svg>

      {/* Right Blossom: White Lily centered at (254, 54) */}
      <svg x="218" y="18" width="72" height="72" viewBox="0 0 120 120">
        <LilySvg className="w-full h-full" />
      </svg>

      {/* Center Crown: Sweet Watermelon Slice centered at (180, 42) */}
      <svg x="148" y="10" width="64" height="64" viewBox="0 0 120 120">
        <WatermelonSvg className="w-full h-full" />
      </svg>

      {/* Silk Ribbon Bow tying the stems at (180, 96) */}
      <path
        d="M180 96 C162 84, 150 94, 164 105 C171 109, 177 101, 180 96 Z"
        fill="#D97F76"
        stroke="#2C221E"
        strokeWidth="1.4"
      />
      <path
        d="M180 96 C198 84, 210 94, 196 105 C189 109, 183 101, 180 96 Z"
        fill="#D97F76"
        stroke="#2C221E"
        strokeWidth="1.4"
      />
      <path
        d="M177 99 L168 116 M183 99 L192 116"
        stroke="#9B3F33"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="180"
        cy="96"
        r="4.5"
        fill="#F4C145"
        stroke="#2C221E"
        strokeWidth="1.3"
      />
    </svg>
  );
}

export function ChocolateFoilSvg({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <rect
        x="28"
        y="18"
        width="64"
        height="82"
        rx="6"
        fill="#4A3427"
        stroke="#2C221E"
        strokeWidth="1.6"
      />
      <rect x="35" y="25" width="22" height="17" rx="2" fill="#634736" stroke="#2C221E" strokeWidth="1.1" />
      <rect x="63" y="25" width="22" height="17" rx="2" fill="#634736" stroke="#2C221E" strokeWidth="1.1" />
      <rect x="35" y="47" width="22" height="17" rx="2" fill="#634736" stroke="#2C221E" strokeWidth="1.1" />
      <rect x="63" y="47" width="22" height="17" rx="2" fill="#634736" stroke="#2C221E" strokeWidth="1.1" />
      <path
        d="M25 58 L95 49 L95 98 C95 101, 93 103, 90 103 L30 103 C27 103, 25 101, 25 98 Z"
        fill="#F4C145"
        stroke="#2C221E"
        strokeWidth="1.6"
      />
      <line x1="25" y1="65" x2="95" y2="56" stroke="#FFFDF9" strokeWidth="2" />
      <text
        x="60"
        y="85"
        textAnchor="middle"
        fill="#2C221E"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="14"
        fontWeight="700"
        fontStyle="italic"
      >
        Milk Cacao
      </text>
    </svg>
  );
}

export function CulinaryClocheSvg({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <circle cx="60" cy="31" r="5.5" fill="#F4C145" stroke="#2C221E" strokeWidth="1.5" />
      <path
        d="M22 78 C22 49, 38 35, 60 35 C82 35, 98 49, 98 78 Z"
        fill="#FFFDF9"
        stroke="#2C221E"
        strokeWidth="1.6"
      />
      <path
        d="M35 70 C37 53, 47 44, 60 43"
        stroke="#E5A93B"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <rect
        x="16"
        y="78"
        width="88"
        height="8"
        rx="4"
        fill="#EFE9DC"
        stroke="#2C221E"
        strokeWidth="1.6"
      />
    </svg>
  );
}
