/**
 * Decorative broken-clock/watch motif — the recurring visual symbol described in
 * docs/PROJECT-CONTEXT.md. Purely graphical, so used sparingly and marked aria-hidden.
 */
export function ClockMotif({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M100 12a88 88 0 1 1-62.2 25.8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="46"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="100"
        y1="100"
        x2="146"
        y2="118"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="100" cy="100" r="4" fill="currentColor" />
      <line
        x1="34"
        y1="34"
        x2="52"
        y2="52"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}
