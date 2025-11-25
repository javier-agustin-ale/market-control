import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SafeUrl } from '@angular/platform-browser';
import { Product } from '../../interfaces/product.interface';
import { ShoppingCartProduct } from '../../interfaces/shopping-cart-product.interface';
import { ShoppingCartService } from '../../services/shopping-cart-service/shopping-cart-service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  standalone: true,
})
export class ProductCardComponent implements OnInit {
  @Input() public product!: Product;
  @Input() public context!: 'checkout' | 'productsManagment';

  public cardImage: SafeUrl | null = null;

  constructor(
    private shoppingCartService: ShoppingCartService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  public ngOnInit(): void {
    this.convertImage();
  }

  public addToCart(): void {
    const productToAdd: ShoppingCartProduct = {
      ...this.product,
      quantity: 1,
      imageUrl: this.cardImage,
    };
    this.shoppingCartService.addProductToCart(productToAdd);
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
