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
                <img key={idx} src={`${imageSrc}`} className="object-cover p-3" alt=""></img>
              ))}
              options={{
                align: 'start',
                loop: true,
                skipSnaps: false,
                inViewThreshold: 0.7,
                dragFree: false
              }}
              slideHeight=" sm:h-[12.5rem] lg:h-[40.5rem]"
              slideWidth="w-full sm:w-1/2 lg:w-full"
              isSlideLength={true}
              buttonPosition="center"
            />
          )}
        </div>
  );
};

export default ProductImageSlider;
{/* <div className="flex justify-center items-center w-full rounded-md font-thin text-xl my-3">
{!!imgs.length && (
  <EmblaCarousel
    slides={photoData.map((imageSrc, idx) => (
      <img key={idx} src={`${imageSrc}`} className="object-cover" alt=""></img>
    ))}
    options={{
      align: 'start',
      loop: true,
      skipSnaps: false,
      inViewThreshold: 0.7,
      dragFree: false
    }}
    slideHeight="h-[220px] sm:h-[10.5rem] lg:h-[12.5rem]"
    slideWidth="w-full sm:w-1/2 lg:w-full"
    isSlideLength={true}
    buttonPosition="center"
  />
)}
</div> */}