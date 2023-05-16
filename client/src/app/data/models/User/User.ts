import { Order } from '../Cart/Order';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  age: number;
  city: string;
  country: string;
  balance: number;
  orders: Order[];
  roles: string[]
}
