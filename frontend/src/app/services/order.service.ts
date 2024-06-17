import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../shared/models/Order';
import { ORDER_CREATE_URL } from '../shared/constants/url';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  create(order: Order): Observable<Order> {
    const token = localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User')!).token : null;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Order>(ORDER_CREATE_URL, order, { headers });
  }
}