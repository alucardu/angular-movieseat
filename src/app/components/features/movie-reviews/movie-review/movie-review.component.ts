import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.scss']
})
export class MovieReviewComponent {
  public reviewSorting = new FormControl('populair');
}
