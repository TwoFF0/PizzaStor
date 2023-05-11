import { CartService } from 'src/app/data/services/cart.service';
import { Product } from '../../../../data/models/Product';
import { Component, OnInit } from '@angular/core';
import { OrderItem } from 'src/app/data/models/OrderItem';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  orderItems: OrderItem[];
  total: number;
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
    this.getTotal();

    console.log(this.cartService.products);
  }

  getProducts() {
    this.orderItems = this.cartService.orderItems;
  }

  getTotal() {
    return this.orderItems
      .map((x) => x.price * x.count)
      .reduce((acc, curr) => acc + curr, 0)
      .toFixed(2);
  }

  increment(item: OrderItem) {
    item.count += 1;

    this.cartService.changeCount(item, true);
  }

  decrement(item: OrderItem) {
    if (item.count == 1) {
      const index = this.orderItems.indexOf(item, 0);
      if (index > -1) {
        this.orderItems.splice(index, 1);
      }
    }

    this.cartService.changeCount(item, false);
    item.count -= 1;
  }

  goToHomePage() {
    this.router.navigateByUrl('/');
  }
}
