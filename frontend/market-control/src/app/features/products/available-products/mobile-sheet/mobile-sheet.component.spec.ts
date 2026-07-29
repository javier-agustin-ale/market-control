import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { MobileSheetComponent } from './mobile-sheet.component';

describe('MobileSheetComponent', () => {
  let component: MobileSheetComponent;
  let fixture: ComponentFixture<MobileSheetComponent>;

  const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileSheetComponent, HttpClientTestingModule],
      providers: [
        provideZonelessChangeDetection(),
        { provide: MatDialogRef, useValue: mockDialogRef },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { mode: 'cart' },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display shopping cart title when mode is cart', () => {
    component.data = { mode: 'cart' };
    let title = '';
    component.sheetTitle$.subscribe((t) => (title = t));
    expect(title).toBe('Shopping Cart');
  });

  it('should display add new product title when mode is product-form', () => {
    component.data = { mode: 'product-form' };
    let title = '';
    component.sheetTitle$.subscribe((t) => (title = t));
    expect(title).toBe('Add New Product');
  });

  it('should identify product form sheet correctly', () => {
    component.data = { mode: 'product-form' };
    expect(component.isProductFormSheet).toBeTrue();

    component.data = { mode: 'cart' };
    expect(component.isProductFormSheet).toBeFalse();
  });
});
