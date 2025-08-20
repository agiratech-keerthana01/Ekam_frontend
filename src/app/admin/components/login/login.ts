import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin-service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm!: FormGroup;

  hide = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  togglePasswordVisibility(event: Event): void {
    event.stopPropagation();
    this.hide = !this.hide;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.adminService.login(formData).subscribe({
        next: (res) => {
          this.snackBar.open('Login Successful!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success'],
            verticalPosition: 'top',
          });
          localStorage.setItem('token', res.jwtToken);
          console.log("token is: ", res.jwtToken);


          const tokenPayload = JSON.parse(atob(res.jwtToken.split('.')[1]));
          const role = tokenPayload.role;
          const userId = tokenPayload.userId;
          localStorage.setItem('userId', JSON.stringify(res.userId));
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login Error:', error);
          this.snackBar.open(
            'Login Failed! Please check your credentials.',
            'Close',
            {
              duration: 3000,
              panelClass: ['snackbar-error'],
              verticalPosition: 'top',
            }
          );
        },
      });
    } else {
      this.snackBar.open('Form is invalid.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error'],
        verticalPosition: 'top',
      });
      console.log('Form is invalid');
    }
  }
}
