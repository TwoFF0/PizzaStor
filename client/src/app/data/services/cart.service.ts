import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { AuthenticateModalComponent } from 'src/app/features/auth/authenticate-modal.component';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from '../models/Cart/CartItem';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product/Product';

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
  cartItems: CartItem[] = [];
  plainCart: string;

  get total(): number {
    return +this.cartItems
      .reduce((acc, item) => acc + item.price * item.count, 0)
      .toFixed(2);
  }

  addToCart(itemToAdd: CartItem) {
    if (!this.isUserLoggedIn()) {
      this.showLoginPrompt();
      return;
    }

    if (this.storage.getItem('cart') == null) {
      this.storage.addItem('cart', '');
    }

    const cart = this.storage.getItem('cart') || '';
    const size = itemToAdd.size || '-';
    const cartItemString = this.createCartItemString(itemToAdd, size);

    this.fillCartItems(itemToAdd);

    if (cart.includes(cartItemString)) {
      this.changeCount(itemToAdd, true);
      return;
    }

    this.storage.addItem('cart', cart + cartItemString);
  }

  fillCartItems(itemToAdd: CartItem) {
    const { name, size } = itemToAdd;
    const existingItem = this.cartItems.find(
      (x) => x.name === name && x.size === size
    );

    if (existingItem) {
      existingItem.count++;
    } else {
      this.cartItems.push(itemToAdd);
    }
  }

  async setCartItems(plainCart: string) {
    if (!plainCart) {
      return;
    }

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

      const cartItem: CartItem = {
        productId: product.id,
        productSizeId: productSize.id,
        name: product.name,
        size: productSize.size || '-',
        price: productSize.price,
        weight: productSize.weight,
        imageUrl: productSize.imageUrl,
        count: +count,
      };

      this.fillCartItems(cartItem);
    }
  }

  async getProducts() {
    this.products = await this.productService.getProducts();
  }

  changeCount(cartItem: CartItem, increment: boolean) {
    const cart = this.storage.getItem('cart');
    if (!cart) {
      throw new Error('Cart is empty.');
    }

    const searchStr = `${cartItem.productId}.${cartItem.size}.`;
    const regex = new RegExp(`${searchStr}(\\d+)\\|`);
    const match = cart.match(regex);
    if (!match) {
      throw new Error('Cart item not found in cart.');
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

  createCartItemString(cartItem: CartItem, size: string): string {
    return `${cartItem.productId}.${size}.${cartItem.count}|`;
  }

  toModalAuthenticate() {
    this.modalService.open(AuthenticateModalComponent, {
      centered: true,
      size: 'm',
    });
  }
}
