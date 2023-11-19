import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { MovieReviewsService } from '../movie-reviews.service';
import { FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { SnackBarState, SnackbBarService } from 'src/app/services/snackbBar.service';

@Component({
  selector: 'app-edit-movie-review',
  templateUrl: './edit-movie-review.component.html',
  styleUrls: ['./edit-movie-review.component.scss'],
  standalone: true,
  imports: [MaterialModule, CommonModule]

})
export class EditMovieReviewComponent implements OnInit {
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private movieReviewsService = inject(MovieReviewsService)
  private snackBarService = inject(SnackbBarService)

  public review = new FormControl<string>('', [Validators.required, Validators.minLength(6)]);

  private reviewId!: string | null

  public ngOnInit(): void {
    this.route.paramMap.pipe(take(1)).subscribe({
      next: (data) => {
        this.reviewId = data.get('id')

        this.movieReviewsService.getMovieReview(this.reviewId!).subscribe({
          next: ({data}) => this.review.patchValue(data.getMovieReview.data.content)
        })
      }
    })
  }

  public editReviewToMovie(): void {
    this.movieReviewsService.editMovieReview(this.review, this.reviewId!).subscribe({
      next: ({data}) => {
        if (data) {
          const { response: response, data : reviewData } = data.editMovieReview;
          this.router.navigate([`/movie/${this.route.snapshot.url[0]}/${this.route.snapshot.url[1]}`])
          this.snackBarService.openSnackBar(response, SnackBarState.SUCCESS, reviewData)
        }
      }
    })
  }
}
