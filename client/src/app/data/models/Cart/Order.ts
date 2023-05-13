import { OrderDetail } from './OrderDetail';

export interface Order {
  userId: number;
  totalPrice: number;
  orderDate: string;
  orderDetails: OrderDetail[];
}
