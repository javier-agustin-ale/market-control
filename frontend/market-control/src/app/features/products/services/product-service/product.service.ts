import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, take, tap, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../core/services/notification-service/notification.service';
import { Product } from '../../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productListSubject = new BehaviorSubject<Product[]>([]);
  public productList$: Observable<Product[]> = this.productListSubject.asObservable();

  private isLoadingProductsSubject = new BehaviorSubject<boolean>(false);
  public isLoadingProducts$: Observable<boolean> = this.isLoadingProductsSubject.asObservable();

  private selectedCategoryId: number | null = null;
  private apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService,
  ) {
    this.getProducts();
  }

  public addNewProduct(newProductData: FormData): Observable<Product> {
    return this.httpClient
      .post<Product>(this.apiUrl, newProductData, { withCredentials: true })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.notificationService.showNotification({
            message: 'Failed to add new product.',
            action: 'Close',
          });
          return throwError(() => error);
        }),
        tap(() => this.getProducts(this.selectedCategoryId)),
      );
  }

  public deleteProduct(productId: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.apiUrl}/${productId}`, { withCredentials: true })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.notificationService.showNotification({
            message: 'Failed to delete product.',
            action: 'Close',
          });
          return throwError(() => error);
        }),
        tap(() => this.getProducts(this.selectedCategoryId)),
      );
  }

  public updateProduct(productId: number, product: FormData): Observable<Product> {
    return this.httpClient
      .put<Product>(`${this.apiUrl}/${productId}`, product, {
        withCredentials: true,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.notificationService.showNotification({
            message: 'Failed to update product.',
            action: 'Close',
          });
          return throwError(() => error);
        }),
        tap(() => this.getProducts(this.selectedCategoryId)),
      );
  }

  public getProductsByCategory(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    this.getProducts(categoryId);
  }

  private getProducts(categoryId: number | null = null): void {
    this.isLoadingProductsSubject.next(true);
    const params = categoryId ? new HttpParams().set('categoryId', categoryId) : undefined;

    this.httpClient
      .get<Product[]>(`${this.apiUrl}/allProducts`, { params })
      .pipe(
        take(1),
        catchError((error) => {
          this.notificationService.showNotification({
            message: 'Failed to get the products.',
            action: 'Close',
            duration: 5000,
          });
          return of([]);
        }),
        finalize(() => this.isLoadingProductsSubject.next(false)),
      )
      .subscribe((products) => this.productListSubject.next(products));
  }
}
