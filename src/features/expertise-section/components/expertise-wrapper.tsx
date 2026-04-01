import { Slider } from './slider';
import { Title } from './title';

export const ExpertiseWrapper = () => {
  return (
    <div className="flavor-section">
      <div className="relative flex h-full flex-col items-center lg:flex-row">
        <div className="h-80 flex-none md:mt-20 lg:h-full lg:w-[100%] xl:mt-0">
          <Title />
        </div>
        <div className="h-full">
          <Slider />
        </div>
      </div>
    </div>
  );
};
