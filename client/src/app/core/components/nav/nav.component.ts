import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AccountService } from '../../../data/services/account.service';
import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/data/services/cart.service';
import { AuthenticateModalComponent } from 'src/app/features/auth/authenticate-modal.component';
import { User } from 'src/app/data/models/User/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  user: User;

  constructor(
    public accountService: AccountService,
    private router: Router,
    private modalService: NgbModal,
    private cartService: CartService
  ) {}

  async ngOnInit() {}

  toModalAuthenticate(registration: boolean) {
    const modalRef = this.modalService.open(AuthenticateModalComponent, {
      centered: true,
      size: 'm',
    });

    modalRef.componentInstance.registration = registration;
  }

  get cartItemsCount() {
    return this.cartService.cartItems.length;
  }

  toCart() {
    this.router.navigateByUrl('cart');
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
    window.location.reload();
  }
}
