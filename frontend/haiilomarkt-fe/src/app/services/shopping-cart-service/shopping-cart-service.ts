import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShoppingCartProduct } from '../../interfaces/shopping-cart-product.interface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private shoppingCartSubject = new BehaviorSubject<ShoppingCartProduct[]>([]);
  public shoppingCart$: Observable<ShoppingCartProduct[]> = this.shoppingCartSubject.asObservable();

  public addProductToCart(newProduct: ShoppingCartProduct): void {
    const currentCart = this.shoppingCartSubject.getValue();

    const productAlreadyInCart = currentCart.find(
      (product) => product.productId === newProduct.productId
    );
    if (productAlreadyInCart) {
      productAlreadyInCart.quantity += newProduct.quantity;
      this.shoppingCartSubject.next([...currentCart]);
      return;
    }
    this.shoppingCartSubject.next([...currentCart, newProduct]);
  }

  public decreaseQuantity(productId: number): void {
    const currentCart = this.shoppingCartSubject.getValue();

    const product = currentCart.find((product) => product.productId === productId);
    if (product && product.quantity >= 2) {
      product.quantity--;
      this.shoppingCartSubject.next([...currentCart]);
      return;
    }

    const updatedCart = currentCart.filter((product) => product.productId !== productId);
    this.shoppingCartSubject.next(updatedCart);
  }
}
