import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/data/models/Product/Product';
import { ProductSize } from 'src/app/data/models/Product/ProductSize';
import { ProductService } from 'src/app/data/services/product.service';
import { ProductModalViewComponent } from 'src/app/features/productModalView/productModalView.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Product[];
  minimalPricesToDisplay: number[];
  sizeToDisplay: ProductSize[];
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
      .map((x) => x.productSize)
      .flat()
      .filter((x) => x.size == 'S' || x.size == undefined)
      .map((x) => x.price);
  }

  retrievePhoto(category: string) {
    this.photoToDisplay = this.products
      .filter((x) => x.category == category)
      .map((x) => x.productSize)
      .flat()
      .filter((x) => x.size == 'M' || x.size == undefined || x.size == null)
      .map((x) => x.imageUrl);
  }

  openModal(product: Product) {
    const modalRef = this.modalService.open(ProductModalViewComponent, {
      centered: true,
      size: 'lg',
    });

    modalRef.componentInstance.selectedProduct = product;
  }
}
