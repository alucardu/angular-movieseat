import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { fadeAnimation } from 'src/app/animations';
import { MaterialModule } from 'src/app/material.module';
import { MovieRatingComponent } from '../../rating-stars/movie-rating.component';

@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, MovieRatingComponent],
  animations: [fadeAnimation]
})
export class MovieReviewComponent {
  public reviewText = 'Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula risus et velit tristique tincidunt. Fusce vel elit luctus, tempor libero vel, egestas lacus. Vestibulum lacinia porttitor aliquam. Ut vel neque interdum, malesuada nibh eu, congue enim. Integer lobortis eros eu tincidunt volutpat. Nulla eget auctor massa. In blandit facilisis sapien ultricies sodales. Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula risus et velit tristique tincidunt. Fusce vel elit luctus, tempor libero vel, egestas lacus. Vestibulum lacinia porttitor aliquam. Ut vel neque interdum, malesuada nibh eu, congue enim. Integer lobortis eros eu tincidunt volutpat. Nulla eget auctor massa. In blandit facilisis sapien ultricies sodales. Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula risus et velit tristique tincidunt. Fusce vel elit luctus, tempor libero vel, egestas lacus. Vestibulum lacinia porttitor aliquam. Ut vel neque interdum, malesuada nibh eu, congue enim. Integer lobortis eros eu tincidunt volutpat. Nulla eget auctor massa. In blandit facilisis sapien ultricies sodales. Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula risus et velit tristique tincidunt. Fusce vel elit luctus, tempor libero vel, egestas lacus. Vestibulum lacinia porttitor aliquam. Ut vel neque interdum, malesuada nibh eu, congue enim. Integer lobortis eros eu tincidunt volutpat. Nulla eget auctor massa. In blandit facilisis sapien ultricies sodales. Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula risus et velit tristique tincidunt. Fusce vel elit luctus, tempor libero vel, egestas lacus. Vestibulum lacinia porttitor aliquam. Ut vel neque interdum, malesuada nibh eu, congue enim. Integer lobortis eros eu tincidunt volutpat. Nulla eget auctor massa. In blandit facilisis sapien ultricies sodales. Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula risus et velit tristique tincidunt. Fusce vel elit luctus, tempor libero vel, egestas lacus. Vestibulum lacinia porttitor aliquam. Ut vel neque interdum, malesuada nibh eu, congue enim. Integer lobortis eros eu tincidunt volutpat. Nulla eget auctor massa. In blandit facilisis sapien ultricies sodales. Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula risus et velit tristique tincidunt. Fusce vel elit luctus, tempor libero vel, egestas lacus. Vestibulum lacinia porttitor aliquam. Ut vel neque interdum, malesuada nibh eu, congue enim. Integer lobortis eros eu tincidunt volutpat. Nulla eget auctor massa. In blandit facilisis sapien ultricies sodales. Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula risus et velit tristique tincidunt. Fusce vel elit luctus, tempor libero vel, egestas lacus. Vestibulum lacinia porttitor aliquam. Ut vel neque interdum, malesuada nibh eu, congue enim. Integer lobortis eros eu tincidunt volutpat. Nulla eget auctor massa. In blandit facilisis sapien ultricies sodales.'
  public showEntireReview = false;

  public constructor(
    public dialog: MatDialog) {
  }

  public fullReviewDialog(): void {
    this.dialog.open(FullReviewDialogComponent, {
      data: {
        reviewText: this.reviewText,
      },
      height: '98vh',
      minWidth: '95vw',
    });
  }
}

@Component({
  templateUrl: '../full-review-dialog/full-review-dialog.html',
  styleUrls: ['../full-review-dialog/full-review-dialog.scss'],
  standalone: true,
  imports: [MaterialModule, MovieRatingComponent]
})

export class FullReviewDialogComponent {
  public constructor(@Inject(MAT_DIALOG_DATA) public data: {reviewText: string}) {}
}
