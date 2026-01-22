export function MediumIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {/* Simple, custom “M” mark (not an exact brand glyph) */}
      <path d="M4 6h3l5 9 5-9h3v12h-3V10l-5 9-5-9v8H4V6z" />
    </svg>
  );
}

export function SubstackIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {/* Custom “newsletter” icon inspired by Substack (top bar + lines). */}
      <rect x="5" y="4" width="14" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.75" />
      <path d="M7 8h10" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" />
      <path d="M7 11h10" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M7 13.75h10" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M7 16.5h7" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}
