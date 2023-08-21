import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { MovieRatingComponent } from '../../rating-stars/movie-rating.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-movie-review',
  templateUrl: './create-movie-review.component.html',
  styleUrls: ['./create-movie-review.component.scss'],
  standalone: true,
  imports: [MaterialModule, MovieRatingComponent]
})
export class CreateMovieReviewComponent {
  public reviewInput = new FormControl('')
}
