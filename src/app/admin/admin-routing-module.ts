import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admin } from './admin';
import { SideNav } from './components/side-nav/side-nav';

const routes: Routes = [
  { path: '', component: Admin,
    children: [
      { path: '', component: SideNav },
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
