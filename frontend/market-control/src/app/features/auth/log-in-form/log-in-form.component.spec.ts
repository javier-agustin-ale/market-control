import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { provideZonelessChangeDetection } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../core/auth/auth-service/auth.service';
import { LogInFormComponent } from './log-in-form.component';

describe('LogInFormComponent', () => {
  let component: LogInFormComponent;
  let fixture: ComponentFixture<LogInFormComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<LogInFormComponent>>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logIn']);
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [LogInFormComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatDialog, useValue: {} },
        { provide: MatDialogRef, useValue: dialogRefSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LogInFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when empty', () => {
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should mark all as touched and not submit when form is invalid', () => {
    component.onSubmit();

    expect(authServiceSpy.logIn).not.toHaveBeenCalled();
    expect(component.loginForm.get('email')?.touched).toBeTrue();
  });

  it('should log in and close the dialog when form is valid', () => {
    authServiceSpy.logIn.and.returnValue(of({} as any));
    component.loginForm.setValue({
      email: 'javi@test.com',
      password: 'secret1',
      rememberSession: true,
    });

    component.onSubmit();

    expect(authServiceSpy.logIn).toHaveBeenCalledWith({
      email: 'javi@test.com',
      password: 'secret1',
    });
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });
});
