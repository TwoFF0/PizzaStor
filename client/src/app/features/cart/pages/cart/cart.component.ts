import { CartService } from 'src/app/data/services/cart.service';
import { Product } from '../../../../data/models/Product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: Product[];
  uniqueProducts: Product[];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // this.getProducts();
    this.uniqueProducts = this.uniqByFilter(this.products);
  }

  // getProducts() {
  //   this.products = this.cartService.cartProducts;
  // }

  uniqByFilter<T>(array: T[]) {
    return array.filter((value, index) => array.indexOf(value) === index);
  }
}
