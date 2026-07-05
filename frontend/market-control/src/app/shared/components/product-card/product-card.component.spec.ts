import { HttpClientTestingModule } from '@angular/common/http/testing'; // si tu servicio lo usa
import { PLATFORM_ID, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductCardComponent } from './product-card.component';

import { Product } from '../../interfaces/product.interface';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  const mockProduct: Product = {
    productId: 1,
    name: 'Appel',
    unitPrice: 1,
    offerAmount: null,
    offerPrice: null,
    image: {
      type: 'Buffer',
      data: [137, 80, 78, 71],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductCardComponent,
        HttpClientTestingModule,
        MatDialogModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatTooltipModule,
      ],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: PLATFORM_ID,
          useValue: 'browser',
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;

    component.product = mockProduct;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert image to base64', () => {
    expect(component.cardImage).toContain('data:image/jpeg;base64');
    expect(component.cardImage).not.toBeNull();
  });

  it('should add product to cart', () => {
    spyOn(component['shoppingCartService'], 'addProductToCart');

    component.addToCart();

    expect(component['shoppingCartService'].addProductToCart).toHaveBeenCalledWith(
      jasmine.objectContaining({
        productId: mockProduct.productId,
        imageUrl: component.cardImage,
        quantity: 1,
      })
    );
  });

  it('should add product selectedProductToEdit', () => {
    spyOn(component['productManagmentService'], 'selectedProductToEdit');

    component.selectedProductToEdit(mockProduct);

    expect(component['productManagmentService'].selectedProductToEdit).toHaveBeenCalledWith(
      jasmine.objectContaining(mockProduct)
    );
  });
});
