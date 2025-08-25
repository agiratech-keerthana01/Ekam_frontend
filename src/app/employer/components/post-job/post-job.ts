import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployerService } from '../../services/employer-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-job',
  standalone: false,
  templateUrl: './post-job.html',
  styleUrl: './post-job.scss'
})
export class PostJob {

  postJobForm!: FormGroup;

  categories: any[] = [];
  locations: any[] = [];
  jobTypes: any[] = [];
  skills: any[] = [];
  benefitsList = ['Health Insurance', 'Work From Home', 'Bonus', 'Free Food'];
  documentsList = ['Resume', 'ID Proof', 'Certificates', 'Experience Letter'];


  constructor(private fb: FormBuilder, 
    private router: Router, 
    private employerService: EmployerService,
  private snackBar: MatSnackBar,) {}


  ngOnInit(): void {


    this.employerService.getCategory().subscribe((data) => {
      this.categories = data;
    });

    this.employerService.getLocations().subscribe((data) => {
      this.locations = data;
    });

    this.employerService.getJobType().subscribe((data) => {
      this.jobTypes = data;
    });

    this.employerService.getSkills().subscribe((data) => {
      this.skills = data;
    })


    this.postJobForm = this.fb.group({
      title: ['', Validators.required],
      categories: ['', Validators.required],
      salaryRange: ['', Validators.required],
      experience: ['', Validators.required],
      jobTypes: ['', Validators.required],
      applyBefore: ['', Validators.required],
      locations: ['', Validators.required],
      jobDescription: ['', Validators.required],
      rolesResponsibity: ['', Validators.required],
      qualification: ['', Validators.required],
      skills: ['', Validators.required],
      benefits: this.fb.array(this.benefitsList.map(() => new FormControl(false))),
      documentsRequired: this.fb.array(this.documentsList.map(() => new FormControl(false)))

    })
  }

  get benefits(): FormArray {
    return this.postJobForm.get('benefits') as FormArray;
  }
  get documentsRequired(): FormArray {
    return this.postJobForm.get('documentsRequired') as FormArray;
  }



  getSelectedValues(controlName: string, sourceList: string[]): string[] {
  const formArray = this.postJobForm.get(controlName) as FormArray;
  return formArray.controls
    .map((control, i) => (control.value ? sourceList[i] : null))
    .filter(v => v !== null) as string[];
}



 onSubmit(): void {
     if (this.postJobForm.valid) {
      const userId = localStorage.getItem('userId');
      const payload = {
        ...this.postJobForm.value,
        benefits: this.getSelectedValues('benefits', this.benefitsList).join(","),
        documentsRequired: this.getSelectedValues('documentsRequired', this.documentsList).join(","),
        userId: userId ? Number(userId) : null
    };

     console.log('Final payload:', payload);

    this.employerService.postJob(payload).subscribe( {
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

}
