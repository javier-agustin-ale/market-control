import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { AvailableProductsComponent } from './available-products.component';

describe('AvailableProductsComponent', () => {
  let component: AvailableProductsComponent;
  let fixture: ComponentFixture<AvailableProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableProductsComponent, HttpClientTestingModule],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(AvailableProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update searchValue', () => {
    const searchValue = 'Apple';
    component.onSearchChange(searchValue);
    expect(component.searchValue).toBe(searchValue);
  });

  it('should reset searchValue', () => {
    component.searchValue = 'test';
    component.clearSearch();
    expect(component.searchValue).toBe('');
  });

  it('should open the mobile product form sheet', () => {
    spyOn(component['dialog'], 'open');
    component.openMobileProductForm();

    expect(component['dialog'].open).toHaveBeenCalledWith(
      jasmine.any(Function),
      jasmine.objectContaining({
        data: { mode: 'product-form' },
      }),
    );
  });

  it('should open the mobile cart sheet', () => {
    spyOn(component['dialog'], 'open');
    component.openMobileCart();

    expect(component['dialog'].open).toHaveBeenCalledWith(
      jasmine.any(Function),
      jasmine.objectContaining({
        data: { mode: 'cart' },
      }),
    );
  });
});
