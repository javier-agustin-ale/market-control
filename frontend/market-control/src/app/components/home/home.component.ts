import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { NEVER, Observable } from 'rxjs';
import { ProfileUserEnum } from '../../enums/profile-user.enum';
import { ProfileService } from '../../services/profile-service/profile.service';
import { ProfileUserType } from '../../types/profile-user.type';
import { CheckoutComponent } from '../checkout/checkout.component';
import { LogInFormComponent } from '../log-in-form/log-in-form.component';
import { ProductsManagementComponent } from '../products-management/products-management.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    CheckoutComponent,
    MatButtonModule,
    MatMenuModule,
    ProductsManagementComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent implements OnInit {
  public profileUser$: Observable<ProfileUserType> = NEVER;
  public profileUserEnum = ProfileUserEnum;
  private profileService = inject(ProfileService);
  private readonly dialog = inject(MatDialog);

  public ngOnInit(): void {
    this.defineStreams();
  }

  public adminLogIn() {
    const dialogRef = this.dialog.open(LogInFormComponent, {
      autoFocus: 'first-tabbable',
      backdropClass: 'login-dialog-backdrop',
      panelClass: 'login-dialog-panel',
      width: 'min(92vw, 460px)',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.profileService.changeProfileUser(ProfileUserEnum.Admin);
      }
    });
  }

  private defineStreams() {
    this.profileUser$ = this.profileService.profileUser$;
  }
}
