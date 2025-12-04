import { TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection } from '@angular/core';
import { Notification } from '../../interfaces/notification.interface';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show the notification', () => {
    const snackBarSpy = spyOn(service['matSnackBar'], 'open');

    const notification: Notification = {
      message: 'Test Message',
      action: 'Close',
      duration: 5000,
    };
    service.showNotification(notification);
    expect(snackBarSpy).toHaveBeenCalledWith('Test Message', 'Close', {
      duration: 5000,
    });
  });
});
