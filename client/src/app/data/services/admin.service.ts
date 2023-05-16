import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/User/User';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  async getUsersWithRoles() {
    return (await this.httpClient
      .get<User[]>(`${this.baseUrl}admin/get-users-with-roles`)
      .toPromise()) as User[];
  }

  async updateRoles(user: User) {
    return await this.httpClient
      .post(
        `${this.baseUrl}admin/edit-role/${
          user.userName
        }?roles=${user.roles.toString()}`,
        {}
      )
      .toPromise();
  }
}
