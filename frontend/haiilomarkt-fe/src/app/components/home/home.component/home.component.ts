import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { NEVER, Observable } from 'rxjs';
import { Product } from '../../../interfaces/product.interface';
import { ProductService } from '../../../services/product-service/product.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatCardModule, MatTabsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  providers: [ProductService],
})
export class HomeComponent implements OnInit {
  public productList$: Observable<Product[]> = NEVER;

  private prodcutService = inject(ProductService);

  public ngOnInit(): void {
    this.defineStreams();
  }

  private defineStreams(): void {
    this.productList$ = this.prodcutService.productList$;

    this.productList$.subscribe((products) => console.log(products));
  }
}
