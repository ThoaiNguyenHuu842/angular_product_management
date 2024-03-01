import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getCategories(companyId: Number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/company/${companyId}/categories`);
  }

  getProducts(companyId: Number, category: String, name: String): Observable<Product[]> {
    return this.http.get<any>(`http://localhost:8080/company/${companyId}/products?category=${category}&name=${name}`);
  }

  createProduct(companyId: Number, product: Product): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/company/${companyId}/products`,product);
  }

  updateProduct(companyId: Number, id: Number, product: Product): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/company/${companyId}/products/${id}`, product);
  }

  deleteProduct(companyId: Number, id: Number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/company/${companyId}/products/${id}`);
  }
}
