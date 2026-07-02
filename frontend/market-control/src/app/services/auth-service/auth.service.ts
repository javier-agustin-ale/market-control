import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Auth } from '../../interfaces/Auth/auth.interface';
import { UserLogIn } from '../../interfaces/Auth/user-log-in.interface';
import { NotificationService } from '../notification-service/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService,
  ) {}

  public logIn(logInData: UserLogIn): Observable<Auth> {
    return this.httpClient.post<Auth>(`${this.apiUrl}/auth/login`, logInData).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notificationService.showNotification({
          message: error.error.message || 'Log in failed.',
          action: 'Close',
          duration: 4000,
        });
        return throwError(() => error);
      }),
    );
  }
}
