import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { fadeAnimation } from 'src/app/animations';
import { MaterialModule } from 'src/app/material.module';
import { MovieRatingComponent } from '../../rating-stars/movie-rating.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IMovieReview, MovieReviewsService } from '../movie-reviews.service';
import { take } from 'rxjs';
import { StripTitle } from 'src/app/utils/string-utils';
import { AuthService } from 'src/app/components/authentication/auth.service';
import { SnackBarState, SnackbBarService } from 'src/app/services/snackbBar.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, MovieRatingComponent, RouterLink],
  animations: [fadeAnimation]
})
export class MovieReviewComponent implements OnInit {
  private movieReviewsService = inject(MovieReviewsService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private authService = inject(AuthService)
  private snackBarService = inject(SnackbBarService)
  private location = inject(Location)

  @Input() public reviewId!: string | null

  public review?: IMovieReview
  public fullReview = false;
  public showEntireReview = false;

  public currentUser$ = this.authService.currentUser$

  public ngOnInit(): void {
    if (!this.reviewId) {
      this.route.paramMap.pipe(
        take(1))
      .subscribe({
        next: (data) => {
          this.reviewId = data.get('id')
          this.fullReview = true;
        }
      })
    }

    this.movieReviewsService.getMovieReview(this.reviewId!).subscribe({
      next: ({data}) => this.review = data.getMovieReview.data,
      error: (err) => console.log(err)
    })
  }


  public stripTitle(title?: string): string | null {
    if (title) {
      return StripTitle(title)
    } else {
      return null
    }
  }

  public editReview(): void {
    this.router.navigate([`/movie/${this.route.snapshot.url[0]}/${this.route.snapshot.url[1]}/${this.route.snapshot.url[2]}/${this.route.snapshot.url[3]}/edit`])
  }

  public removeReview(reviewId: string): void {
    this.movieReviewsService.removeReviewFromMovie(reviewId).subscribe({
      next: ({data}) => {
        if (!data) return
        this.location.back();
        this.snackBarService.openSnackBar(data.removeReviewFromMovie.response, SnackBarState.SUCCESS, data.removeReviewFromMovie.data);
      },
      error: (err) => console.log(err)
    })
  }
}
