import { ModalsComponent } from './features/products/productModal/modals.component';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AboutComponent } from './core/components/pages/about/about.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './core/components/pages/profile/profile.component';
import { OrdersComponent } from './core/components/pages/orders/orders.component';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { NotFoundComponent } from './core/components/errors/not-found/not-found.component';
import { CartComponent } from './features/cart/pages/cart/cart.component';
import { EmptyCartComponent } from './features/cart/pages/empty-cart/empty-cart.component';
import { LoginModalComponent } from './features/auth/login-modal.component';
import { ServerErrorComponent } from './core/components/errors/server-error/server-error.component';
import { TestErrorsComponent } from './core/components/errors/test-errors/test-errors.component';
import { NavComponent } from './core/components/nav/nav.component';
import { HomeComponent } from './core/components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    ProfileComponent,
    OrdersComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    ModalsComponent,
    CartComponent,
    LoginModalComponent,
    EmptyCartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    NgbActiveModal,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
