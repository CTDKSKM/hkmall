import { atom } from 'recoil';
import { Category } from '../static/const/type';

export const currentCategory = atom<Category>({
  key: 'category',
  default: Category.전체
});
