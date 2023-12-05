import React from 'react';
import EmblaCarousel from '../Slider/EmblaCarousel';

type Props = {
  imgs: string[];
};

const ProductImageSlider = ({ imgs }: Props) => {
  const photoData = imgs;

  return (
    <div className="flex flex-wrap justify-center items-center w-full h-auto rounded-md font-thin text-xl my-3 border-black border-2">
      {!!imgs.length && (
        <EmblaCarousel
          slides={photoData.map((imageSrc, idx) => (
            <div key={idx} className="w-full h-full p-5 flex justify-center items-center">
              <img src={`${imageSrc}`} className="object-cover" alt=""></img>
            </div>
          ))}
          options={{
            align: 'start',
            loop: true,
            skipSnaps: false,
            inViewThreshold: 0.7,
            dragFree: false
          }}
          slideHeight="h-[20rem] lg:h-[39rem]"
          slideWidth="w-full sm:w-1/2 lg:w-full"
          isSlideLength={true}
          buttonPosition="center"
        />
      )}
    </div>
  );
};

export default ProductImageSlider;
