import { HttpClient } from '@angular/common/http';
// import { CookieService } from 'ngx-cookie-service';
// import { AccountService } from './data/services/account.service';
// import { Component, OnInit } from '@angular/core';
// import { UserAuth } from './data/models/UserAuth';
// import { NgIfContext } from '@angular/common';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
// })
// export class AppComponent implements OnInit {
//   title = 'client';

//   constructor(
//     private accountService: AccountService,
//     private cookieService: CookieService
//   ) {}

//   ngOnInit() {
//     this.setCurrentUser();
//   }

//   setCurrentUser() {
//     var cookieSplitted = this.cookieService.get('sessionId').split(':');

//     console.log(cookieSplitted);

//     if (cookieSplitted[0] != '') {
//       const user: UserAuth = {
//         userName: cookieSplitted[0],
//         token: cookieSplitted[1],
//       };

//       console.log(cookieSplitted);

//       this.accountService.setCurrentUser(user);
//     }
//   }
// }

import { AccountService } from './data/services/account.service';
import { Component, OnInit } from '@angular/core';
import { UserAuth } from './data/models/UserAuth';
import { environment } from 'src/environments/environment';
import { OrderItem } from './data/models/OrderItem';
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
