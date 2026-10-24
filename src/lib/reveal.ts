import { useEffect } from 'react';
import type { CSSProperties } from 'react';

/** Stagger helper: `style={d(120)}` sets the reveal delay custom property. */
export const d = (ms: number): CSSProperties => ({ '--d': `${ms}ms` }) as CSSProperties;

/**
 * One observer for every [data-reveal] node on the page. Runs after mount, reveals once,
 * and leaves the content alone entirely when the visitor asked for reduced motion.
 */
export function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!nodes.length) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -4% 0px', threshold: 0.02 },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
}
