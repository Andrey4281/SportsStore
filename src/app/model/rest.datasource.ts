import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Product} from './product.model';
import {Observable} from 'rxjs';
import {Order} from './order.model';
import {map} from 'rxjs/operators';

const PROTOCOL = "http";
const PORT = 3500;

/**
 * Рест клиент для получения данных
 */
@Injectable({ providedIn: 'root' })
export class RestDataSource {
  baseUrl: string;
  auth_token: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  authenticate(user: string, pass: string): Observable<boolean> {
    return this.http.post<string>(this.baseUrl + 'login', {name:user, password:pass})
      .pipe(map(response =>{
        console.warn(response);
        let r = JSON.parse(JSON.stringify(response));
        this.auth_token = r.success ? r.token : null;
        return r.success;
      }));
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'products', {headers: {'authorization': `Bearer<${this.auth_token}>`}});
  }

  saveOrder(order : Order) : Observable<Order> {
    return this.http.post<Order>(this.baseUrl + 'orders', order,
      {headers: {'authorization': `Bearer<${this.auth_token}>`}});
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl + 'products', product, {headers: {'authorization': `Bearer<${this.auth_token}>`}});
  }

  updateProduct(product : Product): Observable<Product> {
    return this.http.put<Product>(this.baseUrl + `products/${product.id}`, product, {headers: {'authorization': `Bearer<${this.auth_token}>`}});
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(this.baseUrl + `products/${id}`, {headers: {'authorization': `Bearer<${this.auth_token}>`}});
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl + 'orders', {headers: {'authorization': `Bearer<${this.auth_token}>`}});
  }

  deleteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(this.baseUrl + `orders/${id}`, {headers: {'authorization': `Bearer<${this.auth_token}>`}});
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(this.baseUrl + `orders/${order.id}`, order, {headers: {'authorization': `Bearer<${this.auth_token}>`}});
  }
}
