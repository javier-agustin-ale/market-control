import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ShoppingCartComponent } from '../../../checkout/checkout/shopping-cart/shopping-cart.component';
import { ProductFormComponent } from '../../products-management/product-form/product-form.component';
import { TabContext } from '../../../../core/interfaces/tab-context.type';
import { ProductManagmentService } from '../../services/product-managment-service/product-managment.service';
import { map, Observable } from 'rxjs';

export interface MobileSheetData {
  mode: 'cart' | 'product-form';
  tabContext?: TabContext;
}

@Component({
  selector: 'app-mobile-sheet',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    ShoppingCartComponent,
    ProductFormComponent,
  ],
  templateUrl: './mobile-sheet.component.html',
  styleUrl: './mobile-sheet.component.scss',
})
export class MobileSheetComponent {
  public data = inject<MobileSheetData>(MAT_DIALOG_DATA);
  private productManagmentService = inject(ProductManagmentService);

  public productToEdit$ = this.productManagmentService.productToEdit$;

  public get isProductFormSheet(): boolean {
    return this.data.mode === 'product-form';
  }

  public sheetTitle$: Observable<string> = this.productToEdit$.pipe(
    map((product) => {
      if (this.isProductFormSheet) {
        return product ? 'Edit Product' : 'Add New Product';
      }
      return 'Shopping Cart';
    }),
  );
}
