import { Component } from '@angular/core';
import { AvailableProductsComponent } from '../available-products/available-products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-checkout',
  imports: [AvailableProductsComponent, ShoppingCartComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  standalone: true,
})
export class CheckoutComponent {}
