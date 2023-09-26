import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { PLATFORM_ID, inject } from '@angular/core';
import { map } from 'rxjs';
import { isPlatformServer } from '@angular/common';

export const canLoginByCookie: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router)

  const platformId = inject(PLATFORM_ID);

  if (isPlatformServer(platformId)) {
    return true
  }

  return authService.authenticateByCookie().pipe(
    map(({data}) => {
      if (data?.authenticateByCookie.response.code === 'U_03') {
        authService.loginUser();
        router.navigate(['/watchlist']);
        return false
      } else {
        router.navigate(['/login']);
        return true
      }
    })
  )
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canLoginByCookie(route, state);
