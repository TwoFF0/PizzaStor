import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderItem } from 'src/app/data/models/OrderItem';
import { Product } from 'src/app/data/models/Product';
import { ProductSize } from 'src/app/data/models/ProductSize';
import { CartService } from 'src/app/data/services/cart.service';

@Component({
  selector: 'app-productModalView',
  templateUrl: './productModalView.component.html',
  styleUrls: ['./productModalView.component.css'],
})
export class ProductModalViewComponent implements OnInit {
  @Input() selectedProduct: Product;
  @Output()
  passEntry: EventEmitter<any> = new EventEmitter();

  selectedSize: ProductSize;

  constructor(
    public activeModal: NgbActiveModal,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.defineSize();
  }

  defineSize() {
    if (this.selectedProduct.productSize.length > 1) {
      this.selectedSize = this.selectedProduct.productSize[1];
    } else {
      this.selectedSize = this.selectedProduct.productSize[0];
    }
  }

  ChangeSize(size: string) {
    switch (size) {
      case 'L':
        this.selectedSize = this.selectedProduct.productSize.filter(
          (x) => x.size == size
        )[0];
        break;
      case 'M':
        this.selectedSize = this.selectedProduct.productSize.filter(
          (x) => x.size == size
        )[0];

        break;
      case 'S':
        this.selectedSize = this.selectedProduct.productSize.filter(
          (x) => x.size == size
        )[0];
        break;
    }
  }

  ToCart(selectedProduct: Product, productSize: ProductSize) {
    let selectedSize = selectedProduct.productSize.find(
      (x) => x.id == productSize.id
    )!;

    let orderItem: OrderItem = {
      id: selectedProduct.id,
      name: selectedProduct.name,
      size: selectedSize.size,
      price: selectedSize.price,
      weight: selectedSize.weight,
      imageUrl: selectedSize.imageUrl,
      count: 1,
    };

    this.cartService.addToCart(orderItem);
    this.activeModal.dismiss();
  }
}
