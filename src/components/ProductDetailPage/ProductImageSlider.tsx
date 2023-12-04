import React from 'react';
import EmblaCarousel from '../Slider/EmblaCarousel';

type Props = {
  imgs: string[];
};

const ProductImageSlider = ({ imgs }: Props) => {
  const photoData = imgs;

  return (
    <div className="flex justify-center items-center w-full h-3/5 rounded-md font-thin text-xl my-3 border-black border-2">
      {!!imgs.length && (
        <EmblaCarousel
          slides={photoData.map((imageSrc, idx) => (
            <img key={idx} src={`${imageSrc}`} className="object-cover p-3" alt=""></img>
          ))}
          options={{
            align: 'start',
            loop: true,
            skipSnaps: false,
            inViewThreshold: 0.7,
            dragFree: false
          }}
          slideHeight="h-full lg:h-4/6"
          slideWidth="w-full sm:w-1/2 lg:w-full"
          isSlideLength={true}
          buttonPosition="center"
        />
      )}
    </div>
  );
};

export default ProductImageSlider;
