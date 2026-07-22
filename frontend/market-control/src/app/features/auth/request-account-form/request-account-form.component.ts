import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../core/auth/auth-service/auth.service';
import { NotificationService } from '../../../core/services/notification-service/notification.service';

@Component({
  selector: 'app-request-account-form',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDialogContent,
    MatDialogClose,
  ],
  templateUrl: './request-account-form.component.html',
  styleUrl: './request-account-form.component.scss',
  standalone: true,
})
export class RequestAccountFormComponent {
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private dialogRef = inject(MatDialogRef<RequestAccountFormComponent>);
  private fb = inject(FormBuilder);

  public requestForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    linkedinProfile: [''],
    message: ['', [Validators.maxLength(200)]],
  });

  public isSubmitting = false;

  public isControlInvalid(controlName: string): boolean {
    const control = this.requestForm.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  public onSubmit(): void {
    if (this.requestForm.invalid || this.isSubmitting) {
      this.requestForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const formData = {
      name: this.requestForm.value.name || '',
      email: this.requestForm.value.email || '',
      linkedinProfile: this.requestForm.value.linkedinProfile || undefined,
      message: this.requestForm.value.message || undefined,
    };

    this.authService.requestAccount(formData).subscribe({
      next: (res) => {
        this.notificationService.showNotification({
          message: 'Request submitted successfully! We will be in touch shortly.',
          action: 'Close',
          duration: 5000,
        });
        this.dialogRef.close(true);
      },
      error: () => {
        this.isSubmitting = false;
      },
    });
  }
}
