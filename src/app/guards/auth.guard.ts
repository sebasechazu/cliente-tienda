import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const service = inject(AuthService);

  if (service.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }

};
