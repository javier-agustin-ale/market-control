import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NEVER, Observable } from 'rxjs';
import { TabContextEnum } from '../../enums/tab-context.enum';
import { Product } from '../../interfaces/product.interface';
import { ProductManagmentService } from '../../services/product-managment-service/product-managment.service';
import { AvailableProductsComponent } from '../available-products/available-products.component';
import { ProductFormComponent } from './product-form/product-form.component';

@Component({
  selector: 'app-products-managment',
  imports: [CommonModule, AvailableProductsComponent, ProductFormComponent],
  templateUrl: './products-managment.component.html',
  styleUrl: './products-managment.component.scss',
  standalone: true,
})
export class ProductsManagmentComponent implements OnInit {
  public productToEdit$: Observable<Product | null> = NEVER;
  public tabContextEnum = TabContextEnum;

  private productManagmentService = inject(ProductManagmentService);

  public ngOnInit(): void {
    this.defineStreams();
  }

  private defineStreams(): void {
    this.productToEdit$ = this.productManagmentService.productToEdit$;
  }
}
