import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ProductsManagmentComponent } from './products-managment.component';

describe('ProductsManagmentComponent', () => {
  let component: ProductsManagmentComponent;
  let fixture: ComponentFixture<ProductsManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsManagmentComponent, HttpClientTestingModule],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
