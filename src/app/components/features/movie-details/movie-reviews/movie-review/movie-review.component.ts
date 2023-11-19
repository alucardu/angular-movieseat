import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { fadeAnimation } from 'src/app/animations';
import { MaterialModule } from 'src/app/material.module';
import { MovieRatingComponent } from '../../rating-stars/movie-rating.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IMovieReview, MovieReviewsService } from '../movie-reviews.service';
import { take } from 'rxjs';
import { StripTitle } from 'src/app/utils/string-utils';

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

    this.movieReviewsService.getMovieReview(this.reviewId!).subscribe({
      next: ({data}) => this.review = data.getMovieReview.data,
      error: (err) => console.log(err)
    })
  }

  public showEntireReview = false;

  public stripTitle(title?: string): string | null {
    if (title) {
      return StripTitle(title)
    } else {
      return null
    }
  }
}
