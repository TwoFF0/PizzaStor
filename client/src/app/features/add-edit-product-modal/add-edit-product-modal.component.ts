import { Component, Input, OnInit } from '@angular/core';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/data/models/Product/Product';
import { ProductService } from 'src/app/data/services/product.service';

@Component({
  selector: 'app-add-edit-product-modal',
  templateUrl: './add-edit-product-modal.component.html',
  styleUrls: ['./add-edit-product-modal.component.css'],
})
export class AddEditProductModalComponent implements OnInit {
  @Input() product: Product;
  @Input() productSizeLength: number;
  @Input() isEditing: boolean;

  constructor(
    private productService: ProductService,
    private modal: NgbActiveModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (!this.product) {
      this.product = {
        id: 0,
        category: '',
        name: '',
        description: '',
        isDeleted: false,
        productSize: [],
      };

      this.onProductSizeCountChange(1);
      return;
    }
  }
  categories = ['Pizza', 'Beverages', 'Desserts', 'Other'];
  sizes = ['WS', 'S', 'M', 'L'];
  productSizeCountOptions = [1, 2, 3];

  onProductSizeCountChange(count: number) {
    this.productSizeLength = count;

    this.product.productSize = Array.from({ length: count }, () => ({
      id: 0,
      size: '',
      price: 0,
      weight: 0,
      imageUrl: '',
    }));
  }

  async postProduct() {
    this.checkProductSizeIsWS();

    let createdProductId = await this.productService.postProduct(this.product);

    if (createdProductId !== 0) {
      this.toastr.success('Product has been added successfully!');
      this.modal.close();
      return;
    }

    this.toastr.error('Something happend with adding product :(');
  }

  async putProduct() {
    this.checkProductSizeIsWS();

    var isUpdated = await this.productService.putProduct(this.product);

    if (isUpdated) {
      this.toastr.success('Product has been updated successfully!');
      this.modal.close();
      return;
    }

    this.toastr.error('Something happend with updating product :(');
  }

  private checkProductSizeIsWS() {
    if (
      this.product.productSize.length === 1 &&
      this.product.productSize[0].size === 'WS'
    ) {
      this.product.productSize[0].size == null;
    }
  }
}
