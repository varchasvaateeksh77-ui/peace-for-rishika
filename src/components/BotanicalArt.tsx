import React from 'react';

/**
 * Fine-line botanical copperplate engraving of a Golden Sunflower
 */
export function SunflowerSvg({
  className = 'w-12 h-12',
  spinSlow = false,
  showHalo = true,
}: {
  className?: string;
  spinSlow?: boolean;
  showHalo?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={`${className} ${spinSlow ? 'animate-[spin_36s_linear_infinite]' : ''}`}
      fill="none"
      aria-hidden="true"
    >
      {/* Delicate outer halo ring */}
      {showHalo && (
        <circle
          cx="60"
          cy="60"
          r="52"
          stroke="#C5B9A5"
          strokeWidth="0.9"
          strokeDasharray="2 3"
        />
      )}
      {/* Back layer of warm ochre petals */}
      <g stroke="#1E1916" strokeWidth="1.2" fill="#E8C77B" fillOpacity="0.65">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <path
            key={`back-${deg}`}
            d="M60 15 C54 27, 54 40, 60 48 C66 40, 66 27, 60 15 Z"
            transform={`rotate(${deg + 15} 60 60)`}
          />
        ))}
      </g>
      {/* Front layer of fine golden petals with midrib line */}
      <g stroke="#1E1916" strokeWidth="1.25" fill="#DFB252">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <g key={`front-${deg}`} transform={`rotate(${deg} 60 60)`}>
            <path d="M60 12 C53 25, 53 40, 60 48 C67 40, 67 25, 60 12 Z" />
            <line
              x1="60"
              y1="18"
              x2="60"
              y2="43"
              stroke="#5C5249"
              strokeWidth="0.8"
            />
          </g>
        ))}
      </g>
      {/* Crosshatched espresso seed disc */}
      <circle
        cx="60"
        cy="60"
        r="18"
        fill="#2C241E"
        stroke="#1E1916"
        strokeWidth="1.5"
      />
      <circle
        cx="60"
        cy="60"
        r="13.5"
        fill="none"
        stroke="#C28B32"
        strokeWidth="1"
        strokeDasharray="2 2.5"
      />
      <circle
        cx="60"
        cy="60"
        r="8.5"
        fill="none"
        stroke="#E8C77B"
        strokeWidth="0.9"
        strokeDasharray="1.5 2.5"
      />
      <circle cx="60" cy="60" r="3" fill="#C28B32" />
    </svg>
  );
}

/**
 * Fine-line botanical copperplate engraving of a White Lily
 */
export function LilySvg({
  className = 'w-12 h-12',
  showHalo = true,
}: {
  className?: string;
  showHalo?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {showHalo && (
        <circle
          cx="60"
          cy="60"
          r="52"
          stroke="#C5B9A5"
          strokeWidth="0.9"
          strokeDasharray="2 3"
        />
      )}
      {/* 6 sculpted ivory lily tepals */}
      <g stroke="#1E1916" strokeWidth="1.25" fill="#FCF9F4">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 60 60)`}>
            <path d="M60 60 C48 40, 50 18, 60 10 C70 18, 72 40, 60 60 Z" />
            <line
              x1="60"
              y1="54"
              x2="60"
              y2="20"
              stroke="#8A7E72"
              strokeWidth="0.9"
              strokeLinecap="round"
            />
          </g>
        ))}
      </g>
      {/* Botanical sage center & ochre anthers */}
      <circle
        cx="60"
        cy="60"
        r="5.5"
        fill="#E7EFE8"
        stroke="#445946"
        strokeWidth="1.2"
      />
      {[30, 90, 150, 210, 270, 330].map((deg) => (
        <g key={`stamen-${deg}`} transform={`rotate(${deg} 60 60)`}>
          <line
            x1="60"
            y1="55"
            x2="60"
            y2="41"
            stroke="#445946"
            strokeWidth="1.1"
          />
          <ellipse
            cx="60"
            cy="39"
            rx="2.6"
            ry="1.5"
            fill="#C28B32"
            stroke="#1E1916"
            strokeWidth="0.8"
          />
        </g>
      ))}
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
      {/* Organic molten wax outer rim */}
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
      {/* Embossed R monogram */}
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
 * Fine-line botanical herbarium plate combining a pressed Sunflower and White Lily stem
 */
export function PressedBotanicalPlateSvg({
  className = 'w-full max-w-[260px] h-auto',
  activeFlower = 'sunflowers',
}: {
  className?: string;
  activeFlower?: 'sunflowers' | 'lilies';
}) {
  return (
    <svg
      viewBox="0 0 260 220"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {/* Herbarium specimen frame */}
      <rect
        x="10"
        y="10"
        width="240"
        height="200"
        fill="#FCF9F4"
        stroke="#C5B9A5"
        strokeWidth="1"
      />
      <rect
        x="16"
        y="16"
        width="228"
        height="188"
        fill="none"
        stroke="#DED5C5"
        strokeWidth="0.8"
      />

      {/* Arching botanical stems */}
      <path
        d="M130 185 Q110 135 92 78"
        stroke="#445946"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M130 185 Q150 135 168 82"
        stroke="#445946"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Leaves */}
      <path
        d="M112 140 C92 132, 82 142, 96 150 C104 154, 110 146, 112 140 Z"
        fill="#E7EFE8"
        stroke="#445946"
        strokeWidth="1.2"
      />
      <path
        d="M148 140 C168 132, 178 142, 164 150 C156 154, 150 146, 148 140 Z"
        fill="#E7EFE8"
        stroke="#445946"
        strokeWidth="1.2"
      />

      {/* Left: Pressed Golden Sunflower */}
      <g
        transform="translate(88, 74) scale(0.56)"
        opacity={activeFlower === 'sunflowers' ? 1 : 0.72}
      >
        <g transform="translate(-60, -60)">
          <SunflowerSvg className="w-28 h-28" showHalo={false} />
        </g>
      </g>

      {/* Right: Pressed White Lily */}
      <g
        transform="translate(172, 78) scale(0.56)"
        opacity={activeFlower === 'lilies' ? 1 : 0.72}
      >
        <g transform="translate(-60, -60)">
          <LilySvg className="w-28 h-28" showHalo={false} />
        </g>
      </g>

      {/* Herbarium paper tape strip across stems */}
      <rect
        x="108"
        y="162"
        width="44"
        height="11"
        transform="rotate(-4 130 167)"
        fill="#EFE9DC"
        stroke="#C5B9A5"
        strokeWidth="1"
      />

      {/* Specimen plate caption */}
      <text
        x="130"
        y="196"
        textAnchor="middle"
        fill="#8A7E72"
        fontFamily="'IBM Plex Mono', monospace"
        fontSize="8.5"
        letterSpacing="1.2"
      >
        FIG. I — HELIANTHUS & LILIUM CANDIDUM
      </text>
    </svg>
  );
}

export function ChocolateFoilSvg({ className = 'w-11 h-11' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <circle
        cx="60"
        cy="60"
        r="52"
        stroke="#C5B9A5"
        strokeWidth="0.9"
        strokeDasharray="2 3"
      />
      <rect
        x="30"
        y="22"
        width="60"
        height="76"
        rx="4"
        fill="#4A3427"
        stroke="#1E1916"
        strokeWidth="1.4"
      />
      <rect x="36" y="28" width="21" height="16" rx="1.5" fill="#634736" stroke="#1E1916" strokeWidth="1" />
      <rect x="63" y="28" width="21" height="16" rx="1.5" fill="#634736" stroke="#1E1916" strokeWidth="1" />
      <rect x="36" y="48" width="21" height="16" rx="1.5" fill="#634736" stroke="#1E1916" strokeWidth="1" />
      <rect x="63" y="48" width="21" height="16" rx="1.5" fill="#634736" stroke="#1E1916" strokeWidth="1" />
      <path
        d="M27 58 L93 50 L93 96 C93 98, 91 100, 89 100 L31 100 C29 100, 27 98, 27 96 Z"
        fill="#EFE9DC"
        stroke="#1E1916"
        strokeWidth="1.4"
      />
      <line x1="27" y1="66" x2="93" y2="58" stroke="#C28B32" strokeWidth="1.5" />
      <text
        x="60"
        y="83"
        textAnchor="middle"
        fill="#1E1916"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="13"
        fontWeight="600"
        fontStyle="italic"
      >
        Milk Cacao
      </text>
    </svg>
  );
}

export function CulinaryClocheSvg({ className = 'w-11 h-11' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <circle
        cx="60"
        cy="60"
        r="52"
        stroke="#C5B9A5"
        strokeWidth="0.9"
        strokeDasharray="2 3"
      />
      {/* Top ring handle */}
      <circle cx="60" cy="31" r="5" fill="#DFB252" stroke="#1E1916" strokeWidth="1.3" />
      {/* Dome */}
      <path
        d="M24 78 C24 50, 39 36, 60 36 C81 36, 96 50, 96 78 Z"
        fill="#FCF9F4"
        stroke="#1E1916"
        strokeWidth="1.4"
      />
      <path
        d="M36 70 C38 54, 47 45, 60 44"
        stroke="#C28B32"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {/* Platter base */}
      <rect
        x="18"
        y="78"
        width="84"
        height="7"
        rx="3.5"
        fill="#EFE9DC"
        stroke="#1E1916"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function FlareBeaconSvg({ className = 'w-11 h-11' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <circle
        cx="60"
        cy="60"
        r="52"
        stroke="#C5B9A5"
        strokeWidth="0.9"
        strokeDasharray="2 3"
      />
      <circle cx="60" cy="60" r="32" stroke="#C28B32" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="60" cy="60" r="20" fill="#F7EFE0" stroke="#C28B32" strokeWidth="1.2" />
      <path
        d="M60 28 L64 52 L88 60 L64 68 L60 92 L56 68 L32 60 L56 52 Z"
        fill="#9B3F33"
        stroke="#1E1916"
        strokeWidth="1.2"
      />
      <circle cx="60" cy="60" r="4" fill="#FCF9F4" />
    </svg>
  );
}

export function InlineSunflowerIcon() {
  return (
    <span
      className="inline-flex items-center justify-center align-middle mx-1 w-5 h-5"
      title="Golden Sunflower"
    >
      <SunflowerSvg className="w-5 h-5" />
    </span>
  );
}

export function InlineWhiteHeartIcon() {
  return (
    <svg
      viewBox="0 0 28 28"
      className="inline-block w-4 h-4 mx-1 align-[-2px]"
      role="img"
      aria-label="white heart"
    >
      <path
        d="M14 23.5 C14 23.5 4 17 4 9.8 C4 6.3 6.7 3.8 9.9 3.8 C11.9 3.8 13.4 4.8 14 6.2 C14.6 4.8 16.1 3.8 18.1 3.8 C21.3 3.8 24 6.3 24 9.8 C24 17 14 23.5 14 23.5 Z"
        fill="#FCF9F4"
        stroke="#9B3F33"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
