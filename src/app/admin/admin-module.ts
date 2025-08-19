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


@NgModule({
  declarations: [Admin, SideNav],
  imports: [
    CommonModule,
    RouterOutlet,
    AdminRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule
    
  ],
  exports: [SideNav]
})
export class AdminModule { 

}
