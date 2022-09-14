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

  constructor(private accountService: AccountService, private route: Router) {}

  ngOnInit(): void {}

  register() {
    this.accountService.register(this.model).subscribe((success) => {
      this.route.navigateByUrl('/');
    });
  }

  cancel() {
    this.route.navigateByUrl('/');
  }
}
