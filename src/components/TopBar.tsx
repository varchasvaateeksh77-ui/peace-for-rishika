import React from 'react';

interface TopBarProps {
  recipientName: string;
}

export const TopBar: React.FC<TopBarProps> = ({ recipientName }) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-8 px-6 lg:px-12 py-4 bg-[#F6F2EA]/95 backdrop-blur-md border-b border-[#DED5C5]">
      {/* Zone 1: Editorial Folio Wordmark */}
      <a
        href="#epistle-top"
        className="flex items-baseline gap-3 text-[#1E1916] whitespace-nowrap shrink-0 group"
      >
        <span className="font-mono-meta text-[11px] uppercase tracking-[0.18em] text-[#8A7E72]">
          Folio IV
        </span>
        <span className="font-display text-2xl sm:text-[26px] font-semibold italic tracking-tight group-hover:text-[#9B3F33] transition-colors">
          For {recipientName}
        </span>
      </a>

      {/* Zone 2: Concise Navigation Links */}
      <nav
        aria-label="Keepsake sections"
        className="hidden md:flex items-center gap-8 font-sans-ui text-xs uppercase tracking-[0.14em] font-medium text-[#5C5249]"
      >
        <a
          href="#the-silence"
          className="hover:text-[#1E1916] transition-colors whitespace-nowrap shrink-0"
        >
          I. The Letter
        </a>
        <a
          href="#reflections"
          className="hover:text-[#1E1916] transition-colors whitespace-nowrap shrink-0"
        >
          II. Necessity vs. Choice
        </a>
        <a
          href="#peace-offerings"
          className="hover:text-[#1E1916] transition-colors whitespace-nowrap shrink-0"
        >
          III. Peace Offerings
        </a>
        <a
          href="#seal-truce"
          className="hover:text-[#1E1916] transition-colors whitespace-nowrap shrink-0"
        >
          IV. Your Verdict
        </a>
      </nav>

      {/* Zone 3: Direct anchor to the Verdict section (no editing buttons) */}
      <div className="flex items-center shrink-0">
        <a
          href="#seal-truce"
          className="min-h-[38px] inline-flex items-center px-4 py-1.5 bg-[#9B3F33] text-[#FCF9F4] font-sans-ui text-xs uppercase tracking-[0.12em] font-medium hover:bg-[#843126] transition-colors whitespace-nowrap shrink-0"
        >
          Send Your Verdict →
        </a>
      </div>
    </header>
  );
};
