import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDashboardComponent } from './components/features/movie-dashboard/movie-dashboard/movie-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'watchlist',
    pathMatch: 'full',
    data: {
      title: 'test'
    }
  },
  {
    path: 'watchlist',
    component: MovieDashboardComponent,
    data: {
      title: 'Watchlist',
      animation: 'watchList' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
