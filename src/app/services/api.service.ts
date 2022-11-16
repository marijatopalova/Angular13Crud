import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  postProduct(data: any) {
    return this.httpClient.post<any>("http://localhost:3000/productList", data);
  }

  getProduct() {
    return this.httpClient.get<any>("http://localhost:3000/productList/");
  }

  putProduct(data: any, id: number) {
    return this.httpClient.put<any>("http://localhost:3000/productList/" + id, data);
  }

  deleteProduct(id: number) {
    return this.httpClient.delete<any>("http://localhost:3000/productList/" + id);
  }
}
