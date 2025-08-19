import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-dialog',
  imports: [CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './password-dialog.html',
  styleUrl: './password-dialog.scss'
})
export class PasswordDialog {

  passwordForm: FormGroup;
  hidePassword = true;
  hideConfirm = true;


  constructor(
    private fb: FormBuilder, 
    private dialogRef: MatDialogRef<PasswordDialog>,
    private auth: AuthService, 
    private snackBar: MatSnackBar,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { email: string }
  ) {
    this.passwordForm = this.fb.group({
        newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
        confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(form: FormGroup) {
    const newPass = form.get('newPassword')?.value;
    const confirmPass = form.get('confirmPassword')?.value;
    return newPass === confirmPass ? null : { mismatch: true }
  }

  get passwordRules() {
    const password = this.passwordForm.get('newPassword')?.value || '';
    return {
      length: password.length >= 8 && password.length <= 15,
      digitAndLetter: /[A-Za-z]/.test(password) && /\d/.test(password),
      lowerUpper: /[a-z]/.test(password) && /[A-Z]/.test(password),
      specialChar: /[!@#$%^&*()_]/.test(password)
    };
  }

  // onSubmit() {
  //   if (this.passwordForm.valid) {
  //     this.dialogRef.close(this.passwordForm.value.newPassword);
  //   }
  // }

  onSubmit() {
    if (this.passwordForm.valid) {
      const payload = {
        email: this.data.email,
        password: this.passwordForm.value.newPassword
      };

      this.auth.setupPassword(payload).subscribe({
        next: (res) => {
          // Show success message from backend
          this.snackBar.open(res.message || 'Password setup successful', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success'],
                verticalPosition: 'top',
          });

          // Close dialog 
          this.dialogRef.close({ success: true, message: res.message });
        },
        error: (err) => {
          // Show error message from backend
          this.snackBar.open(err.error?.message || 'Password setup failed', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
            verticalPosition: 'top',
          });
        }
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }

}
