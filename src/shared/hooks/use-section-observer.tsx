'use client';
import { useGSAP } from '@gsap/react';
import { useAppDispatch } from '@shared-hooks';
import {
  Anchor,
  setActiveSlide,
  setHeaderBackground,
} from '@shared-store/states';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject } from 'react';

const anchors: Anchor[] = ['first', 'second', 'third', 'fourth'];

export const useSectionObserver = (scope: RefObject<HTMLElement | null>) => {
  const dispatch = useAppDispatch();

  useGSAP(
    () => {
      anchors.forEach(anchor => {
        ScrollTrigger.create({
          trigger: `.${anchor}`,
          start: 'top top',
          end: 'bottom top',
          onEnter: () => {
            dispatch(setActiveSlide([anchor, 'down']));
            dispatch(setHeaderBackground(anchor));
            document.body.classList.toggle(
              'darkGradient',
              anchor === 'second' || anchor === 'fourth',
            );
          },
          onEnterBack: () => {
            dispatch(setActiveSlide([anchor, 'up']));
            dispatch(setHeaderBackground(anchor));
            document.body.classList.toggle(
              'darkGradient',
              anchor === 'second' || anchor === 'fourth',
            );
          },
        });
      });
    },
    { scope, dependencies: [dispatch] },
  );
};
