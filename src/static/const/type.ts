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
}
export enum Category {
  전체 = '전체',
  티셔츠 = '티셔츠',
  트레이닝복 = '트레이닝복',
  모자 = '모자'
}
