import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { NEVER, Observable, take } from 'rxjs';
import { AuthService } from '../../../core/auth/auth-service/auth.service';
import { ProfileUserEnum } from '../../../core/enums/profile-user.enum';
import { ProfileUserType } from '../../../core/interfaces/profile-user.type';
import { ProfileService } from '../../../core/services/profile-service/profile.service';
import { LogInFormComponent } from '../../auth/log-in-form/log-in-form.component';
import { CheckoutComponent } from '../../checkout/checkout/checkout.component';
import { ProductsManagementComponent } from '../../products/products-management/products-management.component';

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
  private authService = inject(AuthService);
  private readonly dialog = inject(MatDialog);

  public ngOnInit(): void {
    this.defineStreams();
    this.checkUserSession();
  }

  public adminLogIn(): void {
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

  public adminLogOut(): void {
    this.authService.logOut().subscribe((res) => {
      this.profileService.changeProfileUser(ProfileUserEnum.Client);
    });
  }

  private defineStreams(): void {
    this.profileUser$ = this.profileService.profileUser$;
  }

  private checkUserSession(): void {
    this.authService
      .isAuthenticated()
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          if (user) this.profileService.changeProfileUser(ProfileUserEnum.Admin);
        },
      });
  }
}
