import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SafeUrl } from '@angular/platform-browser';
import { catchError, Subscription, throwError } from 'rxjs';
import { TabContextEnum } from '../../enums/tab-context.enum';
import { Product } from '../../interfaces/product.interface';
import { ShoppingCartProduct } from '../../interfaces/shopping-cart-product.interface';
import { ProductManagmentService } from '../../services/product-managment-service/product-managment.service';
import { ProductService } from '../../services/product-service/product.service';
import { ShoppingCartService } from '../../services/shopping-cart-service/shopping-cart-service';
import { TabContext } from '../../types/tab-context.type';
import { DeleteProductDialogComponent } from './delete-product-dialog/delete-product-dialog.component';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  standalone: true,
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() public product!: Product;
  @Input() public tabContext!: TabContext;

  public tabContextEnum = TabContextEnum;

  public cardImage: SafeUrl | null = null;
  private dialogRefSubscription!: Subscription;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private productManagmentService: ProductManagmentService,
    private productService: ProductService,
    private dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  public ngOnInit(): void {
    this.convertImage();
  }

  public addToCart(): void {
    const productToAdd: ShoppingCartProduct = {
      ...this.product,
      quantity: 1,
      imageUrl: this.cardImage,
    };
    this.shoppingCartService.addProductToCart(productToAdd);
  }

  public selectedProductToEdit(product: Product): void {
    this.productManagmentService.selectedProductToEdit(product);
  }

  public openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteProductDialogComponent, {
      data: this.product.name,
    });

    this.dialogRefSubscription = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService
          .deleteProduct(this.product.productId)
          .pipe(
            catchError(() => {
              return throwError(
                () => new Error('Failed to delete product. Please try again later.')
              );
            })
          )
          .subscribe();
      }
    });
  }

  private convertImage(): void {
    const data = this.product.image.data;

    if (!isPlatformBrowser(this.platformId) || !data) {
      this.cardImage = null;
      return;
    }

    const bytes = new Uint8Array(data);
    const binary = String.fromCharCode(...bytes);
    const base64 = btoa(binary);

    this.cardImage = `data:image/jpeg;base64,${base64}`;
  }

  public ngOnDestroy(): void {
    this.dialogRefSubscription?.unsubscribe();
  }
}
