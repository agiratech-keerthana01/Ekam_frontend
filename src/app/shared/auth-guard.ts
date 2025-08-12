import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './services/auth';
import { JwtHelperService } from '@auth0/angular-jwt';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(Auth);
  const jwtHelper = new JwtHelperService();

  const token = sessionStorage.getItem('token');

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
