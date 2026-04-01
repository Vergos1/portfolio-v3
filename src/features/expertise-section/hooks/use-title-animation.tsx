'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import type { RefObject } from 'react';


export const useTitleAnimation = (rootRef: RefObject<HTMLElement | null>) => {
  useGSAP(
    () => {
      const rootEl = rootRef.current;
      if (!rootEl) return;

      const sectionEl =
        (rootEl.closest('.flavor-section') as HTMLElement | null) ?? rootEl;

      const firstH1 = rootEl.querySelector('.first-text-split h1') as
        | HTMLElement
        | null;
      const secondH1 = rootEl.querySelector('.second-text-split h1') as
        | HTMLElement
        | null;
      if (!firstH1 || !secondH1) return;

      const firstSplit = SplitText.create(firstH1, { type: 'chars' });
      const secondSplit = SplitText.create(secondH1, { type: 'chars' });

      const flavorTextScroll = sectionEl.querySelector('.flavor-text-scroll') as
        | HTMLElement
        | null;

      gsap.from(firstSplit.chars, {
        yPercent: 200,
        stagger: 0.02,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top 85%',
        },
      });

      if (flavorTextScroll) {
        gsap.to(flavorTextScroll, {
          duration: 0.9,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top 25%',
          },
        });
      }

      gsap.from(secondSplit.chars, {
        yPercent: 200,
        stagger: 0.02,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top 45%',
        },
      });

      return () => {
        firstSplit.revert();
        secondSplit.revert();
      };
    },
    { scope: rootRef },
  );
};