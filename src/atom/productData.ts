import { atom } from 'recoil';
import { Product } from '../static/const/type';

export const productData = atom<Product[]>({
  key: 'productData',
  default: []
});
