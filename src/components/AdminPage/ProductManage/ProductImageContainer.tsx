import React, { useEffect, useState } from 'react';

type Props = {
  images: File[];
  deleteImage: (idx: number) => void;
};

const ProductImageContainer = ({ images, deleteImage }: Props) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageLoad = (file: File, idx: number) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const url = e.target?.result as string;
      setImagePreviews((prevPreviews) => {
        const newPreviews = [...prevPreviews];
        newPreviews[idx] = url;
        return newPreviews;
      });
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    images.forEach((file, idx) => handleImageLoad(file, idx));
  }, [images]);

  return (
    <React.Fragment>
      {!!images.length &&
        images.map((file, idx) => (
          <div
            key={file.lastModified}
            className="mx-3 mt-6 flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0"
          >
            {imagePreviews[idx] && (
              <div className="w-[250px] h-[300px] flex justify-center items-center">
                <img src={imagePreviews[idx]} alt="preview" className="w-full max-h-[300px] aspect-auto" />
              </div>
            )}
            <p>{file.name}</p>
            <button
              className="mt-auto h-10 text-xs border hover:border hover:border-blue-300 hover:bg-blue-50"
              onClick={() => deleteImage(idx)}
            >
              삭제하기
            </button>
          </div>
        ))}
    </React.Fragment>
  );
};

export default ProductImageContainer;
