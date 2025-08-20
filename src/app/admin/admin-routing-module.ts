import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admin } from './admin';
import { AddPlan } from './components/add-plan/add-plan';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';

const routes: Routes = [

  { path: 'login', component: Login },
  { path: '', component: Admin,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'add-plan', component: AddPlan },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
   }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

 }
