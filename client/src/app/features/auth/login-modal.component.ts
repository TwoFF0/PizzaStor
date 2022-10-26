import { AccountService } from './../../data/services/account.service';
import { UserLogin } from './../../data/models/UserLogin';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent implements OnInit {
  entity = {} as UserLogin;
  registration: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    public accountService: AccountService
  ) {}

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.entity).subscribe((_) => {
      this.activeModal.dismiss();
      this.reloadPage();
    });
  }

  register(): any {
    this.accountService.register(this.entity).subscribe((success) => {
      this.activeModal.dismiss();
      this.reloadPage();
    });
  }

  registerToggle() {
    this.registration = true;
  }

  reloadPage() {
    window.location.reload();
  }

  close() {
    this.activeModal.dismiss();
  }
}
