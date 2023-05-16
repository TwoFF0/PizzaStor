import { LocalStorageService } from '../../shared/services/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserAuth } from '../models/User/UserAuth';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<UserAuth>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(
    private HttpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  login(model: any) {
    return this.HttpClient.post<UserAuth>(
      this.baseUrl + 'account/login',
      model
    ).pipe(
      map((response: UserAuth) => {
        const user = response;
        if (user) {
          this.localStorageService.addItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
          return user;
        }

        return user;
      })
    );
  }

  register(model: any) {
    return this.HttpClient.post<UserAuth>(
      this.baseUrl + 'account/register',
      model
    ).pipe(
      map((response) => {
        const user = response;
        if (user) {
          this.localStorageService.addItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);

          return user;
        }

        return user;
      })
    );
  }

  setCurrentUser(user: UserAuth) {
    if (user) {
      user.roles = [];
      const roles = this.getDecodedToken(user.token).role;
      Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles);
    }

    this.currentUserSource.next(user);
  }

  logout() {
    this.localStorageService.deleteItem('user');
    this.localStorageService.deleteItem('cart');
    this.currentUserSource.next(null!);
  }

  get userName() {
    let userName: string = '';

    let user$ = this.currentUser$;

    if (!user$) {
      throw new Error('User is null');
    }

    user$.subscribe((user) => {
      userName = user.userName;
    });

    return userName;
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
