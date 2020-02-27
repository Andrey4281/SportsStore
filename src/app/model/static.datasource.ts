import { Injectable } from '@angular/core';
import { Product } from './product.model';
import {from, Observable} from 'rxjs';

@Injectable()
export class StaticDataSource {
  private products: Product[] = [
    new Product(1, 'Product1', 'Category1', 'Product1 (Category1)', 100),
    new Product(2, 'Product2', 'Category1', 'Product2 (Category1)', 100),
    new Product(3, 'Product2', 'Category2', 'Product2 (Category2)', 150),
    new Product(4, 'Product3', 'Category3', 'Product3 (Category3)', 250)
  ]

  getProducts(): Observable<Product[]> {
    return from([this.products]);
  }
}

