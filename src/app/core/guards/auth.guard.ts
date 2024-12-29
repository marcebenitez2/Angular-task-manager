// src/app/core/guards/auth.guard.ts
import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    if (state.url.includes('/auth')) {
      // Si está autenticado y trata de acceder a auth, redirigir a projects
      router.navigate(['/projects']);
      return false;
    }
    return true;
  } else {
    if (!state.url.includes('/auth')) {
      // Si no está autenticado y trata de acceder a una ruta protegida, redirigir a login
      router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
};