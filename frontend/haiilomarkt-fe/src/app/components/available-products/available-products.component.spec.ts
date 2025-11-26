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
});
