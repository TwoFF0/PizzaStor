import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/User/User';
import { UserAuth } from '../models/User/UserAuth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  public async getUserFromLocalStorage() {
    const userName = (JSON.parse(localStorage.getItem('user')!) as UserAuth)
      .userName;

    return (await this.httpClient
      .get<User>(this.baseUrl + 'users/' + userName)
      .toPromise()) as User;
  }

  public async updateUser(user: User): Promise<boolean> {
    return (await this.httpClient
      .put(this.baseUrl + 'users/', user)
      .toPromise()) as boolean;
  }
}
