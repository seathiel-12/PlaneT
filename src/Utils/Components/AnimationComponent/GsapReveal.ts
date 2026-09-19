import { useLayoutEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type RevealOptions = {
  selector: string;
  start?: string;
  stagger?: number;
  containerRef?: RefObject<HTMLDivElement | null>;
  refreshKey?: string | number;
};

const useGsapReveal = ({ selector, start = 'top 84%', stagger = 0.08, containerRef: sharedRef, refreshKey }: RevealOptions, from: gsap.TweenVars) => {
  const localRef = useRef<HTMLDivElement>(null);
  const containerRef = sharedRef ?? localRef;

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = gsap.utils.toArray<HTMLElement>(container.querySelectorAll(selector));
    if (!elements.length) return;

    const context = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(elements, { opacity: 1, clearProps: 'transform' });
        return;
      }

      gsap.fromTo(
        elements,
        { opacity: 0, ...from },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start,
            once: true,
            toggleActions: 'play none none none',
          },
        }
      );
    }, container);

    return () => context.revert();
  }, [from.x, from.y, from.scale, refreshKey, selector, stagger, start]);

  return containerRef;
};

export const useGsapTextReveal = (options: Omit<RevealOptions, 'selector'> = {}) =>
  useGsapReveal({ ...options, selector: '[data-reveal-text]' }, { y: 28 });

export const useGsapCardReveal = (options: Omit<RevealOptions, 'selector'> = {}) =>
  useGsapReveal({ ...options, selector: '[data-reveal-card]' }, { y: 42, scale: 0.96 });
