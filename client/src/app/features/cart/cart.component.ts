import { CartService } from 'src/app/data/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/data/models/Cart/CartItem';
import { Router } from '@angular/router';
import { UserService } from 'src/app/data/services/user.service';
import { OrderService } from 'src/app/data/services/order.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private router: Router,
    private userService: UserService,
    private orderService: OrderService,
    private toastr: ToastrService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {}

  get cartItems(): CartItem[] {
    return this.cartService.cartItems;
  }

  get total(): number {
    return this.cartService.total;
  }

  increment(item: CartItem) {
    item.count += 1;

    this.cartService.changeCount(item, true);
  }

  decrement(item: CartItem) {
    if (item.count == 1) {
      const index = this.cartItems.indexOf(item, 0);
      if (index > -1) {
        this.cartItems.splice(index, 1);
      }
    }

    this.cartService.changeCount(item, false);
    item.count -= 1;
  }

  async makeAnOrder() {
    try {
      const user = await this.userService.getUserFromLocalStorage();
      const balance = user.balance;

      if (balance < this.total) {
        const message = `Your balance -> ${balance}<br>Order costs  -> ${this.total}`;
        this.toastr.info(message, `Top up your balance to make an order`, {
          enableHtml: true,
        });
        return;
      }

      const orderId = await this.orderService.postOrder(
        this.cartItems,
        user.id,
        this.total
      );

      if (!orderId) {
        throw new Error('Error posting order');
      }

      const updatedUser = {
        ...user,
        balance: +(balance - this.total).toFixed(2),
      };
      
      const isUpdated = await this.userService.updateUser(updatedUser);

      if (!isUpdated) {
        throw new Error('Error updating user');
      }

      this.toastr.success('Your order is about to start preparing');
      this.cartService.cartItems = [];
      this.localStorage.deleteItem('cart');
    } catch (error) {
      this.toastr.error('Error making order. Please try again later.');
    }
  }

  goToHomePage() {
    this.router.navigateByUrl('/');
  }
}
