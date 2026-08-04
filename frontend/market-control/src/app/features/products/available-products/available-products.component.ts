import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BehaviorSubject, combineLatest, map, NEVER, Observable, Subscription, withLatestFrom } from 'rxjs';
import { TabContextEnum } from '../../../core/enums/tab-context.enum';
import { TabContext } from '../../../core/interfaces/tab-context.type';
import { ScreenService } from '../../../core/services/screen-service/screen.service';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { ShoppingCartService } from '../../../shared/services/shopping-cart-service/shopping-cart-service';
import { Product } from '../interfaces/product.interface';
import { ProductCategory } from '../interfaces/product-category.interface';
import { ProductCategoryService } from '../services/product-category/product-category.service';
import { ProductService } from '../services/product-service/product.service';
import { MobileSheetComponent } from './mobile-sheet/mobile-sheet.component';
import { ProductManagmentService } from '../services/product-managment-service/product-managment.service';

@Component({
  selector: 'app-available-products',
  imports: [
    CommonModule,
    ProductCardComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './available-products.component.html',
  styleUrl: './available-products.component.scss',
  standalone: true,
})
export class AvailableProductsComponent implements OnInit, OnDestroy {
  @Input() tabContext!: TabContext;
  public tabContextEnum = TabContextEnum;

  public searchValue = '';
  public selectedCategoryId: number | null = null;
  public filteredProducts$: Observable<Product[]> = NEVER;
  public categories$: Observable<ProductCategory[]> = NEVER;

  private searchValue$ = new BehaviorSubject<string>('');
  private productService = inject(ProductService);
  private productCategoryService = inject(ProductCategoryService);
  private screenService = inject(ScreenService);
  private shoppingCartService = inject(ShoppingCartService);
  private productManagmentService = inject(ProductManagmentService);
  private dialog = inject(MatDialog);
  private subscription = new Subscription();

  public isMobile$ = this.screenService.isMobile$;
  @ViewChild('categoryFilter') private categoryFilterRef?: ElementRef<HTMLElement>;

  public shoppingCartCount$ = this.shoppingCartService.shoppingCartCount$;
  public isLoadingProducts$ = this.productService.isLoadingProducts$;

  public ngOnInit(): void {
    this.categories$ = this.productCategoryService.productCategoryList$;
    this.defineStreams();

    this.subscription.add(
      this.productManagmentService.productToEdit$
        .pipe(withLatestFrom(this.isMobile$))
        .subscribe(([product, isMobile]) => {
          if (product && isMobile) {
            this.openMobileProductForm(false);
          }
        }),
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public openMobileCart(): void {
    this.dialog.open(MobileSheetComponent, {
      width: 'min(95vw, calc(100vw - 20px))',
      maxHeight: '90vh',
      backdropClass: 'mobile-sheet-backdrop',
      panelClass: 'mobile-sheet-panel',
      data: { mode: 'cart' },
      autoFocus: false,
    });
  }

  public openMobileProductForm(isNew: boolean = false): void {
    if (isNew) {
      this.productManagmentService.selectedProductToEdit(null);
    }
    const dialogRef = this.dialog.open(MobileSheetComponent, {
      width: 'min(95vw, calc(100vw - 20px))',
      maxHeight: '90vh',
      backdropClass: 'mobile-sheet-backdrop',
      panelClass: 'mobile-sheet-panel',
      data: { mode: 'product-form' },
      autoFocus: false,
    });

    dialogRef?.afterClosed()?.subscribe(() => {
      this.productManagmentService.selectedProductToEdit(null);
    });
  }

  public onSearchChange(value: string): void {
    this.searchValue = value;
    this.searchValue$.next(value);
  }

  public clearSearch(): void {
    this.searchValue = '';
    this.searchValue$.next('');
  }

  public scrollCategoryPills(direction: 'left' | 'right'): void {
    const container = this.categoryFilterRef?.nativeElement;
    if (!container) return;

    const scrollAmount = Math.round(container.clientWidth * 0.35);
    container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  }

  public selectCategory(categoryId: number | null): void {
    if (this.selectedCategoryId === categoryId) return;

    this.selectedCategoryId = categoryId;
    this.productService.getProductsByCategory(categoryId);
    this.scrollSelectedCategoryIntoView();
  }

  private scrollSelectedCategoryIntoView(): void {
    const container = this.categoryFilterRef?.nativeElement;
    if (!container) return;

    const runScroll = () => {
      const activeButton = container.querySelector<HTMLElement>('.category-pill.active');
      if (!activeButton) return;

      const containerLeft = container.scrollLeft;
      const containerRight = containerLeft + container.clientWidth;
      const buttonLeft = activeButton.offsetLeft;
      const buttonRight = buttonLeft + activeButton.offsetWidth;
      const padding = 8;

      if (buttonLeft < containerLeft + padding) {
        container.scrollTo({ left: Math.max(0, buttonLeft - padding), behavior: 'smooth' });
      } else if (buttonRight > containerRight - padding) {
        container.scrollTo({
          left: buttonRight - container.clientWidth + padding,
          behavior: 'smooth',
        });
      }
    };

    setTimeout(runScroll, 0);
  }

  private defineStreams(): void {
    this.filteredProducts$ = combineLatest([
      this.productService.productList$,
      this.searchValue$,
    ]).pipe(
      map(([products, search]) => {
        const s = search.toLowerCase().trim();
        if (!s) return products;

        return products.filter((p) => p.name.toLowerCase().includes(s));
      }),
    );
  }
}
