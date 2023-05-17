import { AddEditProductModalComponent } from 'src/app/features/add-edit-product-modal/add-edit-product-modal.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/data/models/Product/Product';
import { ProductService } from 'src/app/data/services/product.service';
import { ProductModalViewComponent } from 'src/app/features/productModalView/productModalView.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  modalRef: NgbModalRef;
  isAdminEdit: boolean;

  products: Product[];
  minimalPricesToDisplay: number[];
  photoToDisplay: string[];

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

  filterProductsByCategory(category: string) {
    this.getMinimalPricesToDisplay(category);
    this.retrievePhoto(category);
    return this.products.filter((x) => x.category === category);
  }

  getMinimalPricesToDisplay(category: string) {
    this.minimalPricesToDisplay = this.products
      .filter((x) => x.category == category)
      .map((product) => {
        const productPrices = product.productSize.map((size) => size.price);
        const minPrice = Math.min(...productPrices);
        return minPrice;
      });
  }

  retrievePhoto(category: string) {
    this.photoToDisplay = this.products
      .filter((prod) => prod.category === category)
      .map((product) => {
        const sizesToCheck = ['L', 'M', 'S', null];
        for (const size of sizesToCheck) {
          const matchingSize = product.productSize.find((x) => x.size === size);
          if (matchingSize) {
            return matchingSize.imageUrl;
          }
        }
        return '';
      });
  }

  openProductModalView(product: Product) {
    if (this.isAdminEdit) {
      this.isAdminEdit = false;
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
    this.isAdminEdit = true;

    this.modalRef = this.modalService.open(AddEditProductModalComponent, {
      centered: true,
      size: 'lg',
    });

    this.modalRef.componentInstance.product = product;
    this.modalRef.componentInstance.productSizeLength =
      product.productSize.length;
    this.modalRef.componentInstance.isEditing = this.isAdminEdit;
  }
}
