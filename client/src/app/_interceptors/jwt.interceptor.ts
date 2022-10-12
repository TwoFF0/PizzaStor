import { UserAuth } from '../_models/UserAuth';
import { AccountService } from './../_services/account.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let currentUser: UserAuth;

    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((x) => (currentUser = x));

    if (currentUser!) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + currentUser.token,
        },
      });
    }

    return next.handle(request);
  }
}
