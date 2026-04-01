'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import type { RefObject } from 'react';

export const useHeroAnimation = (rootRef: RefObject<HTMLElement | null>) => {
  useGSAP(
    () => {
      const rootEl = rootRef.current;
      if (!rootEl) return;

      const heroContent = rootEl.querySelector(
        '.hero-content',
      ) as HTMLElement | null;
      const heroTitle = rootEl.querySelector(
        '.hero-title',
      ) as HTMLElement | null;
      const heroTextScroll = rootEl.querySelector(
        '.hero-text-scroll',
      ) as HTMLElement | null;
      const heroSubtitle = rootEl.querySelector(
        '.hero-subtitle',
      ) as HTMLElement | null;

      if (!heroContent || !heroTitle || !heroTextScroll) return;

      const titleSplit = SplitText.create(heroTitle, { type: 'chars' });

      gsap.set(heroTextScroll, { rotation: -4 });

      const fingerTl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0,
        paused: true,
      });

      fingerTl
        .to(
          heroTextScroll,
          {
            x: 8,
            duration: 1,
            ease: 'power1.inOut',
          },
          0.5,
        )
        .to(
          heroTextScroll,
          {
            scale: 1.06,
            x: 14,
            skewX: -3,
            duration: 0.07,
            ease: 'power4.out',
          },
          1,
        )
        .to(
          heroSubtitle ?? heroTextScroll,
          {
            filter: 'brightness(2) contrast(1.3)',
            duration: 0.07,
          },
          1,
        )
        .to(
          heroTextScroll,
          {
            scale: 1,
            x: 8,
            skewX: 0,
            duration: 0.5,
            ease: 'elastic.out(1.2, 0.4)',
          },
          1.07,
        )
        .to(
          heroSubtitle ?? heroTextScroll,
          {
            filter: 'brightness(1) contrast(1)',
            duration: 0.3,
          },
          1.07,
        )
        .to(
          heroTextScroll,
          {
            y: -5,
            duration: 1.75,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 1,
          },
          1.5,
        )
        .to(
          heroTextScroll,
          {
            y: -20,
            rotation: -3,
            x: 10,
            duration: 0.5,
            ease: 'power2.out',
          },
          4,
        )
        .to(
          heroTextScroll,
          {
            y: -30,
            x: 16,
            rotation: -5,
            duration: 0.15,
            ease: 'power4.out',
          },
          5,
        )
        .to(
          heroSubtitle ?? heroTextScroll,
          {
            filter: 'brightness(1.6) contrast(1.2)',
            duration: 0.1,
          },
          5,
        )
        .to(
          heroTextScroll,
          {
            y: -8,
            x: 4,
            rotation: 1,
            duration: 0.6,
            ease: 'elastic.out(1, 0.45)',
          },
          5.15,
        )
        .to(
          heroSubtitle ?? heroTextScroll,
          {
            filter: 'brightness(1) contrast(1)',
            duration: 0.4,
          },
          5.15,
        )
        .to(
          heroTextScroll,
          {
            y: -3,
            x: 1,
            rotation: 0,
            duration: 0.25,
            ease: 'power1.inOut',
          },
          5.75,
        )
        .to(
          heroTextScroll,
          {
            y: 0,
            x: 0,
            rotation: -4,
            duration: 1.5,
            ease: 'power3.inOut',
          },
          8,
        )
        .to(
          heroSubtitle ?? heroTextScroll,
          {
            filter: 'brightness(1.1)',
            duration: 0.3,
          },
          9,
        )
        .to(
          heroSubtitle ?? heroTextScroll,
          {
            filter: 'brightness(1)',
            duration: 0.5,
          },
          9.3,
        )
        .to({}, { duration: 0.2 }, 9.8);

      // Входная анимация
      const introTl = gsap.timeline({
        delay: 1,
        onComplete: () => {
          fingerTl.play();
        },
      });

      introTl
        .to(heroContent, { opacity: 1, y: 0, ease: 'power1.inOut' })
        .to(
          heroTextScroll,
          {
            duration: 1,
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            ease: 'circ.out',
          },
          '-=0.5',
        )
        .from(
          titleSplit.chars,
          {
            yPercent: 200,
            stagger: 0.02,
            ease: 'power2.out',
          },
          '-=0.5',
        );

      // ScrollTrigger (скролл-исчезание hero)
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: rootEl,
          start: '1% top',
          end: 'bottom top',
          scrub: 0.9,
          invalidateOnRefresh: true,
        },
      });

      heroTl.to(rootEl, {
        rotate: 7,
        scale: 1.05,
        yPercent: 30,
        filter: 'blur(8px)',
        opacity: 0.3,
        ease: 'none',
      });

      return () => {
        introTl.kill();
        fingerTl.kill();
        heroTl.kill();
        titleSplit.revert();
      };
    },
    { scope: rootRef },
  );
};
