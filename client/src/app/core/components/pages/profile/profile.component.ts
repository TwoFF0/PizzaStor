import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/data/models/Cart/Order';
import { User } from 'src/app/data/models/User/User';
import { UserService } from 'src/app/data/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    userName: '',
    age: 0,
    city: '',
    country: '',
    balance: 0,
    orders: {} as Order[],
    roles: {} as string[],
  };
  editing = false;
  balanceString: string = '';

  profileForm: FormGroup;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  async ngOnInit() {
    this.user = await this.userService.getUserFromLocalStorage();
    this.balanceString = `$${this.user.balance.toFixed(2).toString()}`;
  }

  async updateUser(user: User) {
    if (await this.userService.updateUser(user)) {
      this.toastr.success('Your information is updated');
    } else {
      this.toastr.error(
        'Something went wrong while we were updating your info'
      );
    }
  }
}
