import { ProductSize } from './ProductSize';
export interface Product {
  id: number;
  category: string;
  name: string;
  description: string;
  productSize: ProductSize[];
}
