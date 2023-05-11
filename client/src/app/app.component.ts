import { AccountService } from './data/services/account.service';
import { Component, OnInit } from '@angular/core';
import { UserAuth } from './data/models/UserAuth';
import { environment } from 'src/environments/environment';
import { CartService } from './data/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = environment.APP_NAME;

  constructor(
    private accountService: AccountService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.setCurrentUser();
    this.setCart();
  }

  setCurrentUser() {
    const user: UserAuth = JSON.parse(localStorage.getItem('user')!);
    this.accountService.setCurrentUser(user);
  }

  setCart() {
    const plainCart: string = localStorage.getItem('cart')!;
    this.cartService.setOrderItems(plainCart);
  }
}
