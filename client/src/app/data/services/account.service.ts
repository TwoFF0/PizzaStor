import { UserAuth } from './../models/UserAuth';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';

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
    this.currentUserSource.next(user);
  }

  logout() {
    this.localStorageService.deleteItem('user');
    this.localStorageService.deleteItem('cart');
    this.currentUserSource.next(null!);
  }
}
