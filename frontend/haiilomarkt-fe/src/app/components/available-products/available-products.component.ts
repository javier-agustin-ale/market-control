import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BehaviorSubject, combineLatest, map, NEVER, Observable } from 'rxjs';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product-service/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-available-products',
  imports: [
    CommonModule,
    ProductCardComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './available-products.component.html',
  styleUrl: './available-products.component.scss',
  standalone: true,
})
export class AvailableProductsComponent {
  @Input() context!: 'checkout' | 'productsManagment';

  public searchValue = '';
  public filteredProducts$: Observable<Product[]> = NEVER;

  private searchValue$ = new BehaviorSubject<string>('');
  private productService = inject(ProductService);

  public ngOnInit(): void {
    this.defineStreams();
  }

  public onSearchChange(value: string): void {
    this.searchValue = value;
    this.searchValue$.next(value);
  }

  public clearSearch(): void {
    this.searchValue = '';
    this.searchValue$.next('');
  }

  private defineStreams(): void {
    this.filteredProducts$ = combineLatest([
      this.productService.productList$,
      this.searchValue$,
    ]).pipe(
      map(([products, search]) => {
        const s = search.toLowerCase().trim();
        if (!s) return products;

        return products.filter((p) => p.name.toLowerCase().includes(s));
      })
    );
  }
}
