import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/Product/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = environment.apiUrl;
  private products: Product[] | undefined;
  private productsLoaded = false;

  constructor(private httpClient: HttpClient) {}

  async getProducts(): Promise<Product[]> {
    if (this.productsLoaded) {
      return this.products as Product[];
    }

    this.products = (await this.httpClient
      .get<Product[]>(this.baseUrl + 'products')
      .toPromise()) as Product[];

    this.productsLoaded = true;

    return this.products as Product[];
  }

  async postProduct(product: Product) {
    return (await this.httpClient
      .post<number>(`${this.baseUrl}products`, product)
      .toPromise()) as number;
  }

  async putProduct(product: Product) {
    return (await this.httpClient
      .put<boolean>(`${this.baseUrl}products/${product.id}`, product)
      .toPromise()) as boolean;
  }
}
