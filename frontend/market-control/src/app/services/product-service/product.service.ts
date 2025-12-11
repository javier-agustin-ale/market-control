import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, take, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../../interfaces/product.interface';
import { NotificationService } from '../notification-service/notification.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productListSubject = new BehaviorSubject<Product[]>([]);
  public productList$: Observable<Product[]> = this.productListSubject.asObservable();

  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient, private notificationService: NotificationService) {
    this.getProducts();
  }

  public addNewProduct(newProductData: FormData): Observable<Product> {
    return this.httpClient.post<Product>(this.apiUrl, newProductData).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notificationService.showNotification({
          message: 'Failed to add new product.',
          action: 'Close',
        });
        return throwError(() => error);
      }),
      tap(() => this.getProducts())
    );
  }

  public deleteProduct(productId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${productId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notificationService.showNotification({
          message: 'Failed to delete product.',
          action: 'Close',
        });
        return throwError(() => error);
      }),
      tap(() => this.getProducts())
    );
  }

  public updateProduct(productId: number, product: FormData): Observable<Product> {
    return this.httpClient.put<Product>(`${this.apiUrl}/${productId}`, product).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notificationService.showNotification({
          message: 'Failed to update product.',
          action: 'Close',
        });
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
          this.notificationService.showNotification({
            message: 'Failed to get the products.',
            action: 'Close',
            duration: 5000,
          });
          return throwError(() => error);
        })
      )
      .subscribe((products) => this.productListSubject.next(products));
  }
}
