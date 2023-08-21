import { Routes, RouterModule } from '@angular/router';
import { MovieDetailsComponent } from '../movie-details/movie-details/movie-details.component';
import { YoutubePlayerComponent } from '../../shared/youtube-player/youtube-player.component';
import { MovieReviewComponent } from '../movie-details/movie-reviews/movie-review/movie-review.component';
import { CreateMovieReviewComponent } from '../movie-details/movie-reviews/create-movie-review/create-movie-review.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':title',
        component: MovieDetailsComponent,
        data: {
          title: 'Moonrise Kingdom',
          animation: 'slideLeft',
        },
      },
      {
        path: ':title/clip/:id',
        component: YoutubePlayerComponent,
        data: {
          title: 'Trailer #1',
          animation: 'fade',
        },
      },
      {
        path: ':title/review/create',
        component: CreateMovieReviewComponent,
        data: {
          animation: 'fade'
        }
      },
      {
        path: ':title/review/:id',
        component: MovieReviewComponent,
        data: {
          title: 'Review #1',
          animation: 'fade'
        }
      },

    ],
  },
];

export const MovieDashboardRoutes = RouterModule.forChild(routes);
