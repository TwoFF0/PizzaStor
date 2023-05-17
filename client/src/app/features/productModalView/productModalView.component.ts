import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CartItem } from 'src/app/data/models/Cart/CartItem';
import { Product } from 'src/app/data/models/Product/Product';
import { ProductSize } from 'src/app/data/models/Product/ProductSize';
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
  imageSize: number = 292;

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
        this.imageSize = 366;

        break;
      case 'M':
        this.selectedSize = this.selectedProduct.productSize.filter(
          (x) => x.size == size
        )[0];
        this.imageSize = 292;

        break;
      case 'S':
        this.selectedSize = this.selectedProduct.productSize.filter(
          (x) => x.size == size
        )[0];
        this.imageSize = 233;

        break;
    }
  }

  ToCart(selectedProduct: Product, productSize: ProductSize) {
    let selectedSize = selectedProduct.productSize.find(
      (x) => x.id == productSize.id
    )!;

    let cartItem: CartItem = {
      productId: selectedProduct.id,
      productSizeId: selectedSize.id,
      name: selectedProduct.name,
      size: selectedSize.size,
      price: selectedSize.price,
      weight: selectedSize.weight,
      imageUrl: selectedSize.imageUrl,
      count: 1,
    };

    this.cartService.addToCart(cartItem);
    this.activeModal.dismiss();
  }
}
