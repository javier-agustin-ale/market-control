import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Notification } from '../../interfaces/notification.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private matSnackBar = inject(MatSnackBar);

  public showNotification(notification: Notification): void {
    this.matSnackBar.open(notification.message, notification.action || 'OK', {
      duration: notification.duration || 3000,
    });
  }
}
