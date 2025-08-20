import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.addPlanForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      hires: ['', [Validators.required, Validators.email]],
      jobSlots: ['', Validators.required],
      jobBrand: ['', Validators.required],
      searchResults: ['', Validators.required],
      cvViews: ['', Validators.required],
    });
  }

  addPlan() {

  }

  onSubmit(): void {
    if (this.addPlanForm.valid) {
      console.log('Form submitted!', this.addPlanForm.value);
    }
  }

}
