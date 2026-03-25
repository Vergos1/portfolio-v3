import { Bulge } from '@components-ui';
import { AboutWrapper } from './about-wrapper';

export const AboutSection = () => {
  return (
    <section className="section section__2 second lightGradient items-center justify-center px-paddingX py-paddingY text-colorDark">
      <Bulge type="Dark" />
      <AboutWrapper />
    </section>
  );
};
