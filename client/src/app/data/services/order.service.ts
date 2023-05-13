import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartItem } from '../models/Cart/CartItem';
import { OrderDetail } from '../models/Cart/OrderDetail';
import { Order } from '../models/Cart/Order';
import { AccountService } from './account.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly baseUrl = environment.apiUrl;
  private ordersLoaded = false;
  private orders: Order[] = [];

  constructor(
    private httpClient: HttpClient,
    private accountService: AccountService,
    private productService: ProductService
  ) {}

  async postOrder(
    cartItems: CartItem[],
    userId: number,
    total: number
  ): Promise<number | undefined> {
    let orderDetails: OrderDetail[] = [];

    cartItems.forEach((item) => {
      orderDetails.push({
        count: item.count,
        productId: item.productId,
        productSizeId: item.productSizeId,
      } as OrderDetail);
    });

    const order: Order = {
      userId: userId,
      totalPrice: total,
      orderDate: new Date().toISOString(),
      orderDetails: orderDetails,
    };

    return this.httpClient
      .post<number>(this.baseUrl + 'orders', order)!
      .toPromise();
  }

  async getOrders() {
    if (!this.ordersLoaded) {
      this.orders = (await this.httpClient
        .get<Order[]>(this.baseUrl + `orders/${this.accountService.userName}`)
        .toPromise()) as Order[];

      this.ordersLoaded = true;
    }

    const products = await this.productService.getProducts();

    const ordersToView = this.orders.map((order) => {
      const orderDetailsToView = order.orderDetails.map((item) => {
        const prod = products.find((x) => x.id === item.productId)!;
        const prodSize = prod.productSize.find(
          (x) => x.id == item.productSizeId
        )!;

        return {
          name: prod.name,
          size: prodSize.size || '-',
          price: prodSize.price,
          weight: prodSize.weight,
          imageUrl: prodSize.imageUrl,
          count: item.count,
        };
      });

      return {
        orderDate: new Date(Date.parse(order.orderDate)).toLocaleString(),
        totalPrice: order.totalPrice,
        orderDetails: orderDetailsToView,
      };
    });

    return ordersToView;
  }
}
