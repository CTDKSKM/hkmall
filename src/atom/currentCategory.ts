import { atom } from 'recoil';

export const category = {
  ALL: '전체',
  TOP: '상의',
  BOTTOM: '하의',
  SHOES: '신발',
  HAT: '모자',
  ACCESSORIES: '악세사리'
};
export const currentCategory = atom<string>({
  key: 'currentCategory',
  default: category.ALL
});
