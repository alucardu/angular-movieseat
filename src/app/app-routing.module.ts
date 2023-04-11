import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDashboardComponent } from './components/features/movieDashboard/movie-dashboard/movie-dashboard.component';

const routes: Routes = [
  {
    path: 'watchlist',
    component: MovieDashboardComponent,
    data: { animation: 'watchList' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
