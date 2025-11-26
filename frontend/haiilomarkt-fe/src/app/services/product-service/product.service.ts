import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, take, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productListSubject = new BehaviorSubject<Product[]>([]);
  public productList$: Observable<Product[]> = this.productListSubject.asObservable();

  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
    this.getProducts();
  }

  public addNewProduct(newProductData: FormData): Observable<Product> {
    return this.httpClient.post<Product>(this.apiUrl, newProductData).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      }),
      tap(() => this.getProducts())
    );
  }

  public deleteProduct(productId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${productId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      }),
      tap(() => this.getProducts())
    );
  }

  public updateProduct(productId: number, product: FormData): Observable<Product> {
    return this.httpClient.put<Product>(`${this.apiUrl}/${productId}`, product).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      }),
      tap(() => this.getProducts())
    );
  }

  private getProducts(): void {
    this.httpClient
      .get<Product[]>(`${this.apiUrl}/allProducts`)
      .pipe(
        take(1),
        catchError((error) => {
          return throwError(() => error);
        })
      )
      .subscribe((products) => this.productListSubject.next(products));
  }
}
