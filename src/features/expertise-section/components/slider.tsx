import { useRef } from 'react';
import { projectsList } from '../constants';
import { useSliderAnimation } from '../hooks/use-slider-animation';

export const Slider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  useSliderAnimation(sliderRef);

  return (
    <div ref={sliderRef} className="slider-wrapper">
      <div className="flavors">
        {projectsList.map(flavor => (
          <div
            key={flavor.name}
            className={`relative z-30 h-80 w-96 flex-none md:h-[50vh] md:w-[90vw] lg:h-[70vh] lg:w-[50vw] ${flavor.rotation}`}
          >
            <img
              src={`/images/projects-test/mockup-1.png`}
              alt=""
              className="absolute -top-[200px]"
            />

            {/* <img
              src={`/images/projects-test/${flavor.color}-drink.webp`}
              alt=""
              className="drinks"
            />

            <img
              src={`/images/projects-test/${flavor.color}-elements.webp`}
              alt=""
              className="elements"
            /> */}

            {/* <h1>{flavor.name}</h1> */}
          </div>
        ))}
      </div>
    </div>
  );
};
