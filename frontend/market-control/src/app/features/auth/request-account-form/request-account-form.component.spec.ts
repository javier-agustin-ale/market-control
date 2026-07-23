import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { provideZonelessChangeDetection } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../core/auth/auth-service/auth.service';
import { NotificationService } from '../../../core/services/notification-service/notification.service';
import { RequestAccountFormComponent } from './request-account-form.component';

describe('RequestAccountFormComponent', () => {
  let component: RequestAccountFormComponent;
  let fixture: ComponentFixture<RequestAccountFormComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<RequestAccountFormComponent>>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['requestAccount']);
    notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['showNotification']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['closeAll']);
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [RequestAccountFormComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form validity', () => {
    it('should be invalid when empty', () => {
      expect(component.requestForm.invalid).toBeTrue();
    });

    it('should be invalid with a malformed email', () => {
      component.requestForm.setValue({
        name: 'Javi',
        email: 'not-an-email',
        linkedinProfile: '',
        message: '',
      });
      expect(component.requestForm.invalid).toBeTrue();
    });

    it('should be invalid when message exceeds 200 chars', () => {
      component.requestForm.patchValue({ message: 'a'.repeat(201) });
      expect(component.requestForm.get('message')?.invalid).toBeTrue();
    });

    it('should be valid with only required fields filled', () => {
      component.requestForm.setValue({
        name: 'Javi',
        email: 'javi@test.com',
        linkedinProfile: '',
        message: '',
      });
      expect(component.requestForm.valid).toBeTrue();
    });
  });

  describe('isControlInvalid', () => {
    it('should return false for an untouched, pristine invalid control', () => {
      expect(component.isControlInvalid('name')).toBeFalse();
    });

    it('should return true for an invalid, touched control', () => {
      component.requestForm.get('name')?.markAsTouched();
      expect(component.isControlInvalid('name')).toBeTrue();
    });

    it('should return true for an invalid, dirty control', () => {
      component.requestForm.get('email')?.setValue('bad');
      component.requestForm.get('email')?.markAsDirty();
      expect(component.isControlInvalid('email')).toBeTrue();
    });

    it('should return false for a nonexistent control', () => {
      expect(component.isControlInvalid('nope')).toBeFalse();
    });
  });

  describe('onSubmit', () => {
    it('should not call authService and should mark all as touched when form is invalid', () => {
      component.onSubmit();

      expect(authServiceSpy.requestAccount).not.toHaveBeenCalled();
      expect(component.requestForm.get('name')?.touched).toBeTrue();
      expect(component.requestForm.get('email')?.touched).toBeTrue();
    });

    it('should not call authService when already submitting', () => {
      component.requestForm.setValue({
        name: 'Javi',
        email: 'javi@test.com',
        linkedinProfile: '',
        message: '',
      });
      component.isSubmitting = true;

      component.onSubmit();

      expect(authServiceSpy.requestAccount).not.toHaveBeenCalled();
    });

    it('should call authService with trimmed/undefined optional fields', () => {
      authServiceSpy.requestAccount.and.returnValue(of({ message: '', requestCount: 1 }));
      component.requestForm.setValue({
        name: 'Javi',
        email: 'javi@test.com',
        linkedinProfile: '',
        message: '',
      });

      component.onSubmit();

      expect(authServiceSpy.requestAccount).toHaveBeenCalledWith({
        name: 'Javi',
        email: 'javi@test.com',
        linkedinProfile: undefined,
        message: undefined,
      });
    });

    it('should pass through linkedinProfile and message when provided', () => {
      authServiceSpy.requestAccount.and.returnValue(of({ message: '', requestCount: 1 }));
      component.requestForm.setValue({
        name: 'Javi',
        email: 'javi@test.com',
        linkedinProfile: 'linkedin.com/in/javi',
        message: 'Hello',
      });

      component.onSubmit();

      expect(authServiceSpy.requestAccount).toHaveBeenCalledWith({
        name: 'Javi',
        email: 'javi@test.com',
        linkedinProfile: 'linkedin.com/in/javi',
        message: 'Hello',
      });
    });

    it('should set isSubmitting to true immediately on valid submit', () => {
      authServiceSpy.requestAccount.and.returnValue(of({ message: '', requestCount: 1 }));
      component.requestForm.setValue({
        name: 'Javi',
        email: 'javi@test.com',
        linkedinProfile: '',
        message: '',
      });

      component.onSubmit();

      expect(component.isSubmitting).toBeTrue();
    });

    describe('on success', () => {
      beforeEach(() => {
        authServiceSpy.requestAccount.and.returnValue(of({ message: '', requestCount: 1 }));
        component.requestForm.setValue({
          name: 'Javi',
          email: 'javi@test.com',
          linkedinProfile: '',
          message: '',
        });
      });

      it('should show a success notification', () => {
        component.onSubmit();

        expect(notificationServiceSpy.showNotification).toHaveBeenCalledWith({
          message: 'Request submitted successfully! We will be in touch shortly.',
          action: 'Close',
          duration: 5000,
        });
      });

      it('should close all dialogs and close itself with true', () => {
        component.onSubmit();

        expect(dialogSpy.closeAll).toHaveBeenCalled();
        expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
      });
    });

    describe('on error', () => {
      it('should reset isSubmitting to false and not show notification or close dialog', () => {
        authServiceSpy.requestAccount.and.returnValue(throwError(() => new Error('fail')));
        component.requestForm.setValue({
          name: 'Javi',
          email: 'javi@test.com',
          linkedinProfile: '',
          message: '',
        });

        component.onSubmit();

        expect(component.isSubmitting).toBeFalse();
        expect(notificationServiceSpy.showNotification).not.toHaveBeenCalled();
        expect(dialogRefSpy.close).not.toHaveBeenCalled();
      });
    });
  });
});
