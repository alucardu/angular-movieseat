import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { PLATFORM_ID, inject } from '@angular/core';
import { map } from 'rxjs';
import { isPlatformServer } from '@angular/common';
import { SnackBarState, SnackbBarService } from 'src/app/services/snackbBar.service';
import { CapacitorCookies } from '@capacitor/core';

export const canLoginByCookie: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router)
  const snackBarService = inject(SnackbBarService)

  const platformId = inject(PLATFORM_ID);

  if (isPlatformServer(platformId)) {
    return true
  }

  return authService.authenticateByCookie().pipe(
    map(({data}) => {
      if (data?.authenticateByCookie.response.code === 'U_06') {
        CapacitorCookies.deleteCookie({
          url: 'https://moviese.at',
          key: 'authToken',
        });
        snackBarService.openSnackBar(data.authenticateByCookie.response, SnackBarState.ERROR)
      }

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
