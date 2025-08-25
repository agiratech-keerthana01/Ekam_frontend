import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlanAdmin } from '../../../shared/models/planAdmin.model';

@Component({
  selector: 'app-plan-card',
  standalone: false,
  templateUrl: './plan-card.html',
  styleUrl: './plan-card.scss'
})
export class PlanCard {

  @Input() plan!: PlanAdmin;
  @Output() editPlan = new EventEmitter<PlanAdmin>();

  onEdit(): void {
    this.editPlan.emit(this.plan); // send the plan ID to parent
  }

}
