import { Component, OnInit, inject } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { MovieRatingComponent } from '../../rating-stars/movie-rating.component';
import { FormControl, Validators } from '@angular/forms';
import { MovieReviewsService } from '../movie-reviews.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { SnackBarState, SnackbBarService } from 'src/app/services/snackbBar.service';
import { IResponse } from 'src/types/userTypes';
import { NotificationService } from 'src/app/components/notifications/notification.service';
import { AuthService } from 'src/app/components/authentication/auth.service';
import { MovieDetailsService } from '../../movie-details/movie-details.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-movie-review',
  templateUrl: './create-movie-review.component.html',
  styleUrls: ['./create-movie-review.component.scss'],
  standalone: true,
  imports: [MaterialModule, MovieRatingComponent, CommonModule]
})
export class CreateMovieReviewComponent implements OnInit {
  private movieReviewsService = inject(MovieReviewsService)
  private snackBarService = inject(SnackbBarService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private notificationService = inject(NotificationService)
  private authService = inject(AuthService)
  private movieService = inject(MovieDetailsService)

  public review = new FormControl<string>('', [Validators.required, Validators.minLength(6)]);

  private movieId!: string | null;
  private movieTitle!: string | null;

  public ngOnInit(): void {
    this.route.paramMap.pipe(take(1)).subscribe({
      next: (data) => {
        this.movieId = data.get('id')
        this.movieTitle = data.get('title')
      }
    })

    this.movieService.getMovie(Number(this.movieId))
  }

  public addReviewToMovie(): void {
    this.review.markAsTouched();

    if(this.review.invalid) return

    this.movieReviewsService.addReviewToMovie(this.review, this.movieId!).subscribe({
      next: ({data}) => {
        if (data) {
          const { response: response, data : reviewData } = data.addReviewToMovie;
          this.movieReviewsService.getMovieReviews(this.movieId!)
          this.router.navigate([`/movie/${this.movieId}/${this.movieTitle}/`])
          this.snackBarService.openSnackBar(response, SnackBarState.SUCCESS, reviewData)
          this.notificationService.createNotification('movie_review', 'N_01', data.addReviewToMovie.data, this.authService.getCurrentUser() )
        }
      },
      error: (data) => {
        const response: IResponse = {
          type: 'review',
          code: data.message
        }
        this.snackBarService.openSnackBar(response, SnackBarState.ERROR)
      }
    })
  }
}
