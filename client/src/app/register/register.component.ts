import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  model: any = {};

  constructor(
    private accountService: AccountService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  register() {
    this.accountService.register(this.model).subscribe(
      (success) => {
        this.route.navigateByUrl('/');
      },
      (error) => {
        this.toastr.error(error.error);
      }
    );
  }

  cancel() {
    this.route.navigateByUrl('/');
  }
}
