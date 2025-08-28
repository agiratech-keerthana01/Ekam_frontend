import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PlanAdmin } from '../../../shared/models/planAdmin.model';
import { EmployerService } from '../../services/employer-service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-plan',
  standalone: false,
  templateUrl: './view-plan.html',
  styleUrl: './view-plan.scss'
})
export class ViewPlan implements OnInit{

   plans: PlanAdmin[] = [];

  constructor(
    private employerService: EmployerService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadPlans();
  }

  loadPlans(): void {
    this.employerService.getAllPlans().subscribe({
      next: (data: PlanAdmin[]) => {
        this.plans = data;
        console.log('Plans loaded successfully:', this.plans);
        this.cdr.detectChanges();
      },
      error: (e) => {
        console.error('Error fetching plans:', e);
      }

    });
  }


  buy(plan: PlanAdmin): void {
    console.log(`Buying plan: ${plan.name} (ID: ${plan.id})`);
    this.router.navigate(['/employer/buy-plan', plan.id]);
  }

}
