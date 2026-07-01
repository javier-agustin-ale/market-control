import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { CheckoutComponent } from '../checkout/checkout.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileService } from '../../services/profile-service/profile.service';
import { ProfileUserEnum } from '../../enums/profile-user.enum';
import { ProfileUserType } from '../../types/profile-user.type';
import { NEVER, Observable } from 'rxjs';
import { LogInComponent } from '../log-in/log-in.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    CheckoutComponent,
    MatButtonModule,
    MatMenuModule,
    LogInComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent implements OnInit {
  public profileUser$: Observable<ProfileUserType> = NEVER;
  public profileUserEnum = ProfileUserEnum;
  private profileService = inject(ProfileService);

  public ngOnInit(): void {
    this.defineStreams();
  }

  public changeProfile(profile: ProfileUserType) {
    this.profileService.changeProfileUser(profile);
  }

  private defineStreams() {
    this.profileUser$ = this.profileService.profileUser$;
  }
}
