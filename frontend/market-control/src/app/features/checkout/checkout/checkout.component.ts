import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TabContextEnum } from '../../../core/enums/tab-context.enum';
import { ScreenService } from '../../../core/services/screen-service/screen.service';
import { AvailableProductsComponent } from '../../products/available-products/available-products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, AvailableProductsComponent, ShoppingCartComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  standalone: true,
})
export class CheckoutComponent {
  private screenService = inject(ScreenService);
  public isMobile$ = this.screenService.isMobile$;
  public tabContextEnum = TabContextEnum;
}
