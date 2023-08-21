import { Routes, RouterModule } from '@angular/router';
import { MovieDetailsComponent } from '../movie-details/movie-details/movie-details.component';
import { YoutubePlayerComponent } from '../../shared/youtube-player/youtube-player.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':title',
        component: MovieDetailsComponent,
        data: {
          title: 'Moonrise Kingdom',
          animation: 'movieDetail',
        },

      },
      {
        path: ':title/clip/:id',
        component: YoutubePlayerComponent,
        data: {
          title: 'Trailer #1',
          animation: 'clip',
        },
      }
    ],
  },
];

export const MovieDashboardRoutes = RouterModule.forChild(routes);
