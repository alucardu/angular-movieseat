import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { fadeAnimation } from 'src/app/animations';
import { MaterialModule } from 'src/app/material.module';
import { MovieRatingComponent } from '../../rating-stars/movie-rating.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IMovieReview } from 'src/app/mock/movie-reviews.json';
import { MovieReviewsService } from '../movie-reviews.service';
import { first, map, take } from 'rxjs';

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

  @Input() public reviewId!: string | null

  public review?: IMovieReview
  public fullReview = false;

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

    this.movieReviewsService.reviews$.pipe(
      map((movieReviews) => movieReviews.find((movieReview) => movieReview.id === this.reviewId)),
      first(),
    ).subscribe((data) => this.review = data)
  }

  public showEntireReview = false;
}
