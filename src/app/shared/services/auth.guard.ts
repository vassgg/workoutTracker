import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const user = JSON.parse(localStorage.getItem('user') as string);
  if (user) {
    return true;
  }
  return router.createUrlTree(['/login']);
};

export const authGuardLoggedIn: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const user = JSON.parse(localStorage.getItem('user') as string);
  if (!user) {
    return true;
  }
  return router.createUrlTree(['/home']);
};
