import { atom } from 'recoil';

export const category = {
  ALL: '전체',
  T_SHIRTS: '티셔츠',
  TRAINING_CLOTHS: '트레이닝복',
  HAT: '모자'
};
export const currentCategory = atom<string>({
  key: 'currentCategory',
  default: category.ALL
});
