import { SafeUrl } from '@angular/platform-browser';
import { Product } from '../../products/interfaces/product.interface';

export interface ShoppingCartProduct extends Product {
  quantity: number;
  imageUrl: SafeUrl | null;
}
