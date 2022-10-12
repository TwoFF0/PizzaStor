import { Product } from './../../_models/Product';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css'],
})
export class ModalsComponent implements OnInit {
  @Input() modalProduct: Product;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  tempPrice: number;
  mappedPrices = new Map<string, number>();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.tempPrice = this.modalProduct.price;
    this.mapPrices();
  }

  ToCart() {
    this.passEntry.emit(this.modalProduct);
  }

  ChangeSize(size: string) {
    this.tempPrice = this.mappedPrices.get(size.toLowerCase())!;

    var doc = document.getElementById('modal_image') as HTMLElement;

    switch (size.toLowerCase()) {
      case 'big':
        doc.style.transform = 'scale(1.4)';
        break;
      case 'medium':
        doc.style.transform = 'scale(1.3)';
        break;
      case 'small':
        doc.style.transform = 'scale(1.2)';
        break;

      default:
        doc.style.transform = 'scale(1.3)';
        break;
    }
  }

  private mapPrices() {
    this.mappedPrices.set(
      'small',
      Math.floor(this.modalProduct.price / 1.3) - 0.01
    );
    this.mappedPrices.set('medium', this.modalProduct.price);
    this.mappedPrices.set(
      'big',
      Math.floor(this.modalProduct.price * 1.3) - 0.01
    );
  }
}
