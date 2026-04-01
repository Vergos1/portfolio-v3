'use client';

import '@styles/marquee.css';
import { useRef } from 'react';
import { STACK_ITEMS } from '../constants';
import { useMarqueeAnimation } from '../hooks';

export const MarqueeRow = ({ reverse = false }: { reverse?: boolean }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useMarqueeAnimation({ wrapperRef, trackRef, reverse });

  const items = [...STACK_ITEMS, ...STACK_ITEMS];
  return (
    <div ref={wrapperRef} className="marquee-wrapper">
      <div
        ref={trackRef}
        className={`marquee-track ${reverse ? 'marquee-reverse' : ''}`}
      >
        {items.map((item, i) => (
          <span key={`${item} ${i}`} className="marquee-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
