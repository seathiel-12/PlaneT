import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type ShadowRevealOptions = {
  /** selector of the items inside the container */
  selector?: string;
  /** shadow at the start of the animation */
  fromShadow?: string;
  /** shadow at the end of the animation */
  toShadow?: string;
  fromOpacity?: number;
  toOpacity?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  /** ScrollTrigger start position */
  start?: string;
  once?: boolean;
};

const DEFAULTS: Required<ShadowRevealOptions> = {
  selector: ':scope > *',
  fromShadow: '0px 0px 0px 0px rgba(15, 23, 42, 0)',
  toShadow: '0px 18px 40px -12px rgba(15, 23, 42, 0.28)',
  fromOpacity: 0.35,
  toOpacity: 1,
  duration: 1,
  stagger: 0.15,
  ease: 'power2.out',
  start: 'top 85%',
  once: true,
};

/**
 * Progressively grows the box-shadow of each item while fading it in,
 * when the container enters the viewport.
 *
 * @returns cleanup function reverting the animation and its ScrollTrigger
 */
export const shadowRevealOnScroll = (
  container: HTMLElement | null,
  options: ShadowRevealOptions = {}
): (() => void) => {
  if (!container) return () => {};

  const {
    selector,
    fromShadow,
    toShadow,
    fromOpacity,
    toOpacity,
    duration,
    stagger,
    ease,
    start,
    once,
  } = { ...DEFAULTS, ...options };

  const items = gsap.utils.toArray<HTMLElement>(container.querySelectorAll(selector));
  if (!items.length) return () => {};

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set(items, { opacity: toOpacity, boxShadow: toShadow });
    return () => {};
  }

  const ctx = gsap.context(() => {
    gsap.fromTo(
      items,
      { opacity: fromOpacity, boxShadow: fromShadow },
      {
        opacity: toOpacity,
        boxShadow: toShadow,
        borderRadius:'16px',
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: container,
          start,
          once,
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      }
    )
  }, container);

  return () => ctx.revert();
};

/**
 * React binding for {@link shadowRevealOnScroll}. Attach the returned ref to the container.
 */
export const useShadowRevealOnScroll = <T extends HTMLElement = HTMLDivElement>(
  options: ShadowRevealOptions = {}
) => {
  const ref = useRef<T>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useLayoutEffect(() => shadowRevealOnScroll(ref.current, optionsRef.current), []);

  return ref;
};

export default shadowRevealOnScroll;
