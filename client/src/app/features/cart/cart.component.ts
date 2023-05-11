import { CartService } from 'src/app/data/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { OrderItem } from 'src/app/data/models/OrderItem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {}

  get orderItems(): OrderItem[] {
    return this.cartService.orderItems;
  }

  get total(): number {
    return +this.orderItems
      .reduce((acc, item) => acc + item.price * item.count, 0)
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
