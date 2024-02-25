import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../layoults/auth/auth.service';

export const adminauthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar si el usuario está autenticado
  if (!authService.authUser) {
    return router.createUrlTree(['auth', 'login']);
  }

  // Verificar el rol del usuario
  const isAdmin = authService.authUser.role === 'ADMIN';

  // Establecer la propiedad isAdmin en el servicio de autenticación
  authService.isAdmin = isAdmin;

  return true;
};
