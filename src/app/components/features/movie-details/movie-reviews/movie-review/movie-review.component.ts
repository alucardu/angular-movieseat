import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { fadeAnimation } from 'src/app/animations';

@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.scss'],
  animations: [fadeAnimation]
})
export class MovieReviewComponent {
  public reviewSorting = new FormControl('populair');
  public reviewInput = new FormControl('asd')
  public reviewText = 'Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula risus et velit tristique tincidunt. Fusce vel elit luctus, tempor libero vel, egestas lacus. Vestibulum lacinia porttitor aliquam. Ut vel neque interdum, malesuada nibh eu, congue enim. Integer lobortis eros eu tincidunt volutpat. Nulla eget auctor massa. In blandit facilisis sapien ultricies sodales. Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula risus et velit tristique tincidunt. Fusce vel elit luctus, tempor libero vel, egestas lacus. Vestibulum lacinia porttitor aliquam. Ut vel neque interdum, malesuada nibh eu, congue enim. Integer lobortis eros eu tincidunt volutpat. Nulla eget auctor massa. In blandit facilisis sapien ultricies sodales. Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula risus et velit tristique tincidunt. Fusce vel elit luctus, tempor libero vel, egestas lacus. Vestibulum lacinia porttitor aliquam. Ut vel neque interdum, malesuada nibh eu, congue enim. Integer lobortis eros eu tincidunt volutpat. Nulla eget auctor massa. In blandit facilisis sapien ultricies sodales. Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula risus et velit tristique tincidunt. Fusce vel elit luctus, tempor libero vel, egestas lacus. Vestibulum lacinia porttitor aliquam. Ut vel neque interdum, malesuada nibh eu, congue enim. Integer lobortis eros eu tincidunt volutpat. Nulla eget auctor massa. In blandit facilisis sapien ultricies sodales. Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula risus et velit tristique tincidunt. Fusce vel elit luctus, tempor libero vel, egestas lacus. Vestibulum lacinia porttitor aliquam. Ut vel neque interdum, malesuada nibh eu, congue enim. Integer lobortis eros eu tincidunt volutpat. Nulla eget auctor massa. In blandit facilisis sapien ultricies sodales. Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula risus et velit tristique tincidunt. Fusce vel elit luctus, tempor libero vel, egestas lacus. Vestibulum lacinia porttitor aliquam. Ut vel neque interdum, malesuada nibh eu, congue enim. Integer lobortis eros eu tincidunt volutpat. Nulla eget auctor massa. In blandit facilisis sapien ultricies sodales. Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula risus et velit tristique tincidunt. Fusce vel elit luctus, tempor libero vel, egestas lacus. Vestibulum lacinia porttitor aliquam. Ut vel neque interdum, malesuada nibh eu, congue enim. Integer lobortis eros eu tincidunt volutpat. Nulla eget auctor massa. In blandit facilisis sapien ultricies sodales. Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula risus et velit tristique tincidunt. Fusce vel elit luctus, tempor libero vel, egestas lacus. Vestibulum lacinia porttitor aliquam. Ut vel neque interdum, malesuada nibh eu, congue enim. Integer lobortis eros eu tincidunt volutpat. Nulla eget auctor massa. In blandit facilisis sapien ultricies sodales.'
  public createReview = false;
  public showEntireReview = false;

  public constructor(public dialog: MatDialog) {}

  public fullReviewDialog(): void {
    this.dialog.open(FullReviewDialogComponent, {
      data: {
        reviewText: this.reviewText,
      },
      height: '98vh',
      minWidth: '95vw',
    });
  }

  public createReviewDialog(): void {
    this.dialog.open(CreateReviewDialogComponent, {
      data: {
        reviewInput: this.reviewInput,
      },
      height: '98vh',
      minWidth: '95vw',
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
  templateUrl: 'full-review-dialog.html',
  styleUrls: ['./full-review-dialog.scss'],
})

export class FullReviewDialogComponent {
  public constructor(@Inject(MAT_DIALOG_DATA) public data: {reviewText: string}) {}
}

@Component({
  templateUrl: 'create-review-dialog.html',
  styleUrls: ['./create-review-dialog.scss'],
})

export class CreateReviewDialogComponent {
  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: {reviewInput: FormControl}) {}
}
