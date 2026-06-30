import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProfileUserType } from '../../types/profile-user.type';
import { ProfileUserEnum } from '../../enums/profile-user.enum';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profileUser: BehaviorSubject<ProfileUserType> = new BehaviorSubject<ProfileUserType>(
    ProfileUserEnum.Client,
  );
  public profileUser$: Observable<ProfileUserType> = this.profileUser.asObservable();

  public changeProfileUser(profile: ProfileUserType): void {
    this.profileUser.next(profile);
  }
}
