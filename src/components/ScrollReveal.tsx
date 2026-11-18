'use client';

import { useEffect } from 'react';

function clearReveal(element: HTMLElement) {
  element.style.removeProperty('--scroll-reveal-filter');
  element.style.removeProperty('--scroll-reveal-opacity');
}

export function ScrollReveal() {
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const pending = new Set(document.querySelectorAll<HTMLElement>('#contenido [data-scroll-reveal]'));
    let frame = 0;

    function update() {
      frame = 0;
      const viewportHeight = window.innerHeight;
      const measurements = Array.from(pending, (element) => ({
        element,
        bounds: element.getBoundingClientRect(),
      }));

      for (const { element, bounds } of measurements) {
        const entered = viewportHeight - bounds.top;
        const distance = Math.min(112, viewportHeight * 0.15, bounds.height);

        if (entered >= distance) pending.delete(element);

        if (entered <= 0 || entered >= distance) {
          clearReveal(element);
          continue;
        }

        const remaining = (1 - entered / distance) ** 2;
        element.style.setProperty('--scroll-reveal-filter', `blur(${4.5 * remaining}px)`);
        element.style.setProperty('--scroll-reveal-opacity', String(1 - 0.42 * remaining));
      }
    }

    function scheduleUpdate() {
      if (motion.matches && pending.size && !frame) {
        frame = window.requestAnimationFrame(update);
      }
    }

    function syncMotion() {
      window.cancelAnimationFrame(frame);
      frame = 0;

      // Content already on screen starts sharp, including direct anchor visits.
      for (const element of pending) {
        clearReveal(element);
        if (motion.matches && element.getBoundingClientRect().top < window.innerHeight) {
          pending.delete(element);
        }
      }
    }

    syncMotion();
    motion.addEventListener('change', syncMotion);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      motion.removeEventListener('change', syncMotion);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      pending.forEach(clearReveal);
    };
  }, []);

  return null;
}
