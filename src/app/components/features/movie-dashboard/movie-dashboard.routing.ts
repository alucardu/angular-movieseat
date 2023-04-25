import { Routes, RouterModule } from '@angular/router';
import { MovieDetailsComponent } from '../movie-details/movie-details/movie-details.component';

const routes: Routes = [
  {
    path: 'movie',
    children: [
      {
        path: ':title',
        component: MovieDetailsComponent,
        data: {
          animation: 'movieDetail',
        },
      },
    ],
  },
];

export const MovieDashboardRoutes = RouterModule.forChild(routes);
