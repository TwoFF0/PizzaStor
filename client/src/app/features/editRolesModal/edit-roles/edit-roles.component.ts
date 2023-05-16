import { Component, Input, OnInit } from '@angular/core';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/data/models/User/User';
import { AdminService } from 'src/app/data/services/admin.service';

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.css'],
})
export class EditRolesComponent implements OnInit {
  @Input() user: User;

  roles: any[] = [
    {
      name: 'Admin',
      checked: false,
    },
    {
      name: 'Member',
      checked: false,
    },
  ];

  constructor(
    private adminService: AdminService,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.hasRole();
  }

  async updateRoles() {
    let selectedRoles: string[] = [];

    this.roles.forEach((x) => {
      if (x.checked === true) {
        selectedRoles.push(x.name);
      }
    });

    this.user.roles = selectedRoles;

    await this.adminService.updateRoles(this.user);
    this.toastr.success('Roles is updated!');
    this.activeModal.close();
  }

  hasRole() {
    this.roles.forEach((role) => {
      if (this.user.roles.includes(role.name)) {
        role.checked = true;
      }
    });
  }

  userIsAdmin(role: any) {
    if (this.user.roles.includes('Admin') && role.name === 'Admin') {
      return true;
    }

    return false;
  }

  close() {
    this.activeModal.dismiss();
  }
}
