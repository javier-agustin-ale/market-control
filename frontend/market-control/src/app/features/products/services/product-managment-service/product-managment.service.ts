import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductManagmentService {
  private productToSubject = new BehaviorSubject<Product | null>(null);
  public productToEdit$: Observable<Product | null> = this.productToSubject.asObservable();

  public selectedProductToEdit(productToEdit: Product | null): void {
    this.productToSubject.next(productToEdit);
  }
}
