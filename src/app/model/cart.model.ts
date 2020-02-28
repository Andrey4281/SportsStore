import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class Cart {
  public lines: CartLine[] = [];
  public itemCount: number = 0;
  public cartPrice: number = 0;

  /**
   * Добавление новых продуктов в корзину
   * @param product продукт
   * @param quantity количество единиц продукта
   */
  addLine(product: Product, quantity: number = 1) : void {
    let line = this.lines.find(line => line.product.id == product.id);
    if (line != undefined) {
      line.quantity += quantity;
    } else {
      this.lines.push(new CartLine(product, quantity));
    }
    this.recalculate();
  }

  /**
   * Обновление продукта в корзине
   * @param product
   * @param quantity
   */
  updateQuantity(product: Product, quantity: number) : void {
    let line = this.lines.find(line => line.product.id == product.id);
    if (line != undefined) {
      line.quantity = Number(quantity);
    }
    this.recalculate();
  }

  /**
   * Очистить корзину
   */
  clear() :void {
    this.lines = [];
    this.itemCount = 0;
    this.cartPrice = 0;
  }

  /**
   * Удаление продукта из корзины по id
   * @param id
   */
  removeLine(id: number) :void {
    let index = this.lines.findIndex(line => line.product.id == id);
    this.lines.splice(index);
    this.recalculate();
  }

  private recalculate() : void {
    this.itemCount = 0;
    this.cartPrice = 0;
    this.lines.forEach(l => {
      this.itemCount += l.quantity;
      this.cartPrice += (l.quantity * l.product.price);
    })
  }
}

export class CartLine {
  constructor(public product: Product,
              public quantity: number) {}

  get lineTotal() : number {
    return this.quantity * this.product.price;
  }
}
