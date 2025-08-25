import { Component, OnInit } from '@angular/core';
import { PlanAdmin } from '../../../shared/models/planAdmin.model';
import { AdminService } from '../../services/admin-service';
import { EditPlanDialog } from '../../components/edit-plan-dialog/edit-plan-dialog';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription',
  standalone: false,
  templateUrl: './subscription.html',
  styleUrl: './subscription.scss',
})
export class Subscription implements OnInit {
  plans: PlanAdmin[] = [];

  constructor(private adminService: AdminService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.adminService.getAllSubscriptions().subscribe({
      next: (res) => {
        this.plans = res;
        console.log(res);
      },
      error: (err) => console.error('Error fetching plans:', err),
    });
  }

  onEditPlan(plan: PlanAdmin): void {
    const dialogRef = this.dialog.open(EditPlanDialog, {
      width: '600px',
      data: plan,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Updated plan:', result);
        // call API to save result
      }
    });
  }

  addPlan(): void {
    this.router.navigate(['/admin/add-plan']);
  }
}
