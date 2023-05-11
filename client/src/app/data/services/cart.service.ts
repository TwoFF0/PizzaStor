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
    if (!this.storage.getItem('user')) {
      this.toastr.info('Please Log in before making an order :)');
      this.toModalAuthenticate();

      return;
    }

    if (this.storage.getItem('cart') == null) {
      this.storage.addItem('cart', '');
    }

    if (itemToAdd.size == null) {
      itemToAdd.size = 'WS';
    }

    this.fillOrderItems(itemToAdd);

    if (
      this.storage
        .getItem('cart')!
        .includes(itemToAdd.id + '.' + itemToAdd.size)
    ) {
      this.changeCount(itemToAdd, true);
    } else {
      this.storage.addItem(
        'cart',
        this.storage.getItem('cart')! +
          itemToAdd.id +
          '.' +
          itemToAdd.size +
          '.' +
          itemToAdd.count +
          '|'
      );
    }
  }

  fillOrderItems(itemToAdd: OrderItem) {
    if (
      this.orderItems.find(
        (x) => x.name == itemToAdd.name && x.size == itemToAdd.size
      )
    ) {
      let item = this.orderItems.find(
        (x) => x.name == itemToAdd.name && x.size == itemToAdd.size
      )!;

      item.count++;
    } else {
      this.orderItems.push(itemToAdd);
    }
  }

  async setOrderItems(plainCart: string) {
    await this.getProducts();
    let plainItems = plainCart.split('|');

    for (let i = 0; i < plainItems.length - 1; i++) {
      let foundedProduct = this.products.find(
        (x) => x.id == +plainItems[i].split('.')[0]
      )!;

      let size = plainItems[i].split('.')[1];

      let foundedSize = foundedProduct.productSize.find(
        (x) => x.size == size || x.size == null
      )!;

      if (foundedSize.size == null) {
        foundedSize.size = 'WS';
      }

      this.fillOrderItems({
        id: foundedProduct.id,
        name: foundedProduct.name,
        size: foundedSize.size,
        price: foundedSize.price,
        weight: foundedSize.weight,
        imageUrl: foundedSize.imageUrl,
        count: +plainItems[i].split('.')[2],
      } as OrderItem);

      console.log(foundedSize.size);
    }

    console.log(this.orderItems);
  }

  async getProducts() {
    this.products = await this.productService.getProducts();
  }

  changeCount(orderItem: OrderItem, addition: boolean) {
    let oldOrders = this.storage.getItem('cart')!;

    let count = +oldOrders
      .substring(oldOrders.indexOf(orderItem.id + '.' + orderItem.size))
      .split('|')[0]
      .split('.')[2];

    let changedCount: number;

    if (addition) {
      changedCount = count + 1;
    } else {
      changedCount = count - 1;
    }

    let newOrders = '';

    if (changedCount == 0) {
      newOrders = oldOrders.replace(
        orderItem.id + '.' + orderItem.size + '.' + count + '|',
        ''
      );
    } else {
      newOrders = oldOrders.replace(
        orderItem.id + '.' + orderItem.size + '.' + count,
        orderItem.id + '.' + orderItem.size + '.' + changedCount
      );
    }

    console.log(changedCount);
    console.log(newOrders);

    this.storage.addItem('cart', newOrders);
  }

  toModalAuthenticate() {
    this.modalService.open(AuthenticateModalComponent, {
      centered: true,
      size: 'm',
    });
  }
}
