'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { RefObject } from 'react';

export const useMarqueeAnimation = ({
  wrapperRef,
  trackRef,
  reverse = false,
}: {
  wrapperRef: RefObject<HTMLElement | null>;
  trackRef: RefObject<HTMLElement | null>;
  reverse?: boolean;
}) => {
  useGSAP(
    () => {
      const wrapperEl = wrapperRef.current;
      const trackEl = trackRef.current;
      if (!wrapperEl || !trackEl) return;

      const totalWidth = trackEl.scrollWidth / 2;
      if (!totalWidth) return;

      const marqueeTween = gsap.to(trackEl, {
        x: reverse ? totalWidth : -totalWidth,
        duration: 60,
        ease: 'none',
        repeat: -1,
      });

      gsap.fromTo(
        wrapperEl,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: wrapperEl,
            start: 'top 80%',
          },
        },
      );

      return () => {
        marqueeTween.kill();
      };
    },
    { scope: wrapperRef },
  );
};
