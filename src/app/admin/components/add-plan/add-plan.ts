import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../services/admin-service';

@Component({
  selector: 'app-add-plan',
  standalone: false,
  templateUrl: './add-plan.html',
  styleUrl: './add-plan.scss'
})
export class AddPlan {

  addPlanForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.addPlanForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      maxHires: ['', [Validators.required, Validators.email]],
      jobSlots: ['', Validators.required],
      jobBranding: ['', Validators.required],
      searchResults: ['', Validators.required],
      cvViews: ['', Validators.required],
    });
  }

 

  onSubmit(): void {
    if (this.addPlanForm.valid) {
      console.log('Form submitted!', this.addPlanForm.value);
    }

    this.adminService.createSubscription(this.addPlanForm.value).subscribe( {
      next: (res) => {
          this.snackBar.open('Subscription added successfully!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success'],
            verticalPosition: 'top',
          });
          console.log('Login response:', res);
        },
        error: () => {
          this.snackBar.open('Could not add Subscription', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
            verticalPosition: 'top',
          });
        },
    })

  }

}
