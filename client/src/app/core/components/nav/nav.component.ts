import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AccountService } from '../../../data/services/account.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/data/services/cart.service';
import { LoginModalComponent } from 'src/app/features/auth/login-modal.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(
    public accountService: AccountService,
    private router: Router,
    private modalService: NgbModal,
    public cartService: CartService
  ) {}

  ngOnInit(): void {}

  toModal(registration: boolean) {
    const modalRef = this.modalService.open(LoginModalComponent, {
      centered: true,
      size: 'm',
    });

    modalRef.componentInstance.registration = registration;
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
