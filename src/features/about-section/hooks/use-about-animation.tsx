import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';

export const useAboutAnimation = () => {
  useGSAP(() => {
    const firstMsgSplit = SplitText.create('.first-message', {
      type: 'words',
    });
    const paragraphSplit = SplitText.create('.message-content p', {
      type: 'words,lines',
      linesClass: 'paragraph-line',
    });

    const PIN_DURATION = 2500;
    const H1_END = PIN_DURATION * 0.6;
    const P_START = PIN_DURATION * 0.55;

    ScrollTrigger.create({
      trigger: '.section__2',
      pin: true,
      start: 'center center',
      end: `+=${PIN_DURATION}`,
      anticipatePin: 1,
    });

    gsap.to(firstMsgSplit.words, {
      color: 'var(--colorDark)',
      ease: 'none',
      stagger: 1,
      scrollTrigger: {
        trigger: '.section__2',
        start: 'center center',
        end: `+=${H1_END}`,
        scrub: 0.8,
      },
    });

    // Параграф — влетает после h1
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '.section__2',
          start: `center center+=${P_START}`,
          end: `center center+=${PIN_DURATION}`,
          scrub: 0.8,
        },
      })
      .from(paragraphSplit.words, {
        yPercent: 110,
        rotate: 3,
        ease: 'power2.out',
        duration: 1,
        stagger: 0.015,
      });
  });
};
