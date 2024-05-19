import { inject } from '@angular/core';
import { User, getAuth } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  const user = authService.currentUser();
  console.log(user);
  
  if (user) {
    return true;
  }
  router.navigateByUrl('/login');
  return false;
};