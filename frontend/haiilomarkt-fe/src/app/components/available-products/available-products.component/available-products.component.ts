import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ProductCardComponent } from '../../product-card/product-card.component.ts/product-card.component';

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
}
