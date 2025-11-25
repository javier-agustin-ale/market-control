import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, NEVER, Observable, take, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../../interfaces/product.interface';

@Injectable()
export class ProductService {
  public productList$: Observable<Product[]> = NEVER;

  private baseUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
    this.defineStreams();
  }

  private defineStreams(): void {
    this.productList$ = this.httpClient.get<Product[]>(this.baseUrl + '/allProducts').pipe(
      take(1),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
