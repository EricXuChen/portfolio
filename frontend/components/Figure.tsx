import { T } from "./T";

/** "50+" → <span data-count="50" data-suffix="+">50+</span>: counts up once on screen. */
export function Figure({ value, className }: { value: string; className?: string }) {
  const m = /^(\d+)(.*)$/.exec(value);
  if (!m) return <span className={className}>{value}</span>;
  return (
    <span className={className} data-count={m[1]} data-suffix={m[2]} data-pad={m[1].length > 1 && m[1].startsWith("0") ? m[1].length : undefined}>
      {value}
    </span>
  );
}

export { T };
