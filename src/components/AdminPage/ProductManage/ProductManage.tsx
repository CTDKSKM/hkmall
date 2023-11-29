import React, { useEffect, useRef, useState } from 'react';
import ProductImageContainer from './ProductImageContainer';
import useProductQuery from '../../../hooks/useProductQuery';

type Props = {};

const categories = [
  { id: 1, name: '티셔츠' },
  { id: 2, name: '트레이닝복' },
  { id: 3, name: '모자' }
  // 추가 카테고리들...
];
const ProductManage = (props: Props) => {
  const { addProductMutation } = useProductQuery();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [isNameInputFocused, setIsNameInputFocused] = useState(false);
  const [isPriceInputFocused, setIsPriceInputFocused] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const imgRef = useRef<HTMLInputElement>(null);

  // 선택된 카테고리 상태
  const [selectedCategory, setSelectedCategory] = useState<{ id: number; name: string }>();

  // 셀렉트 박스 변경 핸들러
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = parseInt(e.target.value, 10);
    const selectedCategory = categories.find((category) => category.id === selectedCategoryId);
    setSelectedCategory(selectedCategory);
  };

  const handlePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = inputNumberFormat(e.target.value);
    setPrice(price);
  };

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files![0];
    if (newFile) {
      setImages((prev) => [...prev, newFile]);
    }
  };

  const clickImageInput = () => {
    if (imgRef.current) {
      imgRef.current.click();
    }
  };

  const deleteImage = (idx: number) => {
    const filteredImages = images.filter((_, imgIdx) => imgIdx !== idx);
    setImages(filteredImages);
  };

  const handleSubmit = async () => {
    // Firebase Firestore에 상품 정보, Storage에 이미지들 저장
    addProductMutation.mutate({ name, price, category: selectedCategory?.name!, like: 0, images });
  };
  // 제품 양식 초기화
  const initData = () => {
    setName('');
    setPrice('');
    setImages([]);
    setSelectedCategory({ id: 1, name: '티셔츠' });
  };
  useEffect(() => {
    if (addProductMutation.isSuccess) initData();
  }, [addProductMutation.isSuccess]);

  return (
    <div className="relative w-full flex flex-col items-center gap-3">
      {/* 상품등록 */}
      <button
        className="absolute right-0 px-5 py-2 border bg-blue-50 rounded-lg hover:border-blue-300 hover:bg-blue-100"
        onClick={handleSubmit}
      >
        등록하기
      </button>

      {/* 상품명 */}
      <div className={`productInputContainer ${isNameInputFocused ? 'border-blue-300' : ''}`}>
        <input
          type="text"
          value={name}
          onChange={handleNameInput}
          onFocus={() => setIsNameInputFocused(true)}
          onBlur={() => setIsNameInputFocused(false)}
          className="productInput"
        ></input>
        {!name && <p className="productInputPlaceHolder">상품명을 입력해 주세요.</p>}
      </div>

      {/* 가격 */}
      <div className={`productInputContainer ${isPriceInputFocused ? 'border-blue-300' : ''}`}>
        <input
          type="text"
          value={price}
          onChange={handlePriceInput}
          onFocus={() => setIsPriceInputFocused(true)}
          onBlur={() => setIsPriceInputFocused(false)}
          className="productInput"
        ></input>
        {!price && <p className="productInputPlaceHolder">가격을 입력해 주세요.</p>}
        {price && <p className="absolute top-1/2 -translate-y-1/2 right-2">(원)</p>}
      </div>

      {/* 카테고리 */}
      <div>
        <label htmlFor="categorySelect">카테고리 선택:</label>
        <select id="categorySelect" onChange={handleSelectChange} value={selectedCategory ? selectedCategory.id : ''}>
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* 이미지 */}
      <div className="grid-cols-1 sm:grid md:grid-cols-3">
        <ProductImageContainer images={images} deleteImage={deleteImage} />
        <button
          className="w-[250px] h-[300px] m-auto border rounded-xl flex justify-center items-center hover:border-blue-300"
          onClick={clickImageInput}
        >
          이미지 추가
        </button>
        <input ref={imgRef} type="file" accept="image/*" onChange={handleImageInput} className="w-0"></input>
      </div>
    </div>
  );
};

export default ProductManage;

function comma(str: string) {
  str = String(str);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function uncomma(str: string) {
  str = String(str);
  return str.replace(/[^\d]+/g, '');
}

function inputNumberFormat(value: string) {
  return comma(uncomma(value));
}
