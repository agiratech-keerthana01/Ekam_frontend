import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar-component',
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule, RouterOutlet],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.scss'
})
export class NavbarComponent {

  mainButtonIcon = 'assets/Ic_chevron-down.png';

  candidateLinks = [
    { name: 'All jobs', path: '/candidate/jobs', icon: 'assets/Ic_Job category.png' },
    { name: 'Explore employer', path: '/candidate/employers', icon: 'assets/Ic_Employer.png' },
    { name: 'Candidate dashboard', path: '/candidate/dashboard', icon: 'assets/Ic_Dashboard.png' },
  ];

  employerLinks = [
    { name: 'Ekam for employer', path: '/employer/home', icon: 'assets/Ic_Employer.png' },
    { name: 'Find candidate', path: '/employer/find-candidate', icon: 'assets/Ic_Find Candidate.png' },
    { name: 'Employer dashboard', path: '/employer/dashboard', icon: 'assets/Ic_Dashboard.png' },
  ];


  constructor(private router: Router){

  }


  navigateToDropDown(path: string){
    this.router.navigate([`/${path}`]);
  }

  navigateTo(role: 'candidate' | 'employer', mode: 'login' | 'register') {
  this.router.navigate([`/${role}/${mode}`]);
}

  adminLoginPage(): void {
    this.router.navigate(['/AdminLogin']);
  }



}
