import { AddEditProductModalComponent } from 'src/app/features/add-edit-product-modal/add-edit-product-modal.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/data/models/Product/Product';
import { ProductService } from 'src/app/data/services/product.service';
import { ProductModalViewComponent } from 'src/app/features/productModalView/productModalView.component';
import { DeleteProductModalComponent } from 'src/app/features/delete-product-modal/delete-product-modal.component';

interface ProductView {
  [name: string]: {
    minPrices: number[];
    photos: string[];
  };
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  modalRef: NgbModalRef;
  isAdminClick: boolean;

  products: Product[];
  view: ProductView = {};

  categories: string[] = ['Pizza', 'Beverages', 'Desserts', 'Other'];

  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getProducts();
    this.configureViewProduct();
  }

  private async getProducts() {
    this.products = (await this.productService.getProducts()).filter(
      (x) => !x.isDeleted
    );
  }

  filterProductsByCategory(category: string) {
    return this.products.filter((x) => x.category === category);
  }

  private getMinimalPricesToDisplay(category: string): number[] {
    const productsByCategory = this.filterProductsByCategory(category);
    return productsByCategory.map((product) =>
      Math.min(...product.productSize.map((size) => size.price))
    );
  }

  private retrievePhoto(category: string): string[] {
    const productsByCategory = this.filterProductsByCategory(category);
    return productsByCategory.map((product) => {
      const matchingSize = product.productSize.find(
        (x) =>
          x.size === 'L' || x.size === 'M' || x.size === 'S' || x.size === null
      );
      return matchingSize?.imageUrl || '';
    });
  }

  openProductModalView(product: Product) {
    if (this.isAdminClick) {
      this.isAdminClick = false;
      return;
    }

    this.modalRef = this.modalService.open(ProductModalViewComponent, {
      centered: true,
      size: 'lg',
    });

    this.modalRef.componentInstance.selectedProduct = product;
  }

  openAddProductModal() {
    this.modalService.open(AddEditProductModalComponent, {
      centered: true,
      size: 'lg',
    });
  }

  openEditProductModal(product: Product) {
    this.isAdminClick = true;

    this.modalRef = this.modalService.open(AddEditProductModalComponent, {
      centered: true,
      size: 'lg',
    });

    this.modalRef.componentInstance.product = product;
    this.modalRef.componentInstance.productSizeLength =
      product.productSize.length;
    this.modalRef.componentInstance.isEditing = this.isAdminClick;
  }

  openDeleteProductModal(productId: number) {
    this.isAdminClick = true;

    this.modalRef = this.modalService.open(DeleteProductModalComponent, {
      centered: true,
      size: 'md',
    });

    this.modalRef.componentInstance.productId = productId;
  }

  private configureViewProduct(): void {
    this.categories.forEach((category) => {
      this.view[category] = {
        minPrices: this.getMinimalPricesToDisplay(category),
        photos: this.retrievePhoto(category),
      };
    });
  }
}
