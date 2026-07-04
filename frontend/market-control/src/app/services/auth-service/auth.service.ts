import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError, timer } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Auth } from '../../interfaces/Auth/auth.interface';
import { UserData } from '../../interfaces/Auth/user-data.interface';
import { UserLogIn } from '../../interfaces/Auth/user-log-in.interface';
import { NotificationService } from '../notification-service/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = environment.apiUrl + '/auth';

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService,
  ) {}

  public logIn(logInData: UserLogIn): Observable<Auth> {
    return this.httpClient
      .post<Auth>(`${this.apiUrl}/login`, logInData, { withCredentials: true })
      .pipe(
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

  public logOut(): Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      retry({
        count: 3,
        delay: (error: HttpErrorResponse, retryCount: number) => {
          if (error.status === 401 || error.status === 403) {
            throw error;
          }
          return timer(retryCount * 1000);
        },
      }),
      catchError((error: HttpErrorResponse) => {
        this.notificationService.showNotification({
          message: error.error.message || 'Log out failed.',
          action: 'Close',
          duration: 3000,
        });
        return throwError(() => error);
      }),
    );
  }

  public isAuthenticated(): Observable<UserData> {
    return this.httpClient.get<UserData>(`${this.apiUrl}/me`, {
      withCredentials: true,
    });
  }
}
