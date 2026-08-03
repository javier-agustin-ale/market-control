import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom, of } from 'rxjs';
import { Product } from '../../interfaces/product.interface';
import { ProductManagmentService } from '../../services/product-managment-service/product-managment.service';
import { ProductService } from '../../services/product-service/product.service';
import { ProductFormComponent } from './product-form.component';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productServiceMock: any;
  let productManagmentServiceMock: any;

  const mockProduct: Product = {
    productId: 1,
    name: 'Apple',
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

  it('should build File from existing image when setting productToEdit', () => {
    component.ngOnInit();

    (component as any).productToEdit = mockProduct;

    const file = (component as any).file as File;
    expect(file).toBeTruthy();
    expect(file.name).toContain('Apple');
  });

  it('should submit new product', async () => {
    component.ngOnInit();

    const file = new File(['abc'], 'file.png', { type: 'image/png' });
    (component as any).file = file;

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

  it('should clear values and validation state when clearing the form', () => {
    component.formProduct.patchValue({
      name: '',
      unitPrice: null,
      containsOffer: true,
      offerAmount: null,
      offerPrice: null,
    });
    component.formProduct.markAllAsTouched();

    expect(component.isControlInvalid('name')).toBeTrue();

    component.clearForm();

    expect(component.formProduct.value).toEqual({
      name: '',
      unitPrice: null,
      offerAmount: null,
      offerPrice: null,
      containsOffer: false,
    });
    expect(component.isControlInvalid('name')).toBeFalse();
    expect(component.formProduct.pristine).toBeTrue();
    expect(component.formProduct.untouched).toBeTrue();
  });

  it('should reset offer validators after submitting a product with an offer', async () => {
    const file = new File(['abc'], 'file.png', { type: 'image/png' });
    (component as any).file = file;

    component.formProduct.patchValue({
      name: 'Offer Product',
      unitPrice: 10,
      containsOffer: true,
      offerAmount: 2,
      offerPrice: 15,
    });

    const addNewProductSpy = productServiceMock.addNewProduct.and.returnValue(of(void 0));

    component.onSubmit(true);

    await firstValueFrom(addNewProductSpy.calls.mostRecent().returnValue);

    component.formProduct.patchValue({
      name: 'Regular Product',
      unitPrice: 5,
      containsOffer: false,
    });
    (component as any).file = file;

    expect(component.formProduct.get('offerAmount')?.hasValidator(Validators.required)).toBeFalse();
    expect(component.formProduct.get('offerPrice')?.hasValidator(Validators.required)).toBeFalse();
    expect(component.formProduct.valid).toBeTrue();
  });
});
