export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  color: string;
  size: string;
  brand: string;
  inventory: number;
  imgs: string[];
}
