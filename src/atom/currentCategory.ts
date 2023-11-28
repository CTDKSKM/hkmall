import { atom } from 'recoil';
import { Category } from '../static/const/type';

export const currentCategory = atom<Category>({
  key: 'currentCategory',
  default: Category.ALL
});
