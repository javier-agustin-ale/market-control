import { SafeUrl } from '@angular/platform-browser';
import { Product } from './product.interface';

export interface ShoppingCartProduct extends Product {
  quantity: number;
  imageUrl: SafeUrl | null;
}
