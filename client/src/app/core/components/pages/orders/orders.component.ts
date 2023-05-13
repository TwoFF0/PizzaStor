import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/data/models/Cart/Order';
import { OrderToView } from 'src/app/data/models/Cart/OrderToView';
import { OrderService } from 'src/app/data/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: OrderToView[] = [];

  constructor(private orderService: OrderService, private router: Router) {}

  async ngOnInit() {
    await this.getOrders();
  }

  private async getOrders() {
    this.orders = await this.orderService.getOrders();
  }

  goToHomePage() {
    this.router.navigateByUrl('/');
  }
}
