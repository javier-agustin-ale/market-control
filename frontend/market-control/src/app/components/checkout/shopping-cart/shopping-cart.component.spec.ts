import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ShoppingCartProduct } from '../../../interfaces/shopping-cart-product.interface';
import { ShoppingCartComponent } from './shopping-cart.component';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;

  const productWithOffer: ShoppingCartProduct = {
    productId: 1,
    name: 'Appel',
    quantity: 3,
    unitPrice: 1,
    offerAmount: 3,
    offerPrice: 2,
    imageUrl: null,
    image: {
      type: 'Buffer',
      data: [137, 80, 78, 71],
    },
  };

  const productNoOffer: ShoppingCartProduct = {
    productId: 2,
    name: 'Orange',
    quantity: 3,
    unitPrice: 1,
    offerAmount: null,
    offerPrice: null,
    imageUrl: null,
    image: {
      type: 'Buffer',
      data: [137, 80, 78, 71],
    },
  };

  const productNoOfferReached: ShoppingCartProduct = {
    productId: 3,
    name: 'Watermelon',
    quantity: 2,
    unitPrice: 1,
    offerAmount: 5,
    offerPrice: 4,
    imageUrl: null,
    image: {
      type: 'Buffer',
      data: [137, 80, 78, 71],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCartComponent, HttpClientTestingModule],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call decreaseQuantity on service when decreaseQuantity is called', () => {
    spyOn(component['shoppingCartService'], 'decreaseQuantity');
    const productId = 5;

    component.decreaseQuantity(productId);

    expect(component['shoppingCartService'].decreaseQuantity).toHaveBeenCalledWith(productId);
  });

  describe('getPricePerProduct', () => {
    it('should calculate price with offer applied', () => {
      const price = component.getPricePerProduct(productWithOffer);
      expect(price).toBe(2);
    });

    it('should calculate price without offer', () => {
      const price = component.getPricePerProduct(productNoOffer);
      expect(price).toBe(3);
    });

    it('should calculate price with offer not reached', () => {
      const price = component.getPricePerProduct(productNoOfferReached);
      expect(price).toBe(2);
    });
  });

  it('should return correct money saved if offer applies', () => {
    const moneySaved = component.getMoneySaved(productWithOffer);
    expect(moneySaved).toBe(1);
  });

  it('should call resetShoppingCart on clearCart', () => {
    spyOn(component['shoppingCartService'], 'resetShoppingCart');
    component.clearCart();

    expect(component['shoppingCartService'].resetShoppingCart).toHaveBeenCalled();
  });
});
