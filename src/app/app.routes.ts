import { Routes } from '@angular/router';
import { Hero } from './shared/components/hero/hero';
import { Login } from './shared/components/login/login';
import { authGuard } from './shared/auth-guard';
import { NavbarComponent } from './shared/components/navbar-component/navbar-component';
import { AdminLogin } from './admin/components/admin-login/admin-login';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin-module').then((m) => m.AdminModule),
    canActivate: [authGuard],
  },

  {
    path: 'employer', loadChildren: () => import('./employer/employer-module').then((m) => m.EmployerModule),
  },

  { path: 'login', component: AdminLogin },

  {
    path: '',
    component: NavbarComponent,
    children: [
      { path: '', component: Hero },
      { path: 'auth/:role/:mode', component: Login },
    ],
  },
];
