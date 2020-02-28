import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Product} from './product.model';
import {Observable} from 'rxjs';
import {Order} from './order.model';
import {map} from 'rxjs/operators';

const PROTOCOL = "http";
const PORT = 3500;

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
}
