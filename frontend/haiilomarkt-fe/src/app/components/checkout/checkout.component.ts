import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AvailableProductsComponent } from '../available-products/available-products.component';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, MatTableModule, AvailableProductsComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  standalone: true,
})
export class CheckoutComponent {
  public displayedColumns: string[] = ['scanned', 'quantity', 'price'];
  public dataSource = [
    { scanned: 'Apple', quantity: 1, price: 1.5 },
    { scanned: 'Bananas', quantity: 1, price: 3 },
    { scanned: 'Mars', quantity: 3, price: 5.4 },
    { scanned: 'Snickers', quantity: 2, price: 1.0 },
    { scanned: 'Brot', quantity: 1, price: 0.5 },
    { scanned: 'Apple', quantity: 1, price: 1.5 },
    { scanned: 'Bananas', quantity: 1, price: 3 },
    { scanned: 'Mars', quantity: 3, price: 5.4 },
    { scanned: 'Snickers', quantity: 2, price: 1.0 },
    { scanned: 'Brot', quantity: 1, price: 0.5 },
    { scanned: 'Apple', quantity: 1, price: 1.5 },
    { scanned: 'Bananas', quantity: 1, price: 3 },
    { scanned: 'Mars', quantity: 3, price: 5.4 },
  ];
}
