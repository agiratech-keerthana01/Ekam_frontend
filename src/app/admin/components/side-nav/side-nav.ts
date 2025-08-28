import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  standalone: false,
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss'
})
export class SideNav {

  menuItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
    { label: 'Candidate Management', icon: 'person', route: '/admin/candidates' },
    { label: 'Employer Management', icon: 'business', route: '/admin/employers' },
    { label: 'Job Management', icon: 'work', route: '/admin/jobs' },
    { label: 'Subscription Management', icon: 'subscriptions', route: '/admin/subscriptions' },
    { label: 'Payments', icon: 'payment', route: '/admin/payments' },
    { label: 'User Management', icon: 'group', route: '/admin/users' }
  ];

}
