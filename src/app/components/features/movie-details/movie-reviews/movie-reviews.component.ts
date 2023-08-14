import { Component, Inject, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SpeedDialFabComponent } from 'src/app/components/UI/speed-dial-fab/speed-dial-fab.component';
import { MaterialModule } from 'src/app/material.module';
import { MovieReviewComponent } from './movie-review/movie-review.component';
import { MovieRatingComponent } from '../rating-stars/movie-rating.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-movie-reviews',
  templateUrl: './movie-reviews.component.html',
  styleUrls: ['./movie-reviews.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, SpeedDialFabComponent, MovieReviewComponent]
})
export class MovieReviewsComponent {
  public reviewSorting = new FormControl('oldest');
  public reviewInput = new FormControl('asd')
  public createReview = false;

  public constructor(
    private dialog: MatDialog,
    private ngZone: NgZone
  ) {}

  public createReviewDialog(): void {
    this.ngZone.run(() => {
      this.dialog.open(CreateReviewDialogComponent, {
        data: {
          reviewInput: this.reviewInput,
        },
        height: '98vh',
        minWidth: '95vw',
      })
    })
  }

  public createReviewFn(): void {
    this.createReview = true;
  }

  public closeCreateReview(): void {
    this.createReview = false;
  }
}

@Component({
  templateUrl: 'create-review-dialog/create-review-dialog.html',
  styleUrls: ['create-review-dialog/create-review-dialog.scss'],
  standalone: true,
  imports: [MaterialModule, MovieRatingComponent]
})

export class CreateReviewDialogComponent {
  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: {reviewInput: FormControl}) {}
}
