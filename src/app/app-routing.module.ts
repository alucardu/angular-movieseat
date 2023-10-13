import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate } from './components/authentication/auth-guard.guard';
import { canLoginByCookie } from './components/authentication/auth-guard-cookie.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canActivate: [canLoginByCookie],
    loadComponent: () => import('./components/authentication/placeholder/placeholder.component').then(c => c.PlaceholderComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./components/authentication/authentication.component').then(c => c.AuthenticationComponent),
    data: {
      animation: 'fade'
    }
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./components/authentication/sign-up/sign-up.component').then(c => c.SignUpComponent),
  },
  {
    path: 'confirmation',
    loadComponent: () => import('./components/authentication/confirmation/confirmation.component').then(c => c.ConfirmationComponent),
  },
  {
    path: 'movie-search',
    canActivate: [canActivate],
    loadComponent: () => import('./components/features/movie-search/movie-search.component').then(c => c.MovieSearchComponent),
    data: {
      animation: 'slideUp'
    }
  },
  {
    path: 'watchlist',
    canActivate: [canActivate],
    loadComponent: () => import('./components/features/watchlist/watchlist.component').then(c => c.WatchlistComponent),
    data: {
      animation: 'watchList'
    },
  },
  {
    path: 'notifications',
    canActivate: [canActivate],
    loadComponent: () => import('./components/notifications/notifications.component').then(c => c.NotificationsComponent),
    data: {
      animation: 'slideRight'
    },
  },
  {
    path: 'movie',
    loadChildren: () => import('./components/features/movie-dashboard/movie-dashboard.module').then(m => m.MovieDashboardModule),
  },
  {
    path: 'profile',
    canActivate: [canActivate],
    loadComponent: () => import('./components/profile/profile.component').then(c => c.ProfileComponent),
    data: {
      animation: 'slideDown'
    },
  },
  {
    path: 'biography/:id',
    canActivate: [canActivate],
    loadComponent: () => import('./components/biography/biography.component').then(c => c.BiographyComponent),
    data: {
      animation: 'slideRight'
    }
  },
  {
    path: 'watchlist/:id/:username',
    canActivate: [canActivate],
    loadComponent: () => import('./components/features/watchlist/watchlist.component').then(c => c.WatchlistComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
