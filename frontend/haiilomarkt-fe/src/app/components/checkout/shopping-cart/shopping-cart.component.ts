import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { map, NEVER, Observable } from 'rxjs';
import { ShoppingCartProduct } from '../../../interfaces/shopping-cart-product.interface';
import { ReverseShoppingCartListPipe } from '../../../pipes/reverse-shopping-card-list.pipe';
import { ShoppingCartService } from '../../../services/shopping-cart-service/shopping-cart-service';

@Component({
  selector: 'app-shopping-cart',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    ReverseShoppingCartListPipe,
    MatTooltipModule,
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
  standalone: true,
})
export class ShoppingCartComponent implements OnInit {
  public shoppingCart$: Observable<ShoppingCartProduct[]> = NEVER;
  public totalToPay$: Observable<number> = NEVER;

  private shoppingCartService = inject(ShoppingCartService);

  public ngOnInit(): void {
    this.defineStreams();
  }

  public decreaseQuantity(productId: number): void {
    this.shoppingCartService.decreaseQuantity(productId);
  }

  public getPricePerProduct(product: ShoppingCartProduct): number {
    // No offer.
    if (!product.offerAmount || !product.offerPrice) return product.unitPrice * product.quantity;
    // Minimun quantity not reached yet.
    if (product.offerAmount > product.quantity) return product.unitPrice * product.quantity;

    const appliedOffers = this.appliedOffers(product.quantity, product.offerAmount);
    const unitsOutOffer = product.quantity % product.offerAmount;

    const totalPerSameProducts =
      product.offerPrice * appliedOffers + unitsOutOffer * product.unitPrice;

    return totalPerSameProducts;
  }

  public getMoneySaved(product: ShoppingCartProduct): number | null {
    if (!product.offerAmount) return null;
    const totalWithDiscounts = this.getPricePerProduct(product);
    const withoutOfferWouldCost = product.quantity * product.unitPrice;

    const moneySaved = withoutOfferWouldCost - totalWithDiscounts;
    return moneySaved;
  }

  private appliedOffers(quantity: number, offerAmount: number): number {
    return Math.floor(quantity / offerAmount);
  }

  private defineStreams(): void {
    this.shoppingCart$ = this.shoppingCartService.shoppingCart$;

    this.totalToPay$ = this.shoppingCart$.pipe(
      map((products) => products.reduce((acc, p) => acc + this.getPricePerProduct(p), 0))
    );
  }
}
