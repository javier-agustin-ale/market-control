import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NEVER, Observable } from 'rxjs';
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
  providers: [ProductService],
})
export class AvailableProductsComponent {
  @Input() context!: 'checkout' | 'productsManagment';

  public searchValue = '';
  public productList$: Observable<Product[]> = NEVER;

  private productService = inject(ProductService);

  public ngOnInit(): void {
    this.defineStreams();
  }

  private defineStreams(): void {
    this.productList$ = this.productService.productList$;
  }
}
