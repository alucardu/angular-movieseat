import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fadeAnimation } from 'src/app/animations';

@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.scss'],
  animations: [fadeAnimation]
})
export class MovieReviewComponent {
  public reviewSorting = new FormControl('populair');
  public reviewText = new FormControl('');

  public createReview = false;

  public createReviewFn(): void {
    this.createReview = true;
  }

  public closeCreateReview(): void {
    this.createReview = false;
  }
}
