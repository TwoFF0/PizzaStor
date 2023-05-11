import { Product } from './Product';

export interface OrderItem {
  id: number;
  name: string;
  size: string;
  price: number;
  weight: number;
  imageUrl: string;
  count: number;
}
