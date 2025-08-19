import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { OtpDialog } from '../otp-dialog/otp-dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register-employer',
  imports: [CommonModule, 
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule, 
    MatDialogModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule
  ],
  templateUrl: './register-employer.html',
  styleUrl: './register-employer.scss'
})
export class RegisterEmployer {

  employerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.employerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      service: ['', Validators.required],
      serviceStatus: ['', Validators.required],
      rank: ['', Validators.required],
      branch: ['', Validators.required],
      hasCorporateExperience: [false],
    });
  }
  
  getOtp() {
    const emailValue = this.employerForm.get('email')?.value;

    if (!emailValue) {
      this.snackBar.open(
        'Please enter your email before requesting OTP',
        'Close',
        {
          duration: 3000,
          panelClass: ['snackbar-error'],
        }
      );
      return;
    }

    //Call backend to send OTP
    this.auth.registerEmployer({ email: emailValue }).subscribe({
      next: () => {
        console.log('OTP sent to:', emailValue);

        // Open OTP Dialog
        const dialogRef = this.dialog.open(OtpDialog, {
          width: '400px',
          data: { email: emailValue },
        });

        dialogRef.afterClosed().subscribe((otp) => {
          if (otp) {
            console.log('User entered OTP:', otp);

            const payload = {
              email: emailValue,
              otpCode: otp,
            };

            // Verify OTP
            this.auth.otpVerify(payload).subscribe({
              next: (res) => {
                console.log('OTP verification successful:', res);
                this.snackBar.open(
                  'OTP verified successfully! Now set your password.',
                  'Close',
                  {
                    duration: 3000,
                    panelClass: ['snackbar-success'],
                  }
                );
              },
              error: (err) => {
                console.error('OTP verification failed:', err);
                this.snackBar.open('Invalid or expired OTP.', 'Close', {
                  duration: 3000,
                  panelClass: ['snackbar-error'],
                });
              },
            });
          }
        });
      },
      error: (err) => {
        console.error('Failed to send OTP:', err);
        this.snackBar.open('Error sending OTP. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
      },
    });
  }

  onSubmit(): void {
    if (this.employerForm.valid) {
      console.log('Form submitted!', this.employerForm.value);
    }
  }

}
