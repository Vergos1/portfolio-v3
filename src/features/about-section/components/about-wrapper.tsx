import { useAboutAnimation } from '../hooks';
import { MarqueeRow } from './marquee-row';

export const AboutWrapper = () => {
  useAboutAnimation();

  return (
    <div className="message-content">
      <div className="flex-center container relative mx-auto">
        <div className="h-full w-full">
          <div className="msg-wrapper">
            <h1 className="first-message">
              Every line of <br /> code has a story
            </h1>

            <h1 className="second-message">
              Scroll to <br /> see where <br /> ideas became real
            </h1>
          </div>
          <div className="flex-center mt-10 md:mt-8">
            <div className="flex-center max-w-md overflow-hidden px-4">
              <p>
                I don&apos;t just write code — I obsess over every interaction,
                every frame, every pixel until it feels exactly right.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
