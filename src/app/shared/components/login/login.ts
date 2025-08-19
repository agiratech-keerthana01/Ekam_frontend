// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatSelectModule } from '@angular/material/select';
// import { AuthService } from '../../services/auth.service';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute, RouterModule } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatDialog } from '@angular/material/dialog';
// import { OtpDialog } from '../otp-dialog/otp-dialog';
// import { PasswordDialog } from '../password-dialog/password-dialog';

// @Component({
//   selector: 'app-login',
//   imports: [
//     CommonModule,
//     MatIconModule,
//     MatFormFieldModule,
//     ReactiveFormsModule,
//     MatSelectModule,
//     RouterModule
//   ],
//   templateUrl: './login.html',
//   styleUrl: './login.scss'
// })
// export class Login {
//   mode: 'login' | 'register' = 'login';
//   role: 'candidate' | 'employer' = 'candidate';

//   loginForm!: FormGroup;
//   registerForm!: FormGroup;
//   hide = true;

//   constructor(
//     private fb: FormBuilder,
//     private auth: AuthService,
//     private route: ActivatedRoute,
//     private snackBar: MatSnackBar,
//     private dialog: MatDialog
//   ) {}

//   ngOnInit(): void {
//     // get role and mode from route params
//     this.route.paramMap.subscribe(params => {
//       this.role = (params.get('role') as 'candidate' | 'employer') || 'candidate';
//       this.mode = (params.get('mode') as 'login' | 'register') || 'login';
//     });

//     // login form
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//     });

//     // register form
//     this.registerForm = this.fb.group({
//       firstName: [''],
//       lastName: [''],
//       email: ['', [Validators.required, Validators.email]],
//       mobileNumber: ['', Validators.required],
//       service: [''],              // candidate only
//       serviceStatus: [''],        // candidate only
//       rank: [''],                 // candidate only
//       branch: [''],               // candidate only
//       hasCorporateExperience: [false],
//       companyName: [''],          // employer only
//       hrName: [''],               // employer only
//     });
//   }

//     togglePasswordVisibility(event: Event): void {
//     event.stopPropagation(); // Prevent default button behavior
//     this.hide = !this.hide;
//   }

//   getOtp() {
//   const emailValue = this.registerForm.get('email')?.value;

//   if (!emailValue) {
//     this.snackBar.open('Please enter email before requesting OTP', 'Close', { duration: 3000 });
//     return;
//   }

//   this.auth.otpVerify(payload).subscribe({
//     next: () => {
//       console.log('OTP sent to:', emailValue);

//       const dialogRef = this.dialog.open(OtpDialog, {
//         width: '400px',
//         data: { email: emailValue, role: this.role },
//       });

//       dialogRef.afterClosed().subscribe((otp) => {
//         if (otp) {
//           this.auth.otpVerify({ email: emailValue, otpCode: otp }).subscribe({
//             next: () => {
//               console.log('OTP verified');

//               // 👉 Open password dialog
//               const passDialog = this.dialog.open(PasswordDialog, {
//                 width: '400px',
//               });

//               passDialog.afterClosed().subscribe((password) => {
//                 if (password) {
//                   const payload = {
//                     ...this.registerForm.value,
//                     password,
//                     role: this.role
//                   };

//                   if (this.role === 'candidate') {
//                     this.auth.registerCandidate(payload).subscribe({
//                       next: () => this.snackBar.open('Candidate registered!', 'Close', { duration: 3000 }),
//                       error: () => this.snackBar.open('Candidate registration failed!', 'Close', { duration: 3000 }),
//                     });
//                   } else {
//                     this.auth.registerEmployer(payload).subscribe({
//                       next: () => this.snackBar.open('Employer registered!', 'Close', { duration: 3000 }),
//                       error: () => this.snackBar.open('Employer registration failed!', 'Close', { duration: 3000 }),
//                     });
//                   }
//                 }
//               });
//             },
//             error: () => this.snackBar.open('Invalid or expired OTP.', 'Close', { duration: 3000 }),
//           });
//         }
//       });
//     },
//     error: () => this.snackBar.open('Error sending OTP. Try again.', 'Close', { duration: 3000 }),
//   });
// }

//   /** --- Submit Handler --- */
//   onSubmit(): void {
//     if (this.mode === 'login' && this.loginForm.valid) {
//       console.log(`${this.role} login data:`, this.loginForm.value);
//       // you can call this.auth.loginCandidate / loginEmployer if APIs exist
//     } else if (this.mode === 'register' && this.registerForm.valid) {
//       console.log(`${this.role} register data:`, this.registerForm.value);

//       // Example: after OTP verification, save final registration
//       if (this.role === 'candidate') {
//         this.auth.saveCandidate(this.registerForm.value).subscribe({
//           next: () => {
//             this.snackBar.open('Candidate registered successfully!', 'Close', {
//               duration: 3000,
//               panelClass: ['snackbar-success'],
//             });
//           },
//           error: () => {
//             this.snackBar.open('Candidate registration failed!', 'Close', {
//               duration: 3000,
//               panelClass: ['snackbar-error'],
//             });
//           },
//         });
//       } else {
//         this.auth.saveEmployer(this.registerForm.value).subscribe({
//           next: () => {
//             this.snackBar.open('Employer registered successfully!', 'Close', {
//               duration: 3000,
//               panelClass: ['snackbar-success'],
//             });
//           },
//           error: () => {
//             this.snackBar.open('Employer registration failed!', 'Close', {
//               duration: 3000,
//               panelClass: ['snackbar-error'],
//             });
//           },
//         });
//       }
//     }
//   }

// }

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OtpDialog } from '../otp-dialog/otp-dialog';
import { PasswordDialog } from '../password-dialog/password-dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    RouterModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  mode: 'login' | 'register' = 'login';
  role: 'candidate' | 'employer' = 'candidate';

  loginForm!: FormGroup;
  registerForm!: FormGroup;
  hide = true;
  services: any[] = [];
  serviceStatuses: any[] = [];
  rankings: any[] = [];
  branches: any[] = [];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    // get role and mode from route params
    this.route.paramMap.subscribe((params) => {
      this.role =
        (params.get('role') as 'candidate' | 'employer') || 'candidate';
      this.mode = (params.get('mode') as 'login' | 'register') || 'login';
    });

    //get the services dropdown data
    this.auth.getServices().subscribe((data) => {
      this.services = data;
    });

    //get the service status dropdown data
    this.auth.getServiceStatus().subscribe((data) => {
      this.serviceStatuses = data;
    });

    //get ranks data
    this.auth.getRankings().subscribe((data) => {
      this.rankings = data;
    });

    //get branch data
    this.auth.getBranches().subscribe((data) => {
      this.branches = data;
    });

    // login form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    // register form
    this.registerForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      service: [''], // candidate only
      serviceStatus: [''], // candidate only
      ranking: [''], // candidate only
      branch: [''], // candidate only
      hasCorporateExperience: [false],
      companyName: [''], // employer only
      organizationSize: [''], // employer only
      organizationEmail: [''], // employer only
    });
  }

  togglePasswordVisibility(event: Event): void {
    event.stopPropagation();
    this.hide = !this.hide;
  }

  getOtp() {
    console.log("In getOtp")
    if (this.registerForm.invalid) {
      this.snackBar.open(
        'Please fill all required details before requesting OTP',
        'Close',
        {
          duration: 3000,
          panelClass: ['snackbar-error'],
            verticalPosition: 'top',
        }
      );
      return;
    }

    const formValue = this.registerForm.value;

    // Remove empty fields
    const cleanedPayload: any = {};
    Object.keys(formValue).forEach((key) => {
      const value = formValue[key];
      if (value !== null && value !== undefined && value !== '') {
        cleanedPayload[key] = value;
      }
    });

    const payload = {
      ...cleanedPayload,
      role: this.role,
    };

    if (this.role === 'candidate') {
      this.auth.registerCandidate(payload).subscribe({
        next: (response) => {
          if (response && response.userId) {
            //success only if userId exists
            this.snackBar.open(
              response.message || 'Please Verify. OTP sent to email!',
              'Close',
              {
                duration: 3000,
                panelClass: ['snackbar-success'],
                verticalPosition: 'top',
              }
            );
            console.log('Candidate registered:', response);

            this.openOtpDialog(payload.email);
          } else {
            this.snackBar.open(
              response.message || 'Registration failed!',
              'Close',
              { duration: 3000,
                panelClass: ['snackbar-error'],
            verticalPosition: 'top',
               }
            );
          }
        },
        error: () =>
          this.snackBar.open('Candidate registration failed!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
            verticalPosition: 'top',
          }),
      });
    } else {
      this.auth.registerEmployer(payload).subscribe({
        next: (response) => {
          if (response && response.userId) {
            //success only if userId exists
            this.snackBar.open(
              response.message || 'Please Verify. OTP sent to email!',
              'Close',
              {
                duration: 3000,
                panelClass: ['snackbar-success'],
                verticalPosition: 'top',
              }
            );
            console.log('Employer registered:', response);

            this.openOtpDialog(payload.email);
          } else {
            this.snackBar.open(
              response.message || 'Registration failed!',
              'Close',
              {
                duration: 3000,
                panelClass: ['snackbar-error'],
                verticalPosition: 'top',
              }
            );
          }
        },
        error: () =>
          this.snackBar.open('Employer registration failed!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
            verticalPosition: 'top',
          }),
      });
    }
  }

  openOtpDialog(emailValue: string) {
    const dialogRef = this.dialog.open(OtpDialog, {
      width: '400px',
      data: { email: emailValue, role: this.role },
    });

    dialogRef.afterClosed().subscribe((otp) => {
      if (otp) {
        this.verifyOtp(emailValue, otp);
      }
    });
  }

  verifyOtp(emailValue: string, otp: string) {
    this.auth.otpVerify({ email: emailValue, otpCode: otp }).subscribe({
      next: (response) => {
        if (response && response.userId) {
          //only open password dialog if OTP valid
          this.snackBar.open('OTP verified!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success'],
            verticalPosition: 'top',
          });
          console.log('OTP verified');
          this.openPasswordDialog();
        } else {
          this.snackBar.open(response.message || 'Invalid OTP.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
            verticalPosition: 'top',
          });
        }
      },
      error: () =>
        this.snackBar.open('Invalid or expired OTP.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
          verticalPosition: 'top',
        }),
    });
  }

  openPasswordDialog() {
    const passDialog = this.dialog.open(PasswordDialog, { width: '400px' });

    passDialog.afterClosed().subscribe((password) => {
      if (password) {
        const payload = {
          email: this.registerForm.value.email, // user’s email from form
          password: password, // password from dialog
        };

        this.auth.setupPassword(payload).subscribe({
          next: (res) => {
            this.snackBar.open(
              res.message || 'Password set successfully!',
              'Close',
              {
                duration: 3000,
                panelClass: ['snackbar-success'],
                verticalPosition: 'top',
              }
            );

            //Navigate after short delay (so user sees snackbar)
            setTimeout(() => {
              if (this.role === 'candidate') {
                this.router.navigate(['/candidate/login']);
              } else {
                this.router.navigate(['/employer/login']);
              }
            }, 3000);
          },
          error: (err) => {
            this.snackBar.open(
              err.error?.message || 'Failed to set password. Try again.',
              'Close',
              {
                duration: 3000,
                panelClass: ['snackbar-error'],
                verticalPosition: 'top',
              }
            );
          },
        });
      }
    });
  }

  /** --- Login --- */
  onSubmit(): void {
    if (this.mode === 'login' && this.loginForm.valid) {
      console.log(`${this.role} login data:`, this.loginForm.value);
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.snackBar.open('Login successful!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success'],
            verticalPosition: 'top',
          });
          console.log('Login response:', res);
        },
        error: () => {
          this.snackBar.open('Login failed!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
            verticalPosition: 'top',
          });
        },
      });
    }
  }
}
