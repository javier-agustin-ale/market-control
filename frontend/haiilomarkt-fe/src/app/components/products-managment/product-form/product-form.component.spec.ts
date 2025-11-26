import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom, of } from 'rxjs';
import { Product } from '../../../interfaces/product.interface';
import { ProductManagmentService } from '../../../services/product-managment-service/product-managment.service';
import { ProductService } from '../../../services/product-service/product.service';
import { ProductFormComponent } from './product-form.component';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productServiceMock: any;
  let productManagmentServiceMock: any;

  const mockProduct: Product = {
    productId: 1,
    name: 'Appel',
    unitPrice: 1,
    offerAmount: 3,
    offerPrice: 2,
    image: {
      type: 'Buffer',
      data: [137, 80, 78, 71],
    },
  };

  beforeEach(async () => {
    productServiceMock = {
      addNewProduct: jasmine.createSpy('addNewProduct').and.returnValue(of(void 0)),
      updateProduct: jasmine.createSpy('updateProduct').and.returnValue(of(void 0)),
    };

    productManagmentServiceMock = {
      selectedProductToEdit: jasmine.createSpy('selectedProductToEdit'),
    };

    await TestBed.configureTestingModule({
      imports: [ProductFormComponent, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        provideZonelessChangeDetection(),
        { provide: ProductService, useValue: productServiceMock },
        { provide: ProductManagmentService, useValue: productManagmentServiceMock },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with initial controls and validators', () => {
    component.ngOnInit();
    expect(component.formProduct.contains('name')).toBeTrue();
    expect(component.formProduct.contains('unitPrice')).toBeTrue();
    expect(component.formProduct.contains('offerAmount')).toBeTrue();
    expect(component.formProduct.contains('offerPrice')).toBeTrue();
    expect(component.formProduct.contains('containsOffer')).toBeTrue();

    component.formProduct.get('name')!.setValue('');
    expect(component.formProduct.get('name')!.valid).toBeFalse();
  });

  it('should patch form values and add file on ngOnChanges', () => {
    component.productToEdit = mockProduct as Product;
    component.ngOnChanges({
      productToEdit: {
        currentValue: mockProduct,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(component.formProduct.value.name).toBe('Appel');
    expect(component.getFileName()).toBe('Appel.png');

    // offerAmount exists
    expect(component.formProduct.get('containsOffer')!.value).toBeTrue();
  });

  it('should submit new product', async () => {
    component.ngOnInit();

    const file = new File(['abc'], 'file.png', { type: 'image/png' });
    component['file'] = file;

    component.formProduct.patchValue({
      name: 'New Product',
      unitPrice: 10,
      offerAmount: 2,
      offerPrice: 15,
      containsOffer: true,
    });

    const addNewProductSpy = productServiceMock.addNewProduct.and.returnValue(of(void 0));

    component.onSubmit(true);

    await firstValueFrom(addNewProductSpy.calls.mostRecent().returnValue);

    expect(productServiceMock.addNewProduct).toHaveBeenCalled();
    expect(productManagmentServiceMock.selectedProductToEdit).toHaveBeenCalledWith(null);
  });
});
