import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatCardModule, MatTabsModule, CheckoutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  providers: [],
})
export class HomeComponent {}
