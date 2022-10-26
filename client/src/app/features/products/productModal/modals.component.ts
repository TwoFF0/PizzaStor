import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/data/models/Product';
import { CartService } from 'src/app/data/services/cart.service';
import { ProductService } from 'src/app/data/services/product.service';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css'],
})
export class ModalsComponent implements OnInit {
  @Input() selectedProduct: Product;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  sameProducts: Product[];

  constructor(
    public activeModal: NgbActiveModal,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.findSameProducts();
  }

  findSameProducts() {
    this.sameProducts = this.productService.products.filter(
      (x) => x.name == this.selectedProduct.name
    );
  }

  ChangeSize(size: string) {
    switch (size) {
      case 'L':
        this.selectedProduct = this.sameProducts.filter(
          (x) => x.productSize.size == size
        )[0];
        break;
      case 'M':
        this.selectedProduct = this.sameProducts.filter(
          (x) => x.productSize.size == size
        )[0];
        break;
      case 'S':
        this.selectedProduct = this.sameProducts.filter(
          (x) => x.productSize.size == size
        )[0];
        break;
    }
  }

  // ToCart() {
  //   this.cartService.add(this.selectedProduct);
  //   console.log(this.cartService.cartProducts);
  //   this.activeModal.dismiss();
  // }
}
