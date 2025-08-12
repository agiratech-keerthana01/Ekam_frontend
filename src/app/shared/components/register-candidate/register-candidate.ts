import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import intlTelInput from 'intl-tel-input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-register-candidate',
  standalone: true,
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
    MatIconModule
  ],
  templateUrl: './register-candidate.html',
  styleUrl: './register-candidate.scss'
})
export class RegisterCandidate {

  candidateForm!: FormGroup;
  iti: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.candidateForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      service: ['', Validators.required],
      serviceStatus: ['', Validators.required],
      rank: ['', Validators.required],
      branch: ['', Validators.required],
      hasCorporateExperience: [false],
      subscribeToNewsletter: [false]
    });
  }

  // ngAfterViewInit(): void {
  //   const phoneInput = document.querySelector<HTMLInputElement>('#phone');
  //   if (phoneInput) {
  //     this.iti = intlTelInput(phoneInput, {
  //       initialCountry: 'in',
  //       separateDialCode: true, // shows +91 separately
  //       nationalMode: false, // always show the international format
  //       autoPlaceholder: 'polite',
  //       utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
  //     });

  //     // Prevent editing the "+" sign
  //     phoneInput.addEventListener('keydown', (event: KeyboardEvent) => {
  //       if (phoneInput.selectionStart === 0 && event.key !== '+' && event.key !== 'ArrowRight') {
  //         event.preventDefault();
  //       }
  //     });

  //     // Update form when country changes
  //     phoneInput.addEventListener('countrychange', () => {
  //       this.candidateForm.patchValue({
  //         mobileNumber: this.iti.getNumber()
  //       });
  //     });

  //     // Update form on input change
  //     phoneInput.addEventListener('input', () => {
  //       this.candidateForm.patchValue({
  //         mobileNumber: this.iti.getNumber()
  //       });
  //     });
  //   }
  // }

  onSubmit(): void {
    if (this.candidateForm.valid) {
      console.log('Form submitted!', this.candidateForm.value);
    }
  }
}
