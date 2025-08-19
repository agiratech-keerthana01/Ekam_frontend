import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { PasswordDialog } from '../password-dialog/password-dialog';

@Component({
  selector: 'app-otp-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './otp-dialog.html',
  styleUrl: './otp-dialog.scss',
})
export class OtpDialog implements OnInit {
  otpDigits = ['', '', '', '', '', '']; // 6-digit OTP
  countdown = 60;
  interval: any;
  errorMessage: string = '';

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<OtpDialog>,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: { email: string }
  ) {}

  ngOnInit() {
    this.startCountdown();
  }

  onOtpInput(index: number, event: any) {
    const value = event.target.value;

    // Move to next input if a digit is entered
    if (value && index < this.otpDigits.length - 1) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }

    // If backspace is pressed on empty field, move to previous input
    if (!value && event.inputType === 'deleteContentBackward' && index > 0) {
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
    }
  }

  startCountdown() {
    this.interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
        this.cdr.detectChanges();
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  resendOtp() {
    console.log('Resend OTP to', this.data.email);
    this.countdown = 60;
    this.startCountdown();
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }

  verifyOtp() {
    const otp = this.otpDigits.join('');
    const payload = {
      email: this.data.email,
      otpCode: otp,
    };

    this.authService.otpVerify(payload).subscribe({
      next: (res: any) => {
        if (
          res.message ===
          'OTP verified successfully. You can now set your password.'
        ) {
          console.log('OTP verified successfully:', res);

          this.dialogRef.close();
          this.dialog.open(PasswordDialog, {
            width: '460px',
            disableClose: true,
            data: { email: this.data.email },
          });
        } else {
          console.warn('OTP verification failed:', res.message);
          this.errorMessage = res.message || 'Invalid OTP. Please try again.';
        }
      },
      error: (err) => {
        console.error('OTP verification failed', err);
        this.errorMessage = 'Invalid OTP. Please try again.';
      },
    });
  }

  editEmail() {
    console.log('Edit email clicked');
  }

  trackByIndex(index: number): number {
    return index;
  }
}
