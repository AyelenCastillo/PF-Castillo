import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../layoults/auth/auth.service';

export const adminauthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

 
  if (!authService.authUser) {
    return router.createUrlTree(['auth', 'login']);
  }

  const isAdmin = authService.authUser.role === 'ADMIN';


  authService.isAdmin = isAdmin;

  return true;
};
