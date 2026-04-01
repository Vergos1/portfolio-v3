import { useTitleAnimation } from '../hooks';

export const Title = () => {
  useTitleAnimation();

  return (
    <div className="general-title col-center h-full gap-16 xl:gap-24 2xl:gap-32">
      <div className="first-text-split overflow-hidden py-3 2xl:py-0">
        <h1>Here are</h1>
      </div>

      <div className="second-text-split overflow-hidden py-3 2xl:py-0">
        <h1>the stories</h1>
      </div>
    </div>
  );
};
