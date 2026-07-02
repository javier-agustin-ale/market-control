import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserLogIn } from '../../interfaces/Auth/user-log-in.interface';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-log-in-form',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDialogContent,
    MatDialogClose,
  ],
  templateUrl: './log-in-form.component.html',
  styleUrl: './log-in-form.component.scss',
  standalone: true,
})
export class LogInFormComponent {
  public hidePassword = true;

  private authService = inject(AuthService);
  private dialogRef = inject(MatDialogRef<LogInFormComponent>);
  private fb = inject(FormBuilder);

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberSession: [true],
  });

  public isControlInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const form: UserLogIn = {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || '',
    };
    this.authService.logIn(form).subscribe({
      next: () => this.dialogRef.close(true),
      error: () => {},
    });
  }
}
