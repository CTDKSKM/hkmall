export interface User {
  uid: string;
  displayName: string;
  email: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imgs: string[];
  color?: string;
  size?: string;
  brand?: string;
  inventory?: number;
  like: number;
}
export enum Category {
  ALL = '전체',
  T_SHIRTS = '티셔츠',
  TRAINING_CLOTHS = '트레이닝복',
  HAT = '모자'
}
