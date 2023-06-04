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
          title: 'Moonrise Kingdome',
          animation: 'movieDetail',
        },
      },
    ],
  },
];

export const MovieDashboardRoutes = RouterModule.forChild(routes);
