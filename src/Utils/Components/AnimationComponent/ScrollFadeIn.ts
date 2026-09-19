import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DEFAULTS = {
  selector: ':scope > *',
  y: 80,
  opacity: 0,
  duration: 0.9,
  stagger: 0.05,
  ease: 'power3.out',
  start: 'top 80%', // L'animation démarre quand les éléments arrivent à 80% du viewport
  once: true,
  markers: false, // À activer pour déboguer
};

/**
 * Fade + upward translate reveal for a set of elements when they enter the viewport.
 * L'animation se déclenche quand les éléments deviennent visibles dans la fenêtre.
 *
 * @param {HTMLElement} container element holding the items to reveal
 * @param {Partial<typeof DEFAULTS>} options - Options personnalisées
 * @returns {() => void} cleanup function reverting the animation and its ScrollTrigger
 */
export const fadeInOnScroll = (container: any, options = {}) => {
  if (!container) return () => {};

  const { selector, y, opacity, duration, stagger, ease, start, once, markers } = {
    ...DEFAULTS,
    ...options,
  };

  const items:HTMLElement[] = gsap.utils.toArray(container.querySelectorAll(selector));
  if (!items.length) return () => {};

  // Respecte les préférences d'accessibilité
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set(items, { opacity, y });
    return () => {};
  }

  const ctx = gsap.context(() => {
    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay: index * stagger,
          ease,
          scrollTrigger: {
            trigger: item,
            start,
            once,
            toggleActions: once ? 'play none none none' : 'play none none reverse',
            markers,
          },
        }
      );
    });
  }, container);

  return () => ctx.revert();
};

/**
 * React binding for {@link fadeInOnScroll}. Attach the returned ref to the container.
 *
 * @param {Partial<typeof DEFAULTS>} options
 * @returns {import('react').RefObject<HTMLElement>}
 */
export const useFadeInOnScroll = (options = {}) => {
  const ref = useRef(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useLayoutEffect(() => fadeInOnScroll(ref.current, optionsRef.current), []);

  return ref;
};

export default fadeInOnScroll;
