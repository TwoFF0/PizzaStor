import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { AuthenticateModalComponent } from 'src/app/features/auth/authenticate-modal.component';
import { ToastrService } from 'ngx-toastr';
import { OrderItem } from '../models/OrderItem';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Product } from '../models/Product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private productService: ProductService,
    private storage: LocalStorageService
  ) {}

  products: Product[];
  orderItems: OrderItem[] = [];
  plainOrder: string;

  addToCart(itemToAdd: OrderItem) {
    if (!this.isUserLoggedIn()) {
      this.showLoginPrompt();
      return;
    }

    if (this.storage.getItem('cart') == null) {
      this.storage.addItem('cart', '');
    }

    const cart = this.storage.getItem('cart') || '';
    const size = itemToAdd.size || 'WS';
    const orderItemString = this.createOrderItemString(itemToAdd, size);

    this.fillOrderItems(itemToAdd);

    if (cart.includes(orderItemString)) {
      this.changeCount(itemToAdd, true);
      return;
    }

    this.storage.addItem('cart', cart + orderItemString);
  }

  fillOrderItems(itemToAdd: OrderItem) {
    const { name, size } = itemToAdd;
    const existingItem = this.orderItems.find(
      (x) => x.name === name && x.size === size
    );

    if (existingItem) {
      existingItem.count++;
    } else {
      this.orderItems.push(itemToAdd);
    }
  }

  async setOrderItems(plainCart: string) {
    await this.getProducts();

    const plainItems = plainCart.split('|').slice(0, -1);

    for (const plainItem of plainItems) {
      const [id, size, count] = plainItem.split('.');
      const product = this.products.find((p) => p.id === +id);
      const productSize = product?.productSize.find(
        (s) => s.size === size || !s.size
      );

      if (!product || !productSize) {
        continue;
      }

      const orderItem: OrderItem = {
        id: product.id,
        name: product.name,
        size: productSize.size || 'WS',
        price: productSize.price,
        weight: productSize.weight,
        imageUrl: productSize.imageUrl,
        count: +count,
      };

      this.fillOrderItems(orderItem);
    }
  }

  async getProducts() {
    this.products = await this.productService.getProducts();
  }

  changeCount(orderItem: OrderItem, increment: boolean) {
    const cart = this.storage.getItem('cart');
    if (!cart) {
      throw new Error('Cart is empty.');
    }

    const searchStr = `${orderItem.id}.${orderItem.size}.`;
    const regex = new RegExp(`${searchStr}(\\d+)\\|`);
    const match = cart.match(regex);
    if (!match) {
      throw new Error('Order item not found in cart.');
    }

    const count = parseInt(match[1]);
    const newCount = increment ? count + 1 : count - 1;

    if (newCount === 0) {
      const newCart = cart.replace(regex, '');
      this.storage.addItem('cart', newCart);

      return;
    }

    const newCart = cart.replace(regex, `${searchStr}${newCount}|`);
    this.storage.addItem('cart', newCart);
  }

  isUserLoggedIn() {
    return !!this.storage.getItem('user');
  }

  showLoginPrompt() {
    this.toastr.info('Please Log in before making an order :)');
    this.toModalAuthenticate();
  }

  createOrderItemString(orderItem: OrderItem, size: string): string {
    return `${orderItem.id}.${size}.${orderItem.count}|`;
  }

  toModalAuthenticate() {
    this.modalService.open(AuthenticateModalComponent, {
      centered: true,
      size: 'm',
    });
  }
}
