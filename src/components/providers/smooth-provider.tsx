'use client';
import { useGSAP } from '@gsap/react';
import { smoothConfig } from '@shared-config';
import gsap from 'gsap';
import { CustomEase, ScrollSmoother, ScrollTrigger, SplitText } from 'gsap/all';

gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  CustomEase,
  useGSAP,
);

export const SmoothProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  useGSAP(() => {
    ScrollSmoother.create(smoothConfig);
  });

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
};
