import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing-module';
import { SideNav } from './components/side-nav/side-nav';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet } from '@angular/router';
import { Admin } from './admin';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AddPlan } from './components/add-plan/add-plan';
import { Dashboard } from './components/dashboard/dashboard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Login } from './components/login/login';


@NgModule({
  declarations: [Admin, SideNav, AddPlan, Dashboard, Login],
  imports: [
    CommonModule,
    RouterOutlet,
    AdminRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSnackBarModule,
    
  ],
  exports: [SideNav]
})
export class AdminModule { 

}
