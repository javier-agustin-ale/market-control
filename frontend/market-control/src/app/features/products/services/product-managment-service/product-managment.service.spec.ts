import { TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection } from '@angular/core';
import { ProductManagmentService } from './product-managment.service';

describe('ProductManagmentService', () => {
  let service: ProductManagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(ProductManagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
