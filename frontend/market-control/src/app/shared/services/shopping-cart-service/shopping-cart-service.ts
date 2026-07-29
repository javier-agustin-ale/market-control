import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ShoppingCartProduct } from '../../../features/checkout/interfaces/shopping-cart-product.interface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private shoppingCartSubject = new BehaviorSubject<ShoppingCartProduct[]>([]);
  public shoppingCart$: Observable<ShoppingCartProduct[]> = this.shoppingCartSubject.asObservable();
  public shoppingCartCount$: Observable<number> = this.shoppingCartSubject
    .asObservable()
    .pipe(map((products) => products.reduce((total, product) => total + product.quantity, 0)));

  public addProductToCart(newProduct: ShoppingCartProduct): void {
    const currentCart = this.shoppingCartSubject.getValue();

    const productAlreadyInCart = currentCart.find(
      (product) => product.productId === newProduct.productId,
    );

    if (productAlreadyInCart) {
      const updatedCart = currentCart.map((product) =>
        product.productId === newProduct.productId
          ? { ...product, quantity: product.quantity + newProduct.quantity }
          : product,
      );
      this.shoppingCartSubject.next(updatedCart);
      return;
    }

    this.shoppingCartSubject.next([...currentCart, newProduct]);
  }

  public decreaseQuantity(productId: number): void {
    const currentCart = this.shoppingCartSubject.getValue();

    const product = currentCart.find((product) => product.productId === productId);

    if (product && product.quantity >= 2) {
      const updatedCart = currentCart.map((p) =>
        p.productId === productId ? { ...p, quantity: p.quantity - 1 } : p,
      );
      this.shoppingCartSubject.next(updatedCart);
      return;
    }

    const updatedCart = currentCart.filter((product) => product.productId !== productId);
    this.shoppingCartSubject.next(updatedCart);
  }

  public resetShoppingCart(): void {
    this.shoppingCartSubject.next([]);
  }
}
