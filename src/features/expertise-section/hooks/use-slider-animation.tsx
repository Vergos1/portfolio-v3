'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { RefObject } from 'react';
import { useMediaQuery } from 'react-responsive';

export const useSliderAnimation = (
  sliderRef: RefObject<HTMLDivElement | null>,
) => {
  const isTablet = useMediaQuery({
    query: '(max-width: 1024px)',
  });

  useGSAP(
    () => {
      const rootEl = sliderRef.current;
      if (!rootEl) return;

      const sectionEl =
        (rootEl.closest('.flavor-section') as HTMLElement | null) ?? rootEl;

      const flavorsEl = rootEl.querySelector('.flavors') as HTMLElement | null;
      if (!flavorsEl) return;

      const firstText = sectionEl.querySelector(
        '.first-text-split',
      ) as HTMLElement | null;
      const secondText = sectionEl.querySelector(
        '.second-text-split',
      ) as HTMLElement | null;
      const flavorTextScroll = sectionEl.querySelector(
        '.flavor-text-scroll',
      ) as HTMLElement | null;

      const scrollAmount = flavorsEl.scrollWidth - window.innerWidth;

      let horizontalTl: gsap.core.Timeline | undefined;
      if (!isTablet && scrollAmount > 0) {
        horizontalTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            start: '2% top',
            end: `+=${scrollAmount + 400}`,
            scrub: 0.9,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        horizontalTl.to(flavorsEl, {
          x: -scrollAmount,
          ease: 'none',
        });
      }

      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top top',
          end: 'bottom 80%',
          scrub: 0.9,
          invalidateOnRefresh: true,
        },
      });

      if (firstText) {
        titleTl.to(firstText, { xPercent: -30, ease: 'none' }, 0);
      }
      if (flavorTextScroll) {
        titleTl.to(flavorTextScroll, { xPercent: -22, ease: 'none' }, 0);
      }
      if (secondText) {
        titleTl.to(secondText, { xPercent: -10, ease: 'none' }, 0);
      }

      return () => {
        horizontalTl?.kill();
        titleTl.kill();
      };
    },
    { scope: sliderRef },
  );
};
