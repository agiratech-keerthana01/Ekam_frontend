import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlanAdmin } from '../../../shared/models/planAdmin.model';
import { AdminService } from '../../services/admin-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-plan-dialog',
  standalone: false,
  templateUrl: './edit-plan-dialog.html',
  styleUrl: './edit-plan-dialog.scss'
})
export class EditPlanDialog {

  editPlanForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditPlanDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PlanAdmin
  ) {}

  ngOnInit(): void {
    this.editPlanForm = this.fb.group({
      name: [{ value: this.data.name, disabled: true }, Validators.required], // disabled field
      price: [this.data.price, Validators.required],
      maxHires: [this.data.maxHires, Validators.required],
      jobSlots: [this.data.jobSlots, Validators.required],
      searchResults: [this.data.searchResults, Validators.required],
      cvViews: [this.data.cvViews, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.editPlanForm.valid) {
      const updatedPlan = {
        ...this.data, // keep original id, name, etc.
        ...this.editPlanForm.getRawValue(), // get values including disabled fields
      };

      this.adminService.updateSubscription(this.data.id, updatedPlan).subscribe({
        next: (res) => {
          this.snackBar.open('Plan updated successfully', 'Close', {
            duration: 3000,
            verticalPosition: 'top'
          });
          this.dialogRef.close(res); // pass back updated plan to parent
        },
        error: (err) => {
          console.error('Update failed:', err);
          this.snackBar.open('Failed to update plan', 'Close', {
            duration: 3000,
            verticalPosition: 'top'
          });
        }
      });
      
    }

    
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
