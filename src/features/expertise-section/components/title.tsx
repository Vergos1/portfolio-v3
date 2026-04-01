'use client';

import { useRef } from 'react';
import { useTitleAnimation } from '../hooks';

export const Title = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useTitleAnimation(rootRef);

  return (
    <div
      ref={rootRef}
      className="general-title col-center h-full gap-1 xl:gap-2 2xl:gap-4"
    >
      <div className="first-text-split overflow-hidden py-3 2xl:py-0">
        <h1>Here are</h1>
      </div>

      <div className="second-text-split overflow-hidden py-3 2xl:py-0">
        <h1>the stories</h1>
      </div>
    </div>
  );
};
