import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { of } from 'rxjs';
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

  it('should keep the category filters visible while products are loading', () => {
    component.categories$ = of([{ categoryId: 1, name: 'Fruit' }]);
    component.isLoadingProducts$ = of(true);

    fixture.detectChanges();

    const categoryFilterWrapper = fixture.nativeElement.querySelector('.category-filter-wrapper');
    expect(categoryFilterWrapper).toBeTruthy();
  });

  it('should scroll the selected category pill into view after selection', fakeAsync(() => {
    const container = document.createElement('div');
    const button = document.createElement('button');
    button.className = 'category-pill active';
    Object.defineProperty(button, 'offsetLeft', { configurable: true, value: 40 });
    Object.defineProperty(button, 'offsetWidth', { configurable: true, value: 80 });
    Object.defineProperty(container, 'scrollLeft', { configurable: true, writable: true, value: 0 });
    Object.defineProperty(container, 'clientWidth', { configurable: true, value: 120 });
    container.appendChild(button);

    component['categoryFilterRef'] = { nativeElement: container } as any;
    const scrollToSpy = spyOn(container, 'scrollTo');

    component.selectCategory(1);
    tick(0);

    expect(scrollToSpy).toHaveBeenCalled();
    const firstCall = scrollToSpy.calls.first();
    const options = firstCall?.args[0] as unknown as { left: number; behavior: string } | undefined;
    expect(options?.left).toBe(32);
    expect(options?.behavior).toBe('smooth');
  }));
});
