import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, take } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../core/services/notification-service/notification.service';
import { ProductCategory } from '../../interfaces/product-category.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  private productCategorySubject = new BehaviorSubject<ProductCategory[]>([]);
  public productCategoryList$: Observable<ProductCategory[]> =
    this.productCategorySubject.asObservable();

  private apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService,
  ) {
    this.getCategories();
  }

  // public addNewProduct(newProductData: FormData): Observable<Product> {
  //   return this.httpClient
  //     .post<Product>(this.apiUrl, newProductData, { withCredentials: true })
  //     .pipe(
  //       catchError((error: HttpErrorResponse) => {
  //         this.notificationService.showNotification({
  //           message: 'Failed to add new product.',
  //           action: 'Close',
  //         });
  //         return throwError(() => error);
  //       }),
  //       tap(() => this.getCategories()),
  //     );
  // }

  private getCategories(): void {
    this.httpClient
      .get<ProductCategory[]>(`${this.apiUrl}/categories`)
      .pipe(
        take(1),
        catchError(() => {
          this.notificationService.showNotification({
            message: 'Failed to get the products.',
            action: 'Close',
            duration: 5000,
          });
          return of([]);
        }),
      )
      .subscribe((categories) => {
        this.productCategorySubject.next(categories);
      });
  }
}
