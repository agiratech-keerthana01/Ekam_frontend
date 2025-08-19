import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const jwtHelper = new JwtHelperService();

  const token = localStorage.getItem('token');

  if (!token || jwtHelper.isTokenExpired(token)) {
    return router.parseUrl('/login');
  }


  const expectedRoles = route.data?.['roles'] as string[] | undefined;
  if (expectedRoles) {
    const decodedToken = jwtHelper.decodeToken(token);
    if (!expectedRoles.includes(decodedToken.role)) {
      return router.parseUrl('/unauthorized');
    }
  }  

  return true;
};


// { 
//   path: 'admin', 
//   loadChildren: () => import('./admin/admin-module').then(m => m.AdminModule), 
//   canActivate: [authGuard],
//   data: { roles: ['Admin'] }   // 👈 only Admin role can access
// }

//ACCESSED ONLY BY ADMIN (PATH)
