import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'watchlist',
    pathMatch: 'full',
  },
  {
    path: 'movie-search',
    loadComponent: () => import('./components/features/movie-search/movie-search.component').then(c => c.MovieSearchComponent),
    data: {
      animation: 'slideUp'
    }
  },
  {
    path: 'watchlist',
    loadComponent: () => import('./components/features/movie-dashboard/movie-dashboard/movie-dashboard.component').then(c => c.MovieDashboardComponent),
    data: {
      animation: 'watchList'
    },
  },
  {
    path: 'notifications',
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
    loadComponent: () => import('./components/profile/profile.component').then(c => c.ProfileComponent),
    data: {
      animation: 'slideDown'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
