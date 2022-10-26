import { CartComponent } from './features/cart/pages/cart/cart.component';
import { NotFoundComponent } from './core/components/errors/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';
import { OrdersComponent } from './core/components/pages/orders/orders.component';
import { ProfileComponent } from './core/components/pages/profile/profile.component';
import { AboutComponent } from './core/components/pages/about/about.component';
import { HomeComponent } from './core/components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestErrorsComponent } from './core/components/errors/test-errors/test-errors.component';
import { ServerErrorComponent } from './core/components/errors/server-error/server-error.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'errors', component: TestErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'cart', component: CartComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'orders', component: OrdersComponent },
      { path: 'view-profile', component: ProfileComponent },
    ],
  },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
