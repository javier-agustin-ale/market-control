import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SafeUrl } from '@angular/platform-browser';
import { Product } from '../../../interfaces/product.interface';
@Component({
  selector: 'app-product-card',
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  standalone: true,
})
export class ProductCardComponent implements OnInit {
  @Input() public product!: Product;
  @Input() public context!: 'checkout' | 'productsManagment';

  public cardImage: SafeUrl | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  public ngOnInit(): void {
    this.convertImage();
  }

  private convertImage(): void {
    const data = this.product.image.data;

    if (!isPlatformBrowser(this.platformId) || !data) {
      this.cardImage = null;
      return;
    }

    const bytes = new Uint8Array(data);
    const binary = String.fromCharCode(...bytes);
    const base64 = btoa(binary);

    this.cardImage = `data:image/jpeg;base64,${base64}`;
  }
}
