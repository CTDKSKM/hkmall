import { Product } from "./type";

export const PRODUCTS_DUMMY: Product[] = [
  {
    id: 1,
    name: '스트라이프 패턴 티셔츠',
    category: '티셔츠',
    price: 25000,
    color: '블루',
    size: 'M',
    brand: '패션스타',
    inventory: 100,
    imgs: [
      'https://tecdn.b-cdn.net/img/new/standard/city/041.webp',
      'https://tecdn.b-cdn.net/img/new/standard/city/041.webp',
      'https://tecdn.b-cdn.net/img/new/standard/city/041.webp'
    ]
  },
  {
    id: 2,
    name: '스키니 진',
    category: '바지',
    price: 45000,
    color: '블랙',
    size: 'S',
    brand: '모던룩',
    inventory: 80,
    imgs: ['https://tecdn.b-cdn.net/img/new/standard/city/041.webp']
  },
  {
    id: 3,
    name: '플로럴 프린트 원피스',
    category: '원피스',
    price: 35000,
    color: '핑크',
    size: 'L',
    brand: '에스쁘아',
    inventory: 120,
    imgs: ['https://tecdn.b-cdn.net/img/new/standard/city/041.webp']
  }
];
