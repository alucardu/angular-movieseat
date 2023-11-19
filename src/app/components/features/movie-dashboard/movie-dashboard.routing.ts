import { Routes, RouterModule } from '@angular/router';
import { MovieDetailsComponent } from '../movie-details/movie-details/movie-details.component';
import { YoutubePlayerComponent } from '../../shared/youtube-player/youtube-player.component';
import { MovieReviewComponent } from '../movie-details/movie-reviews/movie-review/movie-review.component';
import { CreateMovieReviewComponent } from '../movie-details/movie-reviews/create-movie-review/create-movie-review.component';
import { EditMovieReviewComponent } from '../movie-details/movie-reviews/edit-movie-review/edit-movie-review.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':id/:title',
        component: MovieDetailsComponent,
        data: {
          animation: 'slideLeft',
        },
      },
      {
        path: ':id/:title/clip/:key',
        component: YoutubePlayerComponent,
        data: {
          title: 'Trailer #1',
          animation: 'fade',
        },
      },
      {
        path: ':id/:title/review/create',
        component: CreateMovieReviewComponent,
        data: {
          animation: 'fade'
        }
      },
      {
        path: ':id/:title/review/:id',
        component: MovieReviewComponent,
        data: {
          title: 'Review #1',
          animation: 'fade'
        }
      },
      {
        path: ':id/:title/review/:id/edit',
        component: EditMovieReviewComponent,
        data: {
          title: 'Review #1',
          animation: 'fade'
        }
      },
    ],
  },
];

export const MovieDashboardRoutes = RouterModule.forChild(routes);
