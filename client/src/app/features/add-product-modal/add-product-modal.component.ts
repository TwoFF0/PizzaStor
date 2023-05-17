import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/data/models/Product/Product';
import { ProductService } from 'src/app/data/services/product.service';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.css'],
})
export class AddProductModalComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private modal: NgbActiveModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.onProductSizeCountChange(1);
  }
  categories = ['Pizza', 'Beverages', 'Desserts', 'Other'];
  sizes = ['WS', 'S', 'M', 'L'];
  productSizeCountOptions = [1, 2, 3];
  productSizeCount = 1;
  product: Product = {
    id: 0,
    category: '',
    name: '',
    description: '',
    productSize: [],
  };

  onProductSizeCountChange(count: number) {
    this.productSizeCount = count;

    this.product.productSize = Array.from({ length: count }, () => ({
      id: 0,
      size: '',
      price: 0,
      weight: 0,
      imageUrl: '',
    }));
  }

  async postProduct() {
    if (
      this.product.productSize.length === 1 &&
      this.product.productSize[0].size === 'WS'
    ) {
      this.product.productSize[0].size == null;
    }

    let createdProduct = await this.productService.postProduct(this.product);

    if (createdProduct) {
      this.toastr.success('Product has been added successfully!');
      this.modal.close();
      return;
    }

    this.toastr.error('Something happend when adding product :(');
  }
}
