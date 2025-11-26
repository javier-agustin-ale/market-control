import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsManagementComponent } from './products-management.component';

describe('ProductsManagmentComponent', () => {
  let component: ProductsManagementComponent;
  let fixture: ComponentFixture<ProductsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsManagementComponent, HttpClientTestingModule],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
