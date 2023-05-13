import { OrderDetailToView } from './OrderDetailToView';

export interface OrderToView {
  totalPrice: number;
  orderDate: string;
  orderDetails: OrderDetailToView[];
}
