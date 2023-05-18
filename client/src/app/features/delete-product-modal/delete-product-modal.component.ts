import { ToastrService } from 'ngx-toastr';
import { Component, Input } from '@angular/core';
import { ProductService } from 'src/app/data/services/product.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-product-modal',
  templateUrl: './delete-product-modal.component.html',
  styleUrls: ['./delete-product-modal.component.css'],
})
export class DeleteProductModalComponent {
  @Input() productId: number;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private modal: NgbActiveModal
  ) {}

  async deleteProduct(productId: number) {
    var isDeleted = await this.productService.deleteProduct(productId);

    if (isDeleted) {
      this.toastr.success('Product has been deleted successfully!');
      this.modal.close();
      return;
    }

    this.toastr.error('Something happend with deletion of product :(');
  }

  close() {
    this.modal.close();
  }
}
