'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import type { RefObject } from 'react';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const useAboutAnimation = (rootRef: RefObject<HTMLElement | null>) => {
  useGSAP(
    () => {
      const rootEl = rootRef.current;
      if (!rootEl) return;

      const sectionEl =
        (rootEl.closest('.section__2') as HTMLElement | null) ?? rootEl;

      const h1 = rootEl.querySelector('.first-message') as HTMLElement | null;
      const p = rootEl.querySelector('p') as HTMLElement | null;
      if (!h1 || !p) return;

      const headingSplit = SplitText.create(h1, { type: 'words,chars' });
      const paragraphSplit = SplitText.create(p, {
        type: 'lines,words',
        linesClass: 'paragraph-line',
      });

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

      gsap.set(h1, { transformPerspective: 800 });
      gsap.set(headingSplit.chars, {
        opacity: 0,
        yPercent: 120,
        rotateX: -70,
        transformOrigin: '50% 100%',
        filter: 'blur(8px)',
      });
      gsap.set(headingSplit.words, { color: 'var(--colorSecondaryLight)' });

      gsap.set(paragraphSplit.lines, {
        opacity: 0,
        yPercent: 60,
        filter: 'blur(10px)',
        clipPath: 'inset(0 0 100% 0)',
      });

      if (prefersReducedMotion) {
        gsap.set(headingSplit.chars, {
          opacity: 1,
          yPercent: 0,
          rotateX: 0,
          filter: 'none',
        });
        gsap.set(headingSplit.words, { color: 'var(--colorDark)' });
        gsap.set(paragraphSplit.lines, {
          opacity: 1,
          yPercent: 0,
          filter: 'none',
          clipPath: 'inset(0 0 0% 0)',
        });

        return () => {
          headingSplit.revert();
          paragraphSplit.revert();
        };
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: 'center center',
          end: '+=2800',
          scrub: 0.9,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(headingSplit.chars, {
        opacity: 1,
        yPercent: 0,
        rotateX: 0,
        filter: 'blur(0px)',
        stagger: { each: 0.01, from: 'start' },
        duration: 0.9,
        ease: 'power2.out',
      });

      tl.to(
        headingSplit.words,
        {
          color: 'var(--colorDark)',
          yPercent: -6,
          duration: 0.55,
          stagger: { each: 0.06, from: 'center' },
          ease: 'power1.out',
        },
        '>-0.15',
      );

      tl.to(
        headingSplit.words,
        {
          yPercent: 0,
          duration: 0.35,
          stagger: { each: 0.03, from: 'center' },
          ease: 'power1.out',
        },
        '>-0.2',
      );

      tl.to(
        paragraphSplit.lines,
        {
          opacity: 1,
          yPercent: 0,
          filter: 'blur(0px)',
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.9,
          stagger: 0.12,
          ease: 'power2.out',
        },
        '>-0.05',
      );

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === sectionEl) st.kill();
        });
        headingSplit.revert();
        paragraphSplit.revert();
      };
    },
    { scope: rootRef },
  );
};
