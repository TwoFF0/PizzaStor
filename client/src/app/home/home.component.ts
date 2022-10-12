import { Product } from './../_models/Product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalsComponent } from '../_modals/modals/modals.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Product[];
  categories: string[] = ['Pizza', 'Beverages', 'Desserts', 'Other'];

  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getUser();
  }

  async getUser() {
    this.products = await this.productService.getProducts();
  }

  filterProductsByCategory(category: string) {
    return this.products.filter((x) => x.category == category);
  }

  openModal(product: Product) {
    const modalRef = this.modalService.open(ModalsComponent, {
      centered: true,
      size: 'lg',
    });

    modalRef.componentInstance.modalProduct = product;

    modalRef.componentInstance.passEntry.subscribe(
      (receivedEntryToCart: Product) => {
        console.log(receivedEntryToCart);
      }
    );
  }
}
