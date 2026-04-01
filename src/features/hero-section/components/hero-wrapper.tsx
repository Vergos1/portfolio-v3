'use client';

import { Button, Magentic } from '@components-ui';
import { useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useHeroAnimation } from '../hooks';

export const HeroWrapper = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useHeroAnimation(rootRef);

  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  });

  const isTablet = useMediaQuery({
    query: '(max-width: 1024px)',
  });

  return (
    <div ref={rootRef} className="hero-container">
      {isTablet ? (
        <>
          {isMobile && (
            <img
              src=""
              alt="hero"
              className="absolute bottom-40 size-full object-cover"
            />
          )}
          <img
            src=""
            alt="hero"
            className="object-auto absolute bottom-0 left-1/2 -translate-x-1/2"
          />
        </>
      ) : (
        <div className="absolute inset-0">
          <video
            src="/video/video-5.mp4"
            autoPlay
            muted
            playsInline
            loop
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

          <div className="grain-overlay absolute inset-0" />
        </div>
      )}
      <div className="hero-content opacity-0">
        <div className="overflow-hidden">
          <h1 className="hero-title">frontend & fullstack</h1>
        </div>
        <Magentic>
          <div
            style={{
              clipPath: 'polygon(50% 0, 50% 0, 50% 100%, 50% 100%)',
            }}
            className="hero-text-scroll"
          >
            <div className="hero-subtitle">
              <h2>developer</h2>
            </div>
          </div>
        </Magentic>
        <h2 className="hero-description">
          I build fast, clean, and memorable digital experiences — from
          pixel-perfect interfaces to scalable fullstack solutions.
        </h2>

        <Button
          textColor="colorDark"
          className="mt-10 bg-colorLight md:mt-16"
          params="View all Work"
          href="#"
        >
          View all Work
        </Button>
      </div>
    </div>
  );
};
