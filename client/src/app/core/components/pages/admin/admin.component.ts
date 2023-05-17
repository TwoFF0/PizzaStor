import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/data/models/User/User';
import { AdminService } from 'src/app/data/services/admin.service';
import { EditRolesComponent } from 'src/app/features/edit-roles-modal/edit-roles.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  ngbModalRef: NgbModalRef;

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal
  ) {}

  async ngOnInit() {
    this.users = await this.adminService.getUsersWithRoles();
  }

  openModal(user: User) {
    this.ngbModalRef = this.modalService.open(EditRolesComponent, {
      centered: true,
    });

    this.ngbModalRef.componentInstance.user = user;
  }
}
