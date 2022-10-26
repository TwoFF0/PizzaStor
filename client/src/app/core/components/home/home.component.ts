import { Product } from '../../../data/models/Product';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/data/services/product.service';
import { ModalsComponent } from 'src/app/features/products/productModal/modals.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Product[];
  mapProductPrices: Product[];
  categories: string[] = ['Pizza', 'Beverages', 'Desserts', 'Other'];

  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getProducts();
  }

  async getProducts() {
    this.products = await this.productService.getProducts();
  }

  filterProductsByCategoryAndSize(category: string, size: string) {
    this.mapProductPrices = this.products.filter(
      (x) =>
        x.category == category &&
        (x.productSize.size == 'S' || x.productSize.size == null)
    );

    return this.products.filter(
      (x) =>
        x.category == category &&
        (x.productSize.size == size || x.productSize.size == null)
    );
  }

  openModal(product: Product) {
    const modalRef = this.modalService.open(ModalsComponent, {
      centered: true,
      size: 'lg',
    });

    modalRef.componentInstance.selectedProduct = product;
  }
}
