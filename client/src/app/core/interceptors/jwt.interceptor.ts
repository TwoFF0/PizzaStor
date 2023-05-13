import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AccountService } from 'src/app/data/services/account.service';
import { UserAuth } from 'src/app/data/models/User/UserAuth';

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
