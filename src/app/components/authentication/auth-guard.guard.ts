import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { PLATFORM_ID, inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { isPlatformServer } from '@angular/common';

export const canActivate: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const platformId = inject(PLATFORM_ID);

  if (isPlatformServer(platformId)) {
    return true
  }

  return authService.checkLoginState().pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['']);
      return of(false);
    })
  );
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);
